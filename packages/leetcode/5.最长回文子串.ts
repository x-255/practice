/*
 * @lc app=leetcode.cn id=5 lang=typescript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (35.75%)
 * Likes:    4376
 * Dislikes: 0
 * Total Accepted:    793.9K
 * Total Submissions: 2.2M
 * Testcase Example:  '"babad"'
 *
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "a"
 * 输出："a"
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "ac"
 * 输出："a"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅由数字和英文字母（大写和/或小写）组成
 *
 *
 */

// @lc code=start
function longestPalindrome(s: string): string {
  let len = s.length,
    res = ''
  for (let i = 0; i < len; i++) {
    for (let j = len; j > i; j--) {
      let str = s.slice(i, j)
      if (isPalindrome(str)) {
        if (str.length > res.length) {
          res = str
        }
        break
      }
    }
  }

  return res
}

function isPalindrome(s: string) {
  const len = s.length
  for (let i = 0; i < len / 2; i++) {
    if (s[i] !== s[len - 1 - i]) return false
  }
  return true
}
// @lc code=end
