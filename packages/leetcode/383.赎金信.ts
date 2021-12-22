/*
 * @lc app=leetcode.cn id=383 lang=typescript
 *
 * [383] 赎金信
 *
 * https://leetcode-cn.com/problems/ransom-note/description/
 *
 * algorithms
 * Easy (64.21%)
 * Likes:    257
 * Dislikes: 0
 * Total Accepted:    116.5K
 * Total Submissions: 181.5K
 * Testcase Example:  '"a"\n"b"'
 *
 * 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
 *
 * 如果可以，返回 true ；否则返回 false 。
 *
 * magazine 中的每个字符只能在 ransomNote 中使用一次。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：ransomNote = "a", magazine = "b"
 * 输出：false
 *
 *
 * 示例 2：
 *
 *
 * 输入：ransomNote = "aa", magazine = "ab"
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：ransomNote = "aa", magazine = "aab"
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= ransomNote.length, magazine.length <= 10^5
 * ransomNote 和 magazine 由小写英文字母组成
 *
 *
 */

// @lc code=start
function canConstruct(ransomNote: string, magazine: string): boolean {
  const map = new Map<string, number>()
  for (let s of ransomNote) {
    map.set(s, (map.get(s) ?? 0) + 1)
  }

  for (let s of magazine) {
    const count = map.get(s)
    if (count === undefined) {
      continue
    } else if (count <= 0) {
      return false
    }

    if (count === 1) {
      map.delete(s)
    } else {
      map.set(s, count - 1)
    }
  }

  return map.size === 0
}
// @lc code=end
