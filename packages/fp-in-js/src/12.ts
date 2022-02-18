/*
 * @Description:检索每个视频的 id、标题和 150x200 的艺术框 URL
 * @LastEditTime: 2022-02-18 13:02:13
 *
 * 我们有一个 boxart 对象的集合，每个对象都有不同的大小和 url。
 * 创建一个查询，为movieLists 中的每个视频选择{id, title, boxart}。
 * 不过这一次，结果中的 boxart 属性将是尺寸为 150x200px 的 boxart 对象的 url。
 * 让我们看看你是否可以用 map()、concatAll() 和 filter() 来解决这个问题。
 *
 * 还有一件事：你不能使用索引器。换句话说，这是 非法的：
 * var itemInArray = movieLists[0];
 */

function fn12() {
  var movieLists = [
    {
      name: 'Instant Queue',
      videos: [
        {
          id: 70111470,
          title: 'Die Hard',
          boxarts: [
            {
              width: 150,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
            },
            {
              width: 200,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg',
            },
          ],
          url: 'http://api.netflix.com/catalog/titles/movies/70111470',
          rating: 4.0,
          bookmark: [],
        },
        {
          id: 654356453,
          title: 'Bad Boys',
          boxarts: [
            {
              width: 200,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg',
            },
            {
              width: 150,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg',
            },
          ],
          url: 'http://api.netflix.com/catalog/titles/movies/70111470',
          rating: 5.0,
          bookmark: [{ id: 432534, time: 65876586 }],
        },
      ],
    },
    {
      name: 'New Releases',
      videos: [
        {
          id: 65432445,
          title: 'The Chamber',
          boxarts: [
            {
              width: 150,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg',
            },
            {
              width: 200,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg',
            },
          ],
          url: 'http://api.netflix.com/catalog/titles/movies/70111470',
          rating: 4.0,
          bookmark: [],
        },
        {
          id: 675465,
          title: 'Fracture',
          boxarts: [
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
          ],
          url: 'http://api.netflix.com/catalog/titles/movies/70111470',
          rating: 5.0,
          bookmark: [{ id: 432534, time: 65876586 }],
        },
      ],
    },
  ]

  return movieLists
    .map((movie) => movie.videos)
    .concatAll()
    .map(({ id, title, boxarts }) =>
      boxarts
        .filter(({ width, height }) => width === 150 && height === 200)
        .map(({ url }) => ({ id, title, boxart: url }))
    )
    .concatAll()
}

console.log(fn12())
