/*
 * @Description:从数组转换到更深层次的树
 * @LastEditTime: 2022-02-18 15:32:05
 * 
 * 让我们尝试创建一个更深层次的树结构。
 * 这一次我们有4个单独的数组，每个数组分别包含列表、视频、boxarts和书签。
 * 每个对象都有一个父id，表示它的父。
 * 我们想要构建一个列表对象数组，每个对象都有一个名称和一个视频数组。
 * 视频数组将包含视频的id、标题、书签时间和最小的boxart url。
 * 换句话说，我们想要构建以下结构:
 * 
  [
      {
        "name": "New Releases",
        "videos": [
          {
            "id": 65432445,
            "title": "The Chamber",
            "time": 32432,
            "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"
          },
          {
            "id": 675465,
            "title": "Fracture",
            "time": 3534543,
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg"
          }
        ]
      },
      {
        "name": "Thrillers",
        "videos": [
          {
            "id": 70111470,
            "title": "Die Hard",
            "time": 645243,
            "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
          },
          {
            "id": 654356453,
            "title": "Bad Boys",
            "time": 984934,
            "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg"
          }
        ]
      }
    ]
 */

function fn26() {
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
    ],
    boxarts = [
      {
        videoId: 65432445,
        width: 130,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg',
      },
      {
        videoId: 65432445,
        width: 200,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg',
      },
      {
        videoId: 675465,
        width: 200,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg',
      },
      {
        videoId: 675465,
        width: 120,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/Fracture120.jpg',
      },
      {
        videoId: 675465,
        width: 300,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg',
      },
      {
        videoId: 70111470,
        width: 150,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
      },
      {
        videoId: 70111470,
        width: 200,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg',
      },
      {
        videoId: 654356453,
        width: 200,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg',
      },
      {
        videoId: 654356453,
        width: 140,
        height: 200,
        url: 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg',
      },
    ],
    bookmarks = [
      { videoId: 65432445, time: 32432 },
      { videoId: 675465, time: 3534543 },
      { videoId: 70111470, time: 645243 },
      { videoId: 654356453, time: 984934 },
    ]

  return lists.map(({ id, name }) => ({
    name,
    videos: videos
      .filter(({ listId }) => listId === id)
      .concatMap(({ id, title }) =>
        Array.zip(
          boxarts
            .filter(({ videoId }) => videoId === id)
            .reducee((b1, b2) =>
              b1.width * b1.height < b2.width * b2.height ? b1 : b2
            ),
          bookmarks.filter(({ videoId }) => videoId === id),
          ({ url }, { time }) => ({ id, title, time, boxart: url })
        )
      ),
  }))
}

console.log(fn26())
