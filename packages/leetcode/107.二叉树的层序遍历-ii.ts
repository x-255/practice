/*
 * @lc app=leetcode.cn id=107 lang=typescript
 *
 * [107] 二叉树的层序遍历 II
 *
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/description/
 *
 * algorithms
 * Medium (70.17%)
 * Likes:    523
 * Dislikes: 0
 * Total Accepted:    176.8K
 * Total Submissions: 252K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，返回其节点值自底向上的层序遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 *
 * 例如：
 * 给定二叉树 [3,9,20,null,null,15,7],
 *
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 *
 * 返回其自底向上的层序遍历为：
 *
 *
 * [
 * ⁠ [15,7],
 * ⁠ [9,20],
 * ⁠ [3]
 * ]
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

function levelOrderBottom(root: TreeNode | null): number[][] {
  if (!root) {
    return []
  }

  const res: number[][] = [],
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

    res.unshift(row)
  }

  return res
}
// @lc code=end
