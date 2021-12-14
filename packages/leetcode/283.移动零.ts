/*
 * @lc app=leetcode.cn id=283 lang=typescript
 *
 * [283] 移动零
 *
 * https://leetcode-cn.com/problems/move-zeroes/description/
 *
 * algorithms
 * Easy (64.03%)
 * Likes:    1341
 * Dislikes: 0
 * Total Accepted:    562.5K
 * Total Submissions: 878.5K
 * Testcase Example:  '[0,1,0,3,12]'
 *
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 *
 * 示例:
 *
 * 输入: [0,1,0,3,12]
 * 输出: [1,3,12,0,0]
 *
 * 说明:
 *
 *
 * 必须在原数组上操作，不能拷贝额外的数组。
 * 尽量减少操作次数。
 *
 */

// @lc code=start
/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let k = 0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      ;[nums[k], nums[i]] = [nums[i], nums[k]]
      k++
    }
  }
}

// @lc code=end
