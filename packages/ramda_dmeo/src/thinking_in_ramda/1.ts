import { curry, filter, map, pipe, prop } from 'ramda'

interface Book {
  title: string
  year: number
}

const publishedInYear = curry((year: number, book: Book) => book.year === year)

const titlesForYear = (year: number, books: Book[]) =>
  pipe(filter(publishedInYear(year)), map(prop('title')))(books)

const books: Book[] = [
  { title: 'A', year: 2000 },
  { title: 'B', year: 2000 },
  { title: 'C', year: 2001 },
]

console.log(titlesForYear(2000, books)) // ['A', 'B']
