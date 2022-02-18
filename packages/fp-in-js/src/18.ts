/*
 * @Description:检索最大boxart的url
 * @LastEditTime: 2022-02-18 13:30:48
 *
 * 将reduce（）与map（）结合起来，将多个boxart对象简化为一个值：最大的boxart对象的url。
 */

function fn18() {
  var boxarts = [
    {
      width: 200,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg',
    },
    {
      width: 150,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg',
    },
    {
      width: 300,
      height: 200,
      url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg',
    },
    {
      width: 425,
      height: 150,
      url: 'http://cdn-0.nflximg.com/images/2891/Fracture425.jpg',
    },
  ]

  // You should return an array containing only the URL of the largest box art. Remember that reduce always
  // returns an array with one item.
  return boxarts
    .reducee((box1, box2) => {
      const area1 = box1.width * box1.height
      const area2 = box2.width * box2.height
      return area1 > area2 ? box1 : box2
    })
    .map((v) => v.url)
}
