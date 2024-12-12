import { lensPath, lensProp, over, toUpper, view } from "ramda"

interface Person {
  name: string
  socialMedia: {
    github: string
    twitter: string
  }
}

const person: Person = {
  name: 'Randy',
  socialMedia: {
    github: 'randycoulman',
    twitter: '@randycoulman'
  }
}

const twitterLens = lensPath<Person, string>(['socialMedia', 'twitter'])
const nameLens = lensProp<Person,'name'>('name')

const twitter = view(twitterLens, person)
console.log(`twitter====`, twitter)

const person1 = over(nameLens, toUpper, person)
console.log(`person1====`, person1)

const name = view(nameLens, person)
console.log(`name====`, name)