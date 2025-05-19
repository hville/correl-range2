<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD029 MD031 MD032 MD036 -->
# correl-range2

*correlated variable monte carlo simulations*

• [Example](#example) • [API](#api) • [Notes](#notes) • [License](#license)

## Example

```javascript
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
console.log('correlation', stats.total$.cor('months'))
```

## API

### sim( factory, {confidence=0.8, resolution=128} ).run( N=25_000 ) ⇒ simulation

* *factory*: `randomVariableFactory => model`
* *randomVariableFactory*: taggedTemplate`low high [min med max] {riskName:40%}, ...correlation)` => `randomVariable` to match the simulation confidence interval. The string is parsed to match the `metanorm` arguments
* *randomVariable*: with `.valueOf()` that changes on each iteration
* *simulation*
  * *stats*: empirical distribution cdf, pdf, quantiles, average (based on modules `sample-distribution` and `lazy-stats`)

## Notes
1. use case is human approximation in decision making - "guesstimates"
2. default is to use a confidence interval of 80%
3. variables can be correlated with independent risk factors by providing the linear factor
4. to maintain correlation, each variable returns a single value per cycle - random variables are constant within a given cycle

# License

[MIT](http://www.opensource.org/licenses/MIT) © [Hugo Villeneuve](https://github.com/hville)
