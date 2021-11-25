/*
 * @lc app=leetcode.cn id=18 lang=typescript
 *
 * [18] 四数之和
 *
 * https://leetcode-cn.com/problems/4sum/description/
 *
 * algorithms
 * Medium (39.52%)
 * Likes:    1014
 * Dislikes: 0
 * Total Accepted:    237.7K
 * Total Submissions: 601.3K
 * Testcase Example:  '[1,0,-1,0,-2,2]\n0'
 *
 * 给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a],
 * nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：
 *
 *
 * 0 <= a, b, c, d < n
 * a、b、c 和 d 互不相同
 * nums[a] + nums[b] + nums[c] + nums[d] == target
 *
 *
 * 你可以按 任意顺序 返回答案 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,0,-1,0,-2,2], target = 0
 * 输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,2,2,2,2], target = 8
 * 输出：[[2,2,2,2]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 200
 * -10^9 <= nums[i] <= 10^9
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
function fourSum(nums: number[], target: number): number[][] {
  const len = nums.length
  if (len < 4) return []
  nums = nums.sort((a, b) => a - b)
  const res = []
  for (let i = 0; i < len - 3; i++) {
    if (
      (i > 0 && nums[i] === nums[i - 1]) ||
      nums[i] + nums[len - 1] + nums[len - 2] + nums[len - 3] < target
    )
      continue
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break
    for (let j = i + 1; j < len - 2; j++) {
      if (
        (j > i + 1 && nums[j] === nums[j - 1]) ||
        nums[i] + nums[j] + nums[len - 1] + nums[len - 2] < target
      )
        continue
      if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) break
      let l = j + 1,
        r = len - 1
      while (l < r) {
        let sum = nums[i] + nums[j] + nums[l] + nums[r]
        if (sum > target) r--
        else if (sum < target) l++
        else {
          res.push([nums[i], nums[j], nums[l], nums[r]])
          while (nums[l] === nums[l + 1]) l++
          while (nums[r] === nums[r - 1]) r--
          l++
          r--
        }
      }
    }
  }

  return res
}
// @lc code=end
