/*
 * @lc app=leetcode.cn id=15 lang=typescript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (33.92%)
 * Likes:    4011
 * Dislikes: 0
 * Total Accepted:    712.3K
 * Total Submissions: 2.1M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0
 * 且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [0]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * -10^5
 *
 *
 */

// @lc code=start
function threeSum(nums: number[]): number[][] {
  const sums = [],
    len = nums.length
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len; i++) {
    let v1 = nums[i]
    if (v1 > 0) break
    if (v1 === nums[i - 1]) continue
    let lo = i + 1,
      hi = len - 1
    while (lo < hi) {
      let v2 = nums[lo],
        v3 = nums[hi]
      if (v1 * v3 > 0) break
      let sum = v1 + v2 + v3
      if (sum === 0) {
        sums.push([v1, v2, v3])
        while (lo < hi && nums[lo] === nums[lo + 1]) lo++
        while (lo < hi && nums[hi] === nums[hi - 1]) hi--
        lo++
        hi--
      } else if (sum > 0) hi--
      else if (sum < 0) lo++
    }
  }

  return sums
}
// @lc code=end
