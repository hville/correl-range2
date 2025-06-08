/*
TESTING LINEAR SENSITIVITY - Covariance, One at a time, Elementary Effects
*/
import SIM from '../sim.js'

const sim = SIM(
(_, // initiation ran once
min0 = _`[1`,
min1 = _`[1 2`,
min2 = _`[1 2 5`,
min3 = _`[1 2 5 6`,
max0 = _`9]`,
max1 = _`8 9]`,
max2 = _`7 8 9]`,
max3 = _`1 7 8 9]`

)=>( // calculations on every iterations
)=>({ // exported results
	min0, min1, min2, min3,
	max0, max1, max2, max3,
})
)

const res = sim.run(300_000)
const stats = res.stats
const format = n => n.toFixed(2).padStart(7)

Object.keys(stats).forEach( (n,i) => console.log(
	n.padEnd(8),
	`0 10 90 100: ${ [0, .1, .9, 1].map( p => format(res.stats[n].Q(p)) ) }  `
))
/* console.log(`==> oat this gives the slope to the underlying 'hidden' risk factors, not the output value. Also, named correlated factors hange the order and index of the factors
d(exp11)/df1: d(f1**1 * f2**1)/df1 = f2 :: 0.5 vs slope of ${ stats.exp11.slope('f1') }
d(exp21)/df1: d(f1**2 * f2**1)/df1 = 2f1*f2 = 2*exp11 :: ${ 2*stats.exp11.ave() } vs slope of ${ stats.exp21.slope('f1') }
d(exp12)/df1: d(f1**1 * f2**2)/df1 = f2**2 = exp02 :: ${ stats.exp02.ave() } vs slope of ${ stats.exp12.slope('f1') }
d(exp22)/df1: d(f1**2 * f2**2)/df1 = 2f1*f2**2 = 2*exp12:: ${ 2*stats.exp12.ave() } vs slope of ${ stats.exp22.slope('f1') }
d(exp02)/df2: 2f2 :: 1 vs slope of ${ stats.exp02.slope('f2') }
`)

 */
