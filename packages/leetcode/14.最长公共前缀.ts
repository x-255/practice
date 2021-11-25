/*
 * @lc app=leetcode.cn id=14 lang=typescript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (41.26%)
 * Likes:    1884
 * Dislikes: 0
 * Total Accepted:    666.6K
 * Total Submissions: 1.6M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
function longestCommonPrefix(strs: string[]): string {
  if (strs.length < 1) return ''
  if (strs.length === 1) return strs[0]
  let start = ''
  for (let i = 1; i < strs.length; i++) {
    let common = '',
      str = i > 1 ? start : strs[0]
    let j = 0
    while (j < Math.min(str.length, strs[i].length)) {
      let s = strs[i][j]
      if (str[j] !== s) break
      common += s
      j++
    }
    if (!common) return ''
    start = common
  }

  return start
}
// @lc code=end
