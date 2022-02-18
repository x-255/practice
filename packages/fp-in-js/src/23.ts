/*
 * @Description:通过索引结合视频和书签
 * @LastEditTime: 2022-02-18 14:20:11
 *
 * 使用新的zip()函数。对于每个视频和书签对，创建一个{videoId, bookmarkId}对。
 */

function fn23() {
  var videos = [
      {
        id: 70111470,
        title: 'Die Hard',
        boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
        uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 4.0,
      },
      {
        id: 654356453,
        title: 'Bad Boys',
        boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
        uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 5.0,
      },
      {
        id: 65432445,
        title: 'The Chamber',
        boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
        uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 4.0,
      },
      {
        id: 675465,
        title: 'Fracture',
        boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
        uri: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 5.0,
      },
    ],
    bookmarks = [
      { id: 470, time: 23432 },
      { id: 453, time: 234324 },
      { id: 445, time: 987834 },
    ]

  return Array.zip(videos, bookmarks, (v, b) => ({
    videoId: v.id,
    bookmarkId: b.id,
  }))
}
