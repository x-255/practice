import { from, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { debug } from 'rxjs-browser-debugger';

of([1, 2, 3]).pipe(debug('of'), mergeMap(from), debug('from')).subscribe(console.log)
