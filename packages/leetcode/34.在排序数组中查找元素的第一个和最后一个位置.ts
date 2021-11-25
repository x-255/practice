/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (42.30%)
 * Likes:    1308
 * Dislikes: 0
 * Total Accepted:    377.5K
 * Total Submissions: 892.6K
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 *
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 进阶：
 *
 *
 * 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * 示例 3：
 *
 *
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * -10^9
 * nums 是一个非递减数组
 * -10^9
 *
 *
 */

// @lc code=start
function searchRange(nums: number[], target: number): number[] {
  const N = nums.length
  let l = 0,
    r = N - 1,
    i = -1
  while (l <= r) {
    let m = l + ((r - l) >> 1),
      mid = nums[m]
    if (target > mid) {
      l = m + 1
    } else if (target < mid) {
      r = m - 1
    } else {
      i = m
      break
    }
  }
  if (i === -1) return [-1, -1]
  let s = i,
    e = i
  while (nums[s - 1] === target) s--
  while (nums[e + 1] === target) e++

  return [s, e]
}
// @lc code=end
