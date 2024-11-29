import { timer, map, take, Subject, combineLatestAll } from 'rxjs'
import { debug } from 'rxjs-browser-debugger'

const generateStream = (round: number) =>
  timer(0, 1000).pipe(
    map((data) => `資料流 ${round}: ${data + 1}`),
    take(3)
  )

const source$ = new Subject<number>()

const stream$ = source$.pipe(
  debug('1'),
  map((round: number) => generateStream(round)),
  debug('2')
)

stream$
  .pipe(combineLatestAll(), debug('3'))
  .subscribe((result) => console.log(result))

source$.next(1)

setTimeout(() => {
  source$.next(2)
  // 結束資料流，不然 combineLatestAll  會持續等待到結束
  source$.complete()
}, 3000)

/* 
stream$在source$完成后，将两个Observable合并，规则类似combineLatest
输出：
['資料流 1: 1', '資料流 2: 1']
['資料流 1: 2', '資料流 2: 1']
['資料流 1: 2', '資料流 2: 2']
['資料流 1: 3', '資料流 2: 2']
['資料流 1: 3', '資料流 2: 3']
 */