const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)
const portRange = [8000, 9000]
console.log(getRandomInt(...portRange))