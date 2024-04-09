import { __, always, compose, gt, isEmpty, length, not } from 'ramda'
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  scan,
  shareReplay,
  startWith,
  switchMap,
  take,
} from 'rxjs'
import { getSearchResult, getSuggestions } from './dataUtils'
import { fillAutoSuggestions, fillSearchResult, init } from './domUtils'

init()

const keywork$ = fromEvent(document.querySelector('#keyword')!, 'input').pipe(
  map((e) => (e.target as HTMLInputElement).value),
  startWith(''),
  shareReplay(1)
)

keywork$
  .pipe(
    debounceTime(700),
    distinctUntilChanged(),
    filter(compose(gt(__, 1), length)),
    switchMap(getSuggestions)
  )
  .subscribe(fillAutoSuggestions)

const keywordForSearch$ = keywork$.pipe(take(1))

const search$ = fromEvent(document.querySelector('#search')!, 'click')

const searchByKeyword$ = search$.pipe(
  switchMap(() => keywordForSearch$),
  filter(compose(not, isEmpty))
)

const sort$ = new BehaviorSubject({ sort: 'stars', order: 'desc' })

const changeSort = (sortField: string) => {
  if (sortField === sort$.value.sort) {
    sort$.next({
      sort: sortField,
      order: sort$.value.order === 'desc' ? 'asc' : 'desc',
    })
  } else {
    sort$.next({
      sort: sortField,
      order: 'desc',
    })
  }
}

fromEvent(document.querySelector('#sort-stars')!, 'click').subscribe(() =>
  changeSort('stars')
)
fromEvent(document.querySelector('#sort-forks')!, 'click').subscribe(() =>
  changeSort('forks')
)

const perPage$ = fromEvent(document.querySelector('#per-page')!, 'change').pipe(
  map((e) => (e.target as HTMLSelectElement).value),
  map(Number)
)

const prevPage$ = fromEvent(
  document.querySelector('#previous-page')!,
  'click'
).pipe(map(always(-1)))

const nextPage$ = fromEvent(
  document.querySelector('#next-page')!,
  'click'
).pipe(map(always(1)))

const page$ = merge(prevPage$, nextPage$).pipe(
  scan((page, value) => (page < 1 ? 1 : page + value), 1)
)

const startSearch$ = combineLatest([
  searchByKeyword$,
  sort$,
  perPage$.pipe(startWith(10)),
  page$.pipe(startWith(1)),
])

const searchResult$ = startSearch$.pipe(
  switchMap(([k, s, pp, p]) => getSearchResult(k, s.sort, s.order, p, pp))
)

searchResult$.subscribe(fillSearchResult)
