/*
 * @Description:检索每个视频的 id、标题、中间有趣的时刻和最小的盒子艺术 url
 * @LastEditTime: 2022-02-18 14:33:33
 *
 * 这是我们之前解决的问题的变体。
 * 这一次，每个视频都有一个有趣的时刻集合，每个代表一个截图有趣或代表整个标题的时间。
 * 请注意，boxarts 和interestingMoments 数组都位于树中的相同深度。
 * 使用 zip()同时检索中间有趣时刻的时间和最小的盒子艺术 url 。
 * 为每个视频返回一个 {id, title, time, url} 对象。
 */

function fn24() {
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
          interestingMoments: [
            { type: 'End', time: 213432 },
            { type: 'Start', time: 64534 },
            { type: 'Middle', time: 323133 },
          ],
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
          interestingMoments: [
            { type: 'End', time: 54654754 },
            { type: 'Start', time: 43524243 },
            { type: 'Middle', time: 6575665 },
          ],
        },
      ],
    },
    {
      name: 'Instant Queue',
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
          interestingMoments: [
            { type: 'End', time: 132423 },
            { type: 'Start', time: 54637425 },
            { type: 'Middle', time: 3452343 },
          ],
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
          interestingMoments: [
            { type: 'End', time: 45632456 },
            { type: 'Start', time: 234534 },
            { type: 'Middle', time: 3453434 },
          ],
        },
      ],
    },
  ]

  //------------ COMPLETE THIS EXPRESSION --------------
  return movieLists.concatMap((movieList) =>
    movieList.videos.concatMap(({ id, title, boxarts, interestingMoments }) =>
      Array.zip(
        boxarts.reducee((b1, b2) =>
          b1.width * b1.height < b2.width * b2.height ? b1 : b2
        ),
        interestingMoments.filter((m) => m.type === 'Middle'),
        ({ url }, { time }) => ({ id, title, time, url })
      )
    )
  )
}

console.log(fn24())
