#!/usr/bin/env node
/**
 * Prototype Style Guard
 * 检查 HTML 原型是否符合项目设计系统规范
 *
 * 用法:
 *   node scripts/prototype-style-guard.js prototype/<name>/
 *   node scripts/prototype-style-guard.js prototype/<name>/index.html
 */

const fs = require('fs');
const path = require('path');

// ── 规则配置 ──
const RULES = {
  // 禁止出现的颜色值（模型常错用的 Tailwind / 其他色系）
  forbiddenColors: [
    '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', // Tailwind blue
    '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF',
    '#6366F1', '#4F46E5', '#4338CA', '#3730A3', // Indigo
    '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF', '#EEF2FF',
    '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', // Violet
    '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE', '#F5F3FF',
    '#10B981', '#059669', '#047857', // Emerald as primary
    '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5', '#ECFDF5',
    '#F8FAFC', // 旧背景色（应使用 #f5f7fa）
  ],

  // 推荐使用的 CSS 变量（出现硬编码近似值时警告）
  preferredTokens: {
    '#1677ff': 'var(--color-primary-6)',
    '#0958d9': 'var(--color-primary-7)',
    '#e6f4ff': 'var(--color-primary-1)',
    '#91caff': 'var(--color-primary-3)',
    '#f5f7fa': 'var(--color-bg-layout)',
    '#ffffff': 'var(--color-bg-container)',
    '#f0f0f0': 'var(--color-border-secondary)',
    '#d9d9d9': 'var(--color-border)',
    '#52c41a': 'var(--color-success)',
    '#faad14': 'var(--color-warning)',
    '#ff4d4f': 'var(--color-error)',
  },

  // 壳层类名规范（至少出现一种）
  shellPatterns: [
    /class="[^"]*c-shell/,
    /class="[^"]*erp-shell/,
  ],

  // tokens.css 引入路径模式
  tokenImportPatterns: [
    /tokens\.css/,
    /ui-library\/tokens/,
  ],
};

// ── 工具函数 ──
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lower = content.toLowerCase();
  const issues = [];
  const warnings = [];
  const basename = path.basename(filePath);
  const isHtml = basename.endsWith('.html');
  const isCss = basename.endsWith('.css');
  const isTokenFile = basename === 'tokens.css';

  // ── HTML 专属检查 ──
  if (isHtml) {
    // 1. 检查 tokens.css 引入
    const hasTokenImport = RULES.tokenImportPatterns.some(p => p.test(content));
    if (!hasTokenImport) {
      issues.push({
        level: 'ERROR',
        code: 'MISSING_TOKENS',
        message: '未引入 tokens.css。所有原型必须引入 ui-library/tokens.css',
      });
    }

    // 4. 检查壳层组件
    const hasShell = RULES.shellPatterns.some(p => p.test(content));
    if (!hasShell) {
      issues.push({
        level: 'ERROR',
        code: 'MISSING_SHELL',
        message: '未发现标准壳层组件（c-shell 或 erp-shell）。必须从 ui-library/components/erp-shell.html 复制',
      });
    }

    // 5. 检查原生 select
    const selectMatches = content.match(/<select[\s\S]*?<\/select>/gi);
    if (selectMatches) {
      const formalSelects = selectMatches.filter(s => !s.includes('demo') && !s.includes('debug'));
      if (formalSelects.length > 0) {
        warnings.push({
          level: 'WARN',
          code: 'NATIVE_SELECT',
          message: `发现 ${formalSelects.length} 个原生 <select> 标签。正式控件应使用 Ant-style Select 触发器 + 下拉面板`,
        });
      }
    }
  }

  // ── CSS 专属检查（跳过 tokens.css 本身）──
  if (isCss && !isTokenFile) {
    // 6. 检查自行定义 :root 变量（与 tokens.css 冲突）
    if (/:root\s*\{/.test(content)) {
      issues.push({
        level: 'ERROR',
        code: 'CUSTOM_ROOT',
        message: '发现自定义 :root 变量。禁止自行定义颜色/间距/圆角/阴影变量，必须使用 tokens.css',
      });
    }
  }

  // ── 通用检查（HTML + CSS，跳过 tokens.css）──
  if (!isTokenFile) {
    // 2. 检查禁止颜色值
    const foundColors = new Set();
    for (const color of RULES.forbiddenColors) {
      const regex = new RegExp(color.replace(/#/g, '\\\\#'), 'gi');
      if (regex.test(content)) {
        foundColors.add(color);
      }
    }
    if (foundColors.size > 0) {
      issues.push({
        level: 'ERROR',
        code: 'FORBIDDEN_COLOR',
        message: `发现禁止使用的颜色值: ${Array.from(foundColors).join(', ')}。必须使用 tokens.css 变量`,
      });
    }

    // 3. 检查硬编码近似值（警告级别）
    const foundHardcoded = [];
    for (const [hex, token] of Object.entries(RULES.preferredTokens)) {
      const regex = new RegExp(hex.replace(/#/g, '\\\\#'), 'gi');
      if (regex.test(content)) {
        foundHardcoded.push(`${hex} → 建议改用 ${token}`);
      }
    }
    if (foundHardcoded.length > 0) {
      warnings.push({
        level: 'WARN',
        code: 'HARDCODED_TOKEN',
        message: `发现硬编码值可替换为 token:\n  ${foundHardcoded.join('\n  ')}`,
      });
    }
  }

  return { file: filePath, issues, warnings, content };
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.html') || f.endsWith('.css'))
    .map(f => path.join(dir, f));

  const results = [];
  for (const file of files) {
    const stat = fs.statSync(file);
    if (stat.isFile()) {
      results.push(scanFile(file));
    }
  }
  return results;
}

// ── 输出格式 ──
function formatResult(result) {
  const lines = [];
  const relPath = path.relative(process.cwd(), result.file);
  lines.push(`\n📄 ${relPath}`);

  if (result.issues.length === 0 && result.warnings.length === 0) {
    lines.push('  ✅ 通过');
    return lines.join('\n');
  }

  for (const issue of result.issues) {
    lines.push(`  ❌ [${issue.code}] ${issue.message}`);
  }
  for (const warn of result.warnings) {
    lines.push(`  ⚠️  [${warn.code}] ${warn.message}`);
  }

  return lines.join('\n');
}

// ── 主流程 ──
function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('用法: node scripts/prototype-style-guard.js <原型目录或文件>');
    console.error('示例:');
    console.error('  node scripts/prototype-style-guard.js prototype/ai-workspace-v2/');
    console.error('  node scripts/prototype-style-guard.js prototype/ai-workspace-v2/index.html');
    process.exit(1);
  }

  const absTarget = path.resolve(target);
  if (!fs.existsSync(absTarget)) {
    console.error(`路径不存在: ${target}`);
    process.exit(1);
  }

  const stat = fs.statSync(absTarget);
  let results;
  if (stat.isDirectory()) {
    results = scanDirectory(absTarget);
  } else {
    results = [scanFile(absTarget)];
  }

  console.log('\n' + '='.repeat(60));
  console.log('  Prototype Style Guard · 原型风格守门');
  console.log('='.repeat(60));

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const r of results) {
    console.log(formatResult(r));
    totalErrors += r.issues.length;
    totalWarnings += r.warnings.length;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`  结果: ${totalErrors} 个错误, ${totalWarnings} 个警告`);
  console.log('='.repeat(60));

  if (totalErrors > 0) {
    console.log('\n💡 修复建议:');
    console.log('  1. 引入 <link rel="stylesheet" href="../../ui-library/tokens.css">');
    console.log('  2. 删除自定义 :root 变量');
    console.log('  3. 将硬编码颜色替换为 var(--color-*) token');
    console.log('  4. 从 ui-library/components/erp-shell.html 复制壳层组件');
    console.log('  5. 参考 knowledge/prototype-style-guard.md 完整规范\n');
    process.exit(1);
  }

  console.log('\n✅ 所有检查通过\n');
  process.exit(0);
}

main();
