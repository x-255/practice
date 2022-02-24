/**
 * stock: { id: string, price: number, change: number }
 */

const server = connectToServer()

const addStockName = (stock) => setProp('name', stock, stock.id)

const formatSign = (val) => (Number(val) > 0 ? `+${val}` : val)

const formatCurrency = (val) => `$${val}`

const transformObservable = (mapperFn, obsv) => obsv.map(mapperFn)

function formatStockNumbers(stock) {
  const updateTuples = [
    ['price', formatPrice(stock.price)],
    ['change', formatCurrency(stock.change)],
  ]

  return reduce((stock, [key, val]) => setProp(key, stock, val))(stock)(
    updateTuples
  )
}

const formatDecimal = unboundMethod('toFixed')(2)
const formatPrice = compose(formatSign, formatDecimal)
const formatChange = compose(formatCurrency, formatDecimal)
const processNewStock = compose(formatStockNumbers, addStockName)

var makeObservableFromEvent = curry(Rx.Observable.fromEvent, 2)(server)

var observableMapperFns = [processNewStock, formatStockNumbers]

var [newStocks, stockUpdates] = pipe(
  map(makeObservableFromEvent),
  curry(zip)(observableMapperFns),
  map(spreadArgs(transformObservable))
)(['stock', 'stock-update'])
