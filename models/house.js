import SIM from '../sim.js'

const res = SIM(
(_,
// initiation ran once
fixed$ = _`600_000 900_000 [0 demand:0.6 price:0.3`,
month$ = _`5,000 7,000 demand:0.5 season:0.5`,
months = _`6 9 [1 season:0.5 price:-0.5`
)=>(
// calculations on every iterations
total$ = fixed$ + month$ * months
)=>({
// exported results
months,
month$,
total$
})
).run(10_000)

//console.log(res.buffer)
const stats=res.stats
console.log('total$ range', stats.total$.Q(0.1).toFixed(0), stats.total$.Q(0.9).toFixed(0))
console.log('months range', stats.months.Q(0.1).toFixed(4), stats.months.Q(0.9).toFixed(4))
console.log('month$ range', stats.month$.Q(0.1).toFixed(0), stats.month$.Q(0.9).toFixed(0))
console.log('correlation', stats.total$.cor('months'))
