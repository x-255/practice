/*
 * @Description:检索每个视频的id、标题和最小的框艺术url。
 * @LastEditTime: 2022-02-18 13:39:16
 *
 * 这是我们之前解决的问题的变体，我们检索了宽度为150px的boxart的url。
 * 这次我们将使用reduce（）而不是filter（）来检索boxarts数组中最小的方块艺术。
 */

function fn20() {
  var movieLists = [
    {
      name: 'New Releases',
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
              width: 140,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg',
            },
          ],
          url: 'http://api.netflix.com/catalog/titles/movies/70111470',
          rating: 5.0,
          bookmark: [{ id: 432534, time: 65876586 }],
        },
      ],
    },
    {
      name: 'Thrillers',
      videos: [
        {
          id: 65432445,
          title: 'The Chamber',
          boxarts: [
            {
              width: 130,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg',
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
              width: 120,
              height: 200,
              url: 'http://cdn-0.nflximg.com/images/2891/Fracture120.jpg',
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

  // Use one or more concatMap, map, and reduce calls to create an array with the following items (order matters)
  // [
  //	 {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
  //	 {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
  //	 {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
  //	 {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
  // ];

  return movieLists
    .concatMap((movieList) => movieList.videos)
    .concatMap(({ id, title, boxarts }) =>
      boxarts
        .reducee((box1, box2) => {
          const area1 = box1.width * box1.height
          const area2 = box2.width * box2.height
          return area1 < area2 ? box1 : box2
        })
        .map(({ url }) => ({ id, title, boxart: url }))
    )
}

console.log(fn20())
