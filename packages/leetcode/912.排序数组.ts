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
function sortArray(nums: number[], lo = 0, hi = nums.length - 1): number[] {
  if (lo >= hi) {
    return nums
  }

  const j = partation(nums, lo, hi)
  sortArray(nums, lo, j - 1)
  sortArray(nums, j + 1, hi)

  return nums
}

function partation(nums: number[], lo: number, hi: number) {
  const v = nums[lo]
  let i = lo,
    j = hi + 1

  while (true) {
    while (nums[++i] < v) {
      if (i === hi) break
    }

    while (nums[--j] > v) {
      if (j === lo) break
    }

    if (i >= j) break

    exec(nums, i, j)
  }
  exec(nums, lo, j)

  return j
}

function exec(arr: any[], i: number, j: number) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

// @lc code=end
