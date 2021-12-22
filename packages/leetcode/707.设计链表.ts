/*
 * @lc app=leetcode.cn id=707 lang=typescript
 *
 * [707] 设计链表
 *
 * https://leetcode-cn.com/problems/design-linked-list/description/
 *
 * algorithms
 * Medium (32.45%)
 * Likes:    327
 * Dislikes: 0
 * Total Accepted:    75.8K
 * Total Submissions: 233K
 * Testcase Example:  '["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"]\n' +
  '[[],[1],[3],[1,2],[1],[1],[1]]'
 *
 * 设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next
 * 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。
 * 
 * 在链表类中实现这些功能：
 * 
 * 
 * get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
 * addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
 * addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
 * addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index
 * 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
 * deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * MyLinkedList linkedList = new MyLinkedList();
 * linkedList.addAtHead(1);
 * linkedList.addAtTail(3);
 * linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
 * linkedList.get(1);            //返回2
 * linkedList.deleteAtIndex(1);  //现在链表是1-> 3
 * linkedList.get(1);            //返回3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 所有val值都在 [1, 1000] 之内。
 * 操作次数将在  [1, 1000] 之内。
 * 请不要使用内置的 LinkedList 库。
 * 
 * 
 */

// @lc code=start
class Node {
  constructor(
    public value: number,
    public next: Node | null = null,
    public prev: Node | null = null,
  ) {}
}
class MyLinkedList {
  private root = new Node(-1)
  private size = 0

  private _get(index: number): Node | null {
    if (index < 0 || index > this.size) {
      return null
    }

    let temp: Node | null = this.root

    while (index-- >= 0) {
      if (!temp) {
        return null
      }
      temp = temp.next
    }
    return temp
  }

  get(index: number): number {
    const node = this._get(index)
    return node?.value ?? -1
  }

  addAtHead(val: number): void {
    const old = this.root.next
    const h = new Node(val, old, this.root)
    this.root.next = h
    if (old) {
      old.prev = h
    }
    this.size++
  }

  addAtTail(val: number): void {
    const old = this._get(this.size - 1) ?? this.root
    const t = new Node(val, null, old)
    old.next = t
    this.size++
  }

  addAtIndex(index: number, val: number): void {
    const { size } = this
    if (index === size) {
      return this.addAtTail(val)
    } else if (index > size) {
      return
    } else if (index < 0) {
      return this.addAtHead(val)
    }

    const n = this._get(index)!
    const p = n.prev!
    const c = new Node(val, n, p)
    n.prev = c
    p.next = c
    this.size++
  }

  deleteAtIndex(index: number): void {
    const c = this._get(index)
    if (c) {
      const p = c.prev!
      const n = c.next
      p.next = n
      n && (n.prev = p)
      this.size--
    }
  }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end
