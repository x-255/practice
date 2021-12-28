/*
 * @lc app=leetcode.cn id=637 lang=typescript
 *
 * [637] 二叉树的层平均值
 *
 * https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/description/
 *
 * algorithms
 * Easy (69.10%)
 * Likes:    303
 * Dislikes: 0
 * Total Accepted:    82.2K
 * Total Submissions: 118.9K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。
 *
 *
 *
 * 示例 1：
 *
 * 输入：
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 输出：[3, 14.5, 11]
 * 解释：
 * 第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 节点值的范围在32位有符号整数范围内。
 *
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function averageOfLevels(root: TreeNode | null): number[] {
  if (!root) {
    return []
  }

  const res: number[] = [],
    queue: TreeNode[] = [root]

  while (queue.length) {
    const row: number[] = [],
      len = queue.length

    for (let i = 0; i < len; i++) {
      const cur = queue.shift()!
      row.push(cur.val)
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }

    res.push(getAverage(row))
  }

  return res
}

function getAverage(arr: number[]) {
  const sum = arr.reduce((acc, cur) => acc + cur)
  return sum / arr.length
}
// @lc code=end
