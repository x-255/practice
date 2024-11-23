import { map, interval, zip, take } from 'rxjs'

const sourceA$ = interval(1000).pipe(map((data) => `A${data + 1}`))
const sourceB$ = interval(2000).pipe(map((data) => `B${data + 1}`))
const sourceC$ = interval(3000).pipe(map((data) => `C${data + 1}`))

zip(sourceA$, sourceB$, sourceC$)
  .pipe(take(5))
  .subscribe((data) => console.log(data))

/* 
zip将多个Observable的数据按顺序一一对应合并成一个数组，然后发出这个数组。
[A1, B1, C1]
[A2, B2, C2]
...
 */