import { button, createComponent, init, Methods, onClick } from './src'

interface UserProps {
  firstName: string
  lastName: string
  methods: Methods
}

const initialState = { firstName: 'Marvin', lastName: 'Frachet' }

const methods = {
  changeName: (state, firstName) => ({ ...state, firstName }),
}

const template = ({ firstName, lastName, methods }: UserProps) =>
  button`${onClick(() => {
    methods.changeName('dasda')
  })}Hello ${firstName} ${lastName}`

const User = createComponent({ template, methods, initialState })

init('#app', User(initialState))
