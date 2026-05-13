---
name: karpathy-guidelines
description: Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.
license: MIT
---

# Karpathy Guidelines

Behavioral guidelines to reduce common LLM coding mistakes, derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## Trigger Conditions

Load this skill explicitly when:
- Upstream PM or UI skills require modifying files (e.g., HTML, CSS, JS).
- The user asks to write, refactor, or review code.
- You are writing automation scripts or tests.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## Examples

**Example 1: The user asks to add a new button to an existing HTML file**
*User:* "在这个页面的表格上方加一个导出按钮。"
*Agent Action:* Read the file. Add ONLY the button and its immediate CSS class. Do NOT reformat the rest of the HTML file or fix unrelated CSS issues you happen to notice.

**Example 2: The user asks to refactor a complex function**
*User:* "优化一下这个退款计算逻辑。"
*Agent Action:* First, define success criteria (e.g., "Ensure all existing test cases pass"). Second, identify if the logic can be simplified without adding speculative flexibility. Do not add generic plugin interfaces if only a single calculation fix is needed.

---

## 上游来源 & 跨项目升级

本 Skill 内容衍生自 [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)（91k+ stars）。当前文件是项目内的本地镜像。

如果想在 Claude Code 里**跨项目永久启用**这套规则，可以在任意一个 Claude Code 会话里执行：

```
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

装完后所有 Claude Code 项目都会自动启用这套规则，且能随上游更新。本项目内的镜像与插件并行存在不冲突；如果未来上游有更新但本镜像没跟，**以插件版本为准**。
