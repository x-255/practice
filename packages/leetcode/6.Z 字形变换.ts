/*
 * @lc app=leetcode.cn id=6 lang=typescript
 *
 * [6] Z 字形变换
 *
 * https://leetcode-cn.com/problems/zigzag-conversion/description/
 *
 * algorithms
 * Medium (50.85%)
 * Likes:    1370
 * Dislikes: 0
 * Total Accepted:    325K
 * Total Submissions: 639.1K
 * Testcase Example:  '"PAYPALISHIRING"\n3'
 *
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 *
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 *
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 *
 * 请你实现这个将字符串进行指定行数变换的函数：
 *
 *
 * string convert(string s, int numRows);
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "PAYPALISHIRING", numRows = 3
 * 输出："PAHNAPLSIIGYIR"
 *
 * 示例 2：
 *
 *
 * 输入：s = "PAYPALISHIRING", numRows = 4
 * 输出："PINALSIGYAHRPI"
 * 解释：
 * P     I    N
 * A   L S  I G
 * Y A   H R
 * P     I
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "A", numRows = 1
 * 输出："A"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 由英文字母（小写和大写）、',' 和 '.' 组成
 * 1
 *
 *
 */

// @lc code=start
function convert(s: string, numRows: number): string {
  if (numRows === 1) return s
  let forward = true,
    i = 0
  const strs = Array(numRows).fill('')
  for (let w of s) {
    strs[i] += w
    if (i === 0) forward = true
    if (i === numRows - 1) forward = false
    if (forward) i++
    else i--
  }
  return strs.join('').substr(0, s.length)
}
// @lc code=end
