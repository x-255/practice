/*
 * @Author: x-255 ouhuangff@163.com
 * @Date: 2024-11-24 21:01:54
 * @LastEditTime: 2024-11-24 23:41:58
 * @Description: 将代码转换为rxviz可执行的代码（由于rxviz使用的rxjs6，版本差异原因可能有些代码无法执行）
 */
import { groupBy } from "ramda"

const textarea = document.createElement('textarea')
textarea.style.width = '500px'
textarea.style.height = '300px'
document.body.appendChild(textarea)
const button = document.createElement('button')
button.textContent = 'Transform'
button.style.display = 'block'
document.body.appendChild(button)

button.addEventListener('click', () => {
  const input = textarea.value
  const output = transformViz(input)
  navigator.clipboard.writeText(output).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
})

function transformViz(raw: string) {
  const rxOperators = [
    'audit',
    'auditTime',
    'buffer',
    'bufferCount',
    'bufferTime',
    'bufferToggle',
    'bufferWhen',
    'catchError',
    'combineAll',
    'combineLatest',
    'concat',
    'concatAll',
    'concatMap',
    'concatMapTo',
    'count',
    'debounce',
    'debounceTime',
    'defaultIfEmpty',
    'delay',
    'delayWhen',
    'dematerialize',
    'distinct',
    'distinctUntilChanged',
    'distinctUntilKeyChanged',
    'elementAt',
    'endWith',
    'every',
    'exhaust',
    'exhaustMap',
    'expand',
    'filter',
    'finalize',
    'find',
    'findIndex',
    'first',
    'groupBy',
    'ignoreElements',
    'isEmpty',
    'last',
    'map',
    'mapTo',
    'materialize',
    'max',
    'merge',
    'mergeAll',
    'mergeMap',
    'flatMap',
    'mergeMapTo',
    'mergeScan',
    'min',
    'multicast',
    'observeOn',
    'onErrorResumeNext',
    'pairwise',
    'partition',
    'pluck',
    'publish',
    'publishBehavior',
    'publishLast',
    'publishReplay',
    'race',
    'reduce',
    'repeat',
    'repeatWhen',
    'retry',
    'retryWhen',
    'refCount',
    'sample',
    'sampleTime',
    'scan',
    'sequenceEqual',
    'share',
    'shareReplay',
    'single',
    'skip',
    'skipLast',
    'skipUntil',
    'skipWhile',
    'startWith',
    'subscribeOn',
    'switchAll',
    'switchMap',
    'switchMapTo',
    'take',
    'takeLast',
    'takeUntil',
    'takeWhile',
    'tap',
    'throttle',
    'throttleTime',
    'throwIfEmpty',
    'timeInterval',
    'timeout',
    'timeoutWith',
    'timestamp',
    'toArray',
    'window',
    'windowCount',
    'windowTime',
    'windowToggle',
    'windowWhen',
    'withLatestFrom',
    'zip',
    'zipAll',
  ]
  const output =  raw.replace(/import {(.*)} from 'rxjs'/, (match, keys: string) => {
    const imps = keys.split(',').map((key) => key.trim())
    const { rxs, operators } = groupBy(imp => rxOperators.includes(imp) ? 'operators' : 'rxs', imps)
    return `const { ${rxs.join(', ')} } = Rx;`
    + '\r\n'
    + `const { ${operators.join(', ')} } = RxOperators;`
  })

  return output
}
