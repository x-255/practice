import { button, createComponent, init, onClick } from './src'

interface UserProps {
  firstName: string
  lastName: string
}

const initialState = { firstName: 'Marvin', lastName: 'Frachet' }

const methods = {
  changeName: (state, firstName) => ({ ...state, firstName }),
}

const template = ({ firstName, lastName }: UserProps) =>
  button`${onClick(() => console.log(123123))}Hello ${firstName} ${lastName}`

const User = createComponent({ template, methods, initialState })

init('#app', User(initialState))
