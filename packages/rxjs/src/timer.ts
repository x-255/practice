import { take, timer } from 'rxjs'

const curDate = new Date()
const later = new Date(curDate.getTime() + 2000)

timer(later).subscribe(() => console.log(`It's later than ${later}`))
console.log(curDate)

timer(1000, 1000)
  .pipe(take(5))
  .subscribe((n) => console.log('timer', n))
console.log('timer start')
