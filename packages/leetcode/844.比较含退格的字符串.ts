/*
 * @lc app=leetcode.cn id=844 lang=typescript
 *
 * [844] 比较含退格的字符串
 *
 * https://leetcode-cn.com/problems/backspace-string-compare/description/
 *
 * algorithms
 * Easy (50.84%)
 * Likes:    348
 * Dislikes: 0
 * Total Accepted:    99.8K
 * Total Submissions: 196.4K
 * Testcase Example:  '"ab#c"\n"ad#c"'
 *
 * 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，请你判断二者是否相等。# 代表退格字符。
 *
 * 如果相等，返回 true ；否则，返回 false 。
 *
 * 注意：如果对空文本输入退格字符，文本继续为空。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "ab#c", t = "ad#c"
 * 输出：true
 * 解释：S 和 T 都会变成 “ac”。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "ab##", t = "c#d#"
 * 输出：true
 * 解释：s 和 t 都会变成 “”。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "a##c", t = "#a#c"
 * 输出：true
 * 解释：s 和 t 都会变成 “c”。
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "a#c", t = "b"
 * 输出：false
 * 解释：s 会变成 “c”，但 t 仍然是 “b”。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length, t.length <= 200
 * s 和 t 只含有小写字母以及字符 '#'
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你可以用 O(N) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？
 *
 *
 *
 *
 */

// @lc code=start
/* 正则
const getResStr = (s: string) => {
  const re = /\w?#/

  while (re.test(s)) {
    s = s.replace(re, '')
  }

  return s
}

function backspaceCompare(s: string, t: string): boolean {
  if (s === t) {
    return true
  }

  return getResStr(s) === getResStr(t)
} */

// 双指针
function backspaceCompare(s: string, t: string): boolean {
  let si = s.length - 1,
    ti = t.length - 1

  while (si >= 0 || ti >= 0) {
    let ss = 0,
      ts = 0

    while (si >= 0) {
      if (s[si] === '#') {
        ss++
        si--
      } else if (ss > 0) {
        ss--
        si--
      } else {
        break
      }
    }

    while (ti >= 0) {
      if (t[ti] === '#') {
        ts++
        ti--
      } else if (ts > 0) {
        ts--
        ti--
      } else {
        break
      }
    }

    if (s[si] !== t[ti]) {
      return false
    }

    si--
    ti--
  }

  return true
}

// @lc code=end
