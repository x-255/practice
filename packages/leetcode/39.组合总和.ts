/*
 * @lc app=leetcode.cn id=39 lang=typescript
 *
 * [39] 组合总和
 *
 * https://leetcode-cn.com/problems/combination-sum/description/
 *
 * algorithms
 * Medium (72.74%)
 * Likes:    1634
 * Dislikes: 0
 * Total Accepted:    364K
 * Total Submissions: 500.4K
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * 给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，找出 candidates 中所有可以使数字和为目标数 target
 * 的唯一组合。
 *
 * candidates 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。
 *
 * 对于给定的输入，保证和为 target 的唯一组合数少于 150 个。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: candidates = [2,3,6,7], target = 7
 * 输出: [[7],[2,2,3]]
 *
 *
 * 示例 2：
 *
 *
 * 输入: candidates = [2,3,5], target = 8
 * 输出: [[2,2,2,2],[2,3,3],[3,5]]
 *
 * 示例 3：
 *
 *
 * 输入: candidates = [2], target = 1
 * 输出: []
 *
 *
 * 示例 4：
 *
 *
 * 输入: candidates = [1], target = 1
 * 输出: [[1]]
 *
 *
 * 示例 5：
 *
 *
 * 输入: candidates = [1], target = 2
 * 输出: [[1,1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * candidate 中的每个元素都是独一无二的。
 * 1
 *
 *
 */

// @lc code=start
function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = []
  const dfd = (i: number, temp: number[], sum: number) => {
    if (sum >= target) {
      if (sum === target) res.push([...temp])
      return
    }
    for (let j = i; j < candidates.length; j++) {
      let item = candidates[j]
      dfd(j, [...temp, item], item + sum)
    }
  }
  dfd(0, [], 0)

  return res
}
// @lc code=end
