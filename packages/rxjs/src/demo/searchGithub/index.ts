import {
  __,
  add,
  always,
  compose,
  gt,
  isEmpty,
  length,
  max,
  not,
  propEq,
  uncurryN,
} from 'ramda'
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  fromEvent,
  map,
  merge,
  scan,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs'
import { getSearchResult, getSuggestions } from './dataUtils'
import {
  fillAutoSuggestions,
  fillSearchResult,
  init,
  loaded,
  loading,
  updateForksSort,
  updatePageNumber,
  updateStarsSort,
} from './domUtils'

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

const keywordForSearch$ = keywork$.pipe(first())

const search$ = fromEvent(document.querySelector('#search')!, 'click')

const searchByKeyword$ = search$.pipe(
  switchMap(() => keywordForSearch$),
  filter(compose(not, isEmpty))
)

interface SortBy {
  sort: string
  order: string
}

const sortBy$ = new BehaviorSubject<SortBy>({ sort: 'stars', order: 'desc' })

const changeSort = (sortField: string) => {
  if (sortField === sortBy$.value.sort) {
    sortBy$.next({
      sort: sortField,
      order: sortBy$.value.order === 'desc' ? 'asc' : 'desc',
    })
  } else {
    sortBy$.next({
      sort: sortField,
      order: 'desc',
    })
  }
}

sortBy$.pipe(filter<SortBy>(propEq('sort', 'stars'))).subscribe(updateStarsSort)
sortBy$.pipe(filter<SortBy>(propEq('sort', 'forks'))).subscribe(updateForksSort)

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
  scan(compose(max(1), uncurryN(2, add)), 1)
)

page$.subscribe(updatePageNumber)

const startSearch$ = combineLatest([
  searchByKeyword$,
  sortBy$,
  page$.pipe(startWith(1)),
  perPage$.pipe(startWith(10)),
]).pipe(
  distinctUntilChanged((a, b) => a[2] === b[2]),
  tap(loading)
)

const searchResult$ = startSearch$.pipe(
  switchMap(([k, s, p, pp]) => getSearchResult(k, s.sort, s.order, p, pp)),
  tap(loaded)
)

searchResult$.subscribe(fillSearchResult)
