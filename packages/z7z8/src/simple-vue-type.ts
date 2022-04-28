type GetComputed<T> = T extends Record<string, (...args: any[]) => any>
  ? { [K in keyof T]: ReturnType<T[K]> }
  : never

declare function SimpleVue<D, C, M>(
  options: {
    data: (this: {}) => D
    computed: C
    methods: M
  } & ThisType<D & GetComputed<C> & M>
): any

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
    },
  },
})
