/*
 * @lc app=leetcode.cn id=7 lang=typescript
 *
 * [7] 整数反转
 *
 * https://leetcode-cn.com/problems/reverse-integer/description/
 *
 * algorithms
 * Easy (35.12%)
 * Likes:    3266
 * Dislikes: 0
 * Total Accepted:    891.1K
 * Total Submissions: 2.5M
 * Testcase Example:  '123'
 *
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 *
 * 如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。
 * 假设环境不允许存储 64 位整数（有符号或无符号）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：x = 123
 * 输出：321
 *
 *
 * 示例 2：
 *
 *
 * 输入：x = -123
 * 输出：-321
 *
 *
 * 示例 3：
 *
 *
 * 输入：x = 120
 * 输出：21
 *
 *
 * 示例 4：
 *
 *
 * 输入：x = 0
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * -2^31
 *
 *
 */

// @lc code=start
function reverse(x: number): number {
  let xs = x.toString()
  let minus = false
  if (xs.startsWith('-')) {
    minus = true
    xs = xs.substring(1)
  }
  let s = ''
  for (let i = xs.length - 1; i >= 0; i--) {
    s += xs[i]
  }
  if (minus) s = `-${s}`
  let n = parseInt(s)
  return n > Math.pow(2, 31) - 1 || n < Math.pow(-2, 31) ? 0 : n
}
// @lc code=end
