#!/bin/bash
set -euo pipefail
TARGET="index.html"
PASS=0; FAIL=0
red()  { printf "\033[31m%s\033[0m\n" "$1"; }
green(){ printf "\033[32m%s\033[0m\n" "$1"; }

echo ""
echo "━━━ 1. 日期输入 .date-input-wrap ━━━"
awk '/type="date"/{d[NR]=1} /date-input-wrap/{w[NR]=1} END{for(i in d) if(!w[i]&&!w[i-1]) exit 1}' "$TARGET" \
  && green "  ✅ 全部通过" && PASS=$((PASS+1)) \
  || { red "  ❌ 存在裸 date input"; FAIL=$((FAIL+1)); }

echo ""
echo "━━━ 2. <select> 选项数 ━━━"
awk '
/<select/ && !/条\/页/ { inSel=1; buf="" }
inSel { buf=buf $0 }
/<\/select>/ && inSel {
  n=gsub(/<option/,"&",buf)
  if(n<2) { print "  ❌ 行 "NR": 仅 "n" 个 option → "buf; f=1 }
  inSel=0; buf=""
}
END { exit f }
' "$TARGET" \
  && green "  ✅ 全部通过" && PASS=$((PASS+1)) \
  || FAIL=$((FAIL+1))

echo ""
echo "━━━ 3. .sel-tag .x onclick ━━━"
xTotal=$(grep -c 'class="x"' "$TARGET" 2>/dev/null || echo 0)
xOk=$(grep -c 'class="x".*onclick' "$TARGET" 2>/dev/null || echo 0)
if [ "$xTotal" -eq 0 ]; then green "  ✅ 无此组件（跳过）"; PASS=$((PASS+1))
elif [ "$xTotal" -eq "$xOk" ]; then green "  ✅ 全部通过 ($xOk/$xTotal)"; PASS=$((PASS+1))
else red "  ❌ 缺少 onclick: $xTotal 中仅 $xOk"; FAIL=$((FAIL+1))
fi

echo ""
echo "========================================"
echo "  结果: $PASS 通过 / $FAIL 失败"
echo "========================================"
[ "$FAIL" -eq 0 ] && green "  ✅ 组件一致性检查全部通过" || red "  ⚠️ 请修复以上问题后重新检查"
