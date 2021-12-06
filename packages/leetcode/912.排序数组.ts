/*
 * @lc app=leetcode.cn id=912 lang=typescript
 *
 * [912] 排序数组
 *
 * https://leetcode-cn.com/problems/sort-an-array/description/
 *
 * algorithms
 * Medium (55.74%)
 * Likes:    434
 * Dislikes: 0
 * Total Accepted:    252.3K
 * Total Submissions: 452.6K
 * Testcase Example:  '[5,2,3,1]'
 *
 * 给你一个整数数组 nums，请你将该数组升序排列。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,2,3,1]
 * 输出：[1,2,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,1,1,2,0,0]
 * 输出：[0,0,1,1,2,5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 5 * 10^4
 * -5 * 10^4 <= nums[i] <= 5 * 10^4
 *
 *
 */

// @lc code=start
function sortArray(nums: number[]): number[] {
  const len = nums.length

  if (len < 2) {
    return nums
  }
  const m = nums[0],
    left: number[] = [],
    right: number[] = []

  for (let i = 1; i < len; i++) {
    const x = nums[i]
    if (x < m) {
      left.push(x)
    } else {
      right.push(x)
    }
  }

  return [...sortArray(left), m, ...sortArray(right)]
}
// @lc code=end
