/*
 * @lc app=leetcode.cn id=32 lang=typescript
 *
 * [32] 最长有效括号
 *
 * https://leetcode-cn.com/problems/longest-valid-parentheses/description/
 *
 * algorithms
 * Hard (35.70%)
 * Likes:    1538
 * Dislikes: 0
 * Total Accepted:    204.5K
 * Total Submissions: 572.9K
 * Testcase Example:  '"(()"'
 *
 * 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "(()"
 * 输出：2
 * 解释：最长有效括号子串是 "()"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = ")()())"
 * 输出：4
 * 解释：最长有效括号子串是 "()()"
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = ""
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * s[i] 为 '(' 或 ')'
 *
 *
 *
 *
 */

// @lc code=start
function longestValidParentheses(s: string): number {
  if (s.length < 2) return 0

  const lrMap: AnyObject = {}

  const expand = (l: number, r: number) => {
    while (s[l - 1] === '(' && s[r + 1] === ')') {
      l--
      r++
    }
    return [l, r]
  }

  let l = 0,
    r = 0,
    max = 0
  while (true) {
    l = s.indexOf('()', r)
    if (l === -1) break
    ;[l, r] = expand(l, l + 1)
    while (l - 1 in lrMap) {
      ;[l, r] = expand(lrMap[l - 1], r)
    }
    lrMap[r] = l
    max = Math.max(max, r - l + 1)
  }

  return max
}
// @lc code=end
