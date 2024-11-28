import { from, of } from 'rxjs'
import { debug } from 'rxjs-browser-debugger'
import { mergeMap } from 'rxjs/operators'

of([1, 2, 3])
  .pipe(debug('of'), mergeMap(from), debug('from'))
  .subscribe(console.log)


/* 
将 -([1,2,3]|)的流转换为 -1--2--(3|)的流
 */