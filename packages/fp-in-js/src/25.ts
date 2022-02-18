/*
 * @Description:从数组到树的转换
 * @LastEditTime: 2022-02-18 14:56:26
 * 
 * 当信息被组织在像JSON表达式一样的树中时，关系从父到子。
 * 在像数据库这样的关系系统中，关系是从孩子指向父母的。
 * 这两种组织信息的方法是等价的，根据情况，我们可能会以一种或另一种方式组织数据。
 * 您可能会惊讶地发现，可以使用已知的5个查询函数轻松地在这些表示之间进行转换。
 * 换句话说，不仅可以从树中查询数组，还可以从数组中查询树。
 * 我们有两个数组，每个数组都包含列表和视频。
 * 每个视频都有一个listtid字段，表示它的父列表。
 * 我们想要构建一个列表对象数组，每个对象都有一个名称和一个视频数组。
 * 视频数组将包含视频的id和标题。换句话说，我们想要构建以下结构
 * 
 * [
    {
      "name": "New Releases",
      "videos": [
        {
          "id": 65432445,
          "title": "The Chamber"
        },
        {
          "id": 675465,
          "title": "Fracture"
        }
      ]
    },
    {
      "name": "Thrillers",
      "videos": [
        {
          "id": 70111470,
          "title": "Die Hard"
        },
        {
          "id": 654356453,
          "title": "Bad Boys"
        }
      ]
    }
  ]
 */

function fn25() {
  var lists = [
      {
        id: 5434364,
        name: 'New Releases',
      },
      {
        id: 65456475,
        name: 'Thrillers',
      },
    ],
    videos = [
      {
        listId: 5434364,
        id: 65432445,
        title: 'The Chamber',
      },
      {
        listId: 5434364,
        id: 675465,
        title: 'Fracture',
      },
      {
        listId: 65456475,
        id: 70111470,
        title: 'Die Hard',
      },
      {
        listId: 65456475,
        id: 654356453,
        title: 'Bad Boys',
      },
    ]

  return lists.map(({ id, name }) => ({
    name,
    videos: videos
      .filter(({ listId }) => listId === id)
      .map(({ id, title }) => ({ id, title })),
  }))
}

console.log(fn25())
