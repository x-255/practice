import {
  filter,
  pipe,
  lt,
  prop,
  map,
  pick,
  propEq,
  curry,
  assoc,
  sort,
  descend,
  take,
} from 'ramda'

interface Student {
  sex: string
  name: string
  age: number
  grade: number
}

type Students = Student[]

const students: Students = [
  {
    sex: 'M',
    name: 'vyo',
    age: 18,
    grade: 72,
  },
  {
    sex: 'M',
    name: 'Uktg',
    age: 17,
    grade: 86,
  },
  {
    sex: 'F',
    name: 'gZW',
    age: 18,
    grade: 87,
  },
  {
    sex: 'F',
    name: 'NqXw',
    age: 19,
    grade: 79,
  },
  {
    sex: 'M',
    name: '3U5',
    age: 17,
    grade: 82,
  },
  {
    sex: 'M',
    name: 'OVfZ',
    age: 19,
    grade: 54,
  },
  {
    sex: 'F',
    name: 'Hu8M',
    age: 17,
    grade: 62,
  },
  {
    sex: 'M',
    name: '5Rx',
    age: 18,
    grade: 92,
  },
  {
    sex: 'M',
    name: '8GPC',
    age: 18,
    grade: 79,
  },
  {
    sex: 'M',
    name: 'Z2d',
    age: 17,
    grade: 82,
  },
  {
    sex: 'M',
    name: 'QyKY',
    age: 19,
    grade: 59,
  },
  {
    sex: 'M',
    name: 'VT1',
    age: 19,
    grade: 89,
  },
  {
    sex: 'F',
    name: 'n0ap',
    age: 17,
    grade: 58,
  },
  {
    sex: 'M',
    name: 'ptTc',
    age: 17,
    grade: 65,
  },
  {
    sex: 'M',
    name: 'Xvhf',
    age: 18,
    grade: 65,
  },
  {
    sex: 'F',
    name: 'uMe1',
    age: 18,
    grade: 56,
  },
  {
    sex: 'F',
    name: 'jXgh',
    age: 18,
    grade: 77,
  },
  {
    sex: 'M',
    name: 'wOR',
    age: 19,
    grade: 78,
  },
  {
    sex: 'M',
    name: 'Hqn',
    age: 17,
    grade: 74,
  },
  {
    sex: 'F',
    name: 'QC3',
    age: 17,
    grade: 59,
  },
]

const ageIsUnder18 = (item: Student) => lt(prop('age', item), 18)
const getAgeUnder18 = (arr: Students) =>
  pipe(filter(ageIsUnder18), map(pick(['name', 'age'])))(arr)

const getMales = (arr: Students) => filter(propEq('sex', 'M'), arr)

const updateUsersGradeByName = curry(
  (name: String, grade: number, arr: Students) =>
    map(
      (item) =>
        propEq('name', name, item) ? assoc('grade', grade, item) : item,
      arr
    )
)

const getGradeTop10 = (arr: Students) =>
  pipe(
    sort<Student>(descend(prop('grade'))),
    take(10),
    map(pick(['name', 'grade']))
  )(arr)

console.log(getGradeTop10(students))
