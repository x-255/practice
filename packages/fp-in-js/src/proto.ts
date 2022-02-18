interface Array<T> {
  /** 函数的作用是：遍历数组中的每个子数组，并将结果收集到一个新的平面数组中。注意，concatAll（）函数期望数组中的每个项都是另一个数组。*/
  concatAll(): T extends (infer U)[] ? U[] : []

  /** 几乎每次我们展平一棵树时，我们都会将map（）和concatAll（）链接起来。有时，如果我们要处理几层深的树，我们会在代码中多次重复这种组合。为了节省键入时间，让我们创建一个concatMap函数，它只是一个映射操作，后跟一个concatAll。*/
  concatMap<U>(callbackfn: (value: T) => U[]): U[]

  reducee<U>(
    callbackfn: (previousValue: T, currentValue: T) => U,
    initialValue?: U
  ): U[]
}

interface ArrayConstructor {
  zip<L, R, U>(
    left: L[],
    right: R[],
    combinerFunction: (left: L, right: R) => U
  ): U[]
}

Array.prototype.concatAll = function () {
  const res: any[] = []

  this.forEach((subArr) => {
    if (Array.isArray(subArr)) {
      res.push(...subArr)
    }
  })

  return res
}

Array.prototype.concatMap = function (
  projectionFunctionThatReturnsArray: (value: any) => any[]
) {
  return this.map(projectionFunctionThatReturnsArray).concatAll()
}

Array.prototype.reducee = function (
  callbackfn: (previousValue: any, currentValue: any) => any,
  initialValue?: any
) {
  var counter, accumulatedValue

  // If the array is empty, do nothing
  if (this.length === 0) {
    return this
  } else {
    // If the user didn't pass an initial value, use the first item.
    if (arguments.length === 1) {
      counter = 1
      accumulatedValue = this[0]
    } else if (arguments.length >= 2) {
      counter = 0
      accumulatedValue = initialValue
    } else {
      throw 'Invalid arguments.'
    }

    // Loop through the array, feeding the current value and the result of
    // the previous computation back into the combiner function until
    // we've exhausted the entire array and are left with only one value.
    while (counter < this.length) {
      accumulatedValue = callbackfn(accumulatedValue, this[counter])
      counter++
    }

    return [accumulatedValue]
  }
}

Array.zip = function <L, R, U>(
  left: L[],
  right: R[],
  combinerFunction: (left: L, right: R) => U
) {
  const res: U[] = []

  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    res.push(combinerFunction(left[i], right[i]))
  }

  return res
}
