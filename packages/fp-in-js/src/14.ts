/*
 * @Description: 使用concatMap（）检索每个视频的id、标题和150x200方块艺术url
 * @LastEditTime: 2022-02-18 11:31:03
 *
 * 让我们重复刚才(12)的练习。
 * 不过，这次我们将通过替换map（）来简化代码。concatAll（）使用concatMap（）调用。
 */

function fn14() {
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

  // Use one or more concatMap, map, and filter calls to create an array with the following items
  // [
  //	 {"id": 675465, "title": "Fracture", "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
  //	 {"id": 65432445, "title": "The Chamber", "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
  //	 {"id": 654356453, "title": "Bad Boys", "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
  //	 {"id": 70111470, "title": "Die Hard", "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
  // ];

  return movieLists
    .concatMap((movie) => movie.videos)
    .concatMap((video) =>
      video.boxarts
        .filter((box) => box.width === 150 && box.height === 200)
        .map((box) => ({ id: video.id, title: video.title, boxart: box.url }))
    )
}

console.log(fn14())
