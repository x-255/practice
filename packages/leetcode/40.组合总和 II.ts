/*
 * @lc app=leetcode.cn id=40 lang=typescript
 *
 * [40] 组合总和 II
 *
 * https://leetcode-cn.com/problems/combination-sum-ii/description/
 *
 * algorithms
 * Medium (61.80%)
 * Likes:    743
 * Dislikes: 0
 * Total Accepted:    215.8K
 * Total Submissions: 349.3K
 * Testcase Example:  '[10,1,2,7,6,1,5]\n8'
 *
 * 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 *
 * candidates 中的每个数字在每个组合中只能使用一次。
 *
 * 注意：解集不能包含重复的组合。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: candidates = [10,1,2,7,6,1,5], target = 8,
 * 输出:
 * [
 * [1,1,6],
 * [1,2,5],
 * [1,7],
 * [2,6]
 * ]
 *
 * 示例 2:
 *
 *
 * 输入: candidates = [2,5,2,1,2], target = 5,
 * 输出:
 * [
 * [1,2,2],
 * [5]
 * ]
 *
 *
 *
 * 提示:
 *
 *
 * 1
 * 1
 * 1
 *
 *
 */

// @lc code=start
function combinationSum2(candidates: number[], target: number): number[][] {
  candidates = candidates.sort((a, b) => a - b)
  const res: number[][] = []
  const dfd = (lo: number, temp: number[], sum: number) => {
    if (sum >= target) {
      if (sum === target) res.push([...temp])
      return
    }

    for (let i = lo; i < candidates.length; i++) {
      let item = candidates[i]
      if (i > lo && item === candidates[i - 1]) continue
      dfd(i + 1, [...temp, item], item + sum)
    }
  }
  dfd(0, [], 0)

  return res
}
// @lc code=end
