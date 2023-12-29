import { useAppDispatch, useAppSelector } from "./store"
import { increment, incrementAsync } from "./store/count"

function App() {
  const count = useAppSelector((state) => state.count)
  const dispatch = useAppDispatch()

  return (
    <>
      <button onClick={() => dispatch(increment(1))}>+1</button>
      <button onClick={() => dispatch(incrementAsync(1))}>async +1</button>
      <p>{count}</p>
    </>
  )
}

export default App
