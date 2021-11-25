/*
 * @lc app=leetcode.cn id=46 lang=typescript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (78.37%)
 * Likes:    1653
 * Dislikes: 0
 * Total Accepted:    457.6K
 * Total Submissions: 583.9K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1]
 * 输出：[[1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -10
 * nums 中的所有整数 互不相同
 *
 *
 */

// @lc code=start
function permute(nums: number[]): number[][] {
  const res: number[][] = []

  function perm(lo = 0, hi = nums.length - 1) {
    if (lo === hi) return res.push([...nums])
    for (let i = lo; i <= hi; i++) {
      exch(nums, i, lo)
      perm(lo + 1, hi)
      exch(nums, i, lo)
    }
  }

  perm()
  return res
}

function exch(arr: any[], i: number, j: number) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}
// @lc code=end
