/*
 * @lc app=leetcode.cn id=36 lang=typescript
 *
 * [36] 有效的数独
 *
 * https://leetcode-cn.com/problems/valid-sudoku/description/
 *
 * algorithms
 * Medium (63.87%)
 * Likes:    692
 * Dislikes: 0
 * Total Accepted:    220.3K
 * Total Submissions: 344.9K
 * Testcase Example:  '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'
 *
 * 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。
 *
 *
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
 *
 *
 *
 *
 * 注意：
 *
 *
 * 一个有效的数独（部分已被填充）不一定是可解的。
 * 只需要根据以上规则，验证已经填入的数字是否有效即可。
 * 空白格用 '.' 表示。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：board =
 * [["5","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：board =
 * [["8","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * 输出：false
 * 解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在,
 * 因此这个数独是无效的。
 *
 *
 *
 * 提示：
 *
 *
 * board.length == 9
 * board[i].length == 9
 * board[i][j] 是一位数字（1-9）或者 '.'
 *
 *
 */

// @lc code=start
function isValidSudoku(board: string[][]): boolean {
  if (!isValidBoard(board)) return false
  let colBoard = rowBoard2Col(board)
  if (!isValidBoard(colBoard)) return false

  for (let i = 0; i < 9; i += 3) {
    const rows = board.slice(i, i + 3)
    for (let j = 0; j < 9; j += 3) {
      let group = rows.map((row) => row.slice(j, j + 3)).flat()
      if (!isValidRow(group)) return false
    }
  }

  return true
}

function isValidRow(arr: string[]) {
  let map: AnyObject = {}
  for (let x of arr) {
    if (x !== '.') {
      if (x in map) return false
      else map[x] = x
    }
  }
  return true
}

function isValidBoard(board: string[][]) {
  for (let row of board) {
    if (!isValidRow(row)) return false
  }
  return true
}

function rowBoard2Col(board: string[][]) {
  const cols = []
  for (let i = 0; i < board.length; i++) {
    cols[i] = board.map((row) => row[i])
  }

  return cols
}
// @lc code=end
