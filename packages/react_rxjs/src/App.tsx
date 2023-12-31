import { useAppDispatch, useAppSelector } from "./store"
import { decrement, increamentAsync, increment, incrementByAmountAsync } from "./store/counterSlice"


function App() {
  const count = useAppSelector(state => state.counter)
  const dispatch = useAppDispatch()

  return (
    <>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(increamentAsync())}>+1 later</button>
      <button onClick={() => dispatch(incrementByAmountAsync(2))}>+2 later</button>
      <p>{count.value}</p>
    </>
  )
}

export default App
