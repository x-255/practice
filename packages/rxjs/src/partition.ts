import { range, partition } from 'rxjs'

const r = range(1, 10)
const [odd, even] = partition(r, (v) => v % 2 === 1)

odd.subscribe((v) => console.log('odd', v))
even.subscribe((v) => console.log('even', v))

/* 
将源 Observable 拆分为两个 Observable，一个是满足谓词的值，另一个是不满足谓词的值。
 */