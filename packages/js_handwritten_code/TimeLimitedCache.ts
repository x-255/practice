/* 
  leetcode 2622. 有时间限制的缓存

  编写一个类，它允许获取和设置键-值对，并且每个键都有一个 过期时间 。

  该类有三个公共方法：

  set(key, value, duration) ：接收参数为整型键 key 、整型值 value 和以毫秒为单位的持续时间 duration 。一旦 duration 到期后，这个键就无法访问。如果相同的未过期键已经存在，该方法将返回 true ，否则返回 false 。如果该键已经存在，则它的值和持续时间都应该被覆盖。

  get(key) ：如果存在一个未过期的键，它应该返回这个键相关的值。否则返回 -1 。

  count() ：返回未过期键的总数。
*/

class TimeLimitedCache {
  _cache: {
    [key: number]: {
      value: number,
      timer: NodeJS.Timeout
    }
  }
  constructor() {
      this._cache = {}
  }
  
  set(key: number, value: number, duration: number): boolean {
      const cache = this._cache[key]
      if (cache) {
          clearTimeout(cache.timer)
      }
      this._cache[key] = {
        value,
        timer: setTimeout(() => {
          delete this._cache[key]
        }, duration)
      }
      return !!cache
  }
  
  get(key: number): number {
      return this._cache?.[key]?.value ?? -1
  }
  
  count(): number {
      return Object.keys(this._cache).length
  }
}

