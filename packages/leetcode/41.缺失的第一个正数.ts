/*
 * @lc app=leetcode.cn id=41 lang=typescript
 *
 * [41] 缺失的第一个正数
 *
 * https://leetcode-cn.com/problems/first-missing-positive/description/
 *
 * algorithms
 * Hard (42.00%)
 * Likes:    1269
 * Dislikes: 0
 * Total Accepted:    175.5K
 * Total Submissions: 417.9K
 * Testcase Example:  '[1,2,0]'
 *
 * 给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
 * 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,0]
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -2^31
 *
 *
 */

// @lc code=start
function firstMissingPositive(nums: number[]): number {
  const map: Record<number, number> = {}
  for (let n of nums) {
    if (n > 0) map[n] = 1
  }
  let min = 1
  while (min in map) {
    min++
  }
  return min
}
// @lc code=end
