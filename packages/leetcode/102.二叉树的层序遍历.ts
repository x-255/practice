/*
 * @lc app=leetcode.cn id=102 lang=typescript
 *
 * [102] 二叉树的层序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (64.23%)
 * Likes:    1137
 * Dislikes: 0
 * Total Accepted:    448.4K
 * Total Submissions: 698.1K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
 *
 *
 *
 * 示例：
 * 二叉树：[3,9,20,null,null,15,7],
 *
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 *
 * 返回其层序遍历结果：
 *
 *
 * [
 * ⁠ [3],
 * ⁠ [9,20],
 * ⁠ [15,7]
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

function levelOrder(root: TreeNode | null): number[][] {
  if (!root) {
    return []
  }

  const res: number[][] = [],
    queue: TreeNode[] = [root]

  while (queue.length) {
    const len = queue.length,
      row: number[] = []

    for (let i = 0; i < len; i++) {
      const cur = queue.shift()!
      row.push(cur.val)
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }

    res.push(row)
  }

  return res
}
// @lc code=end
