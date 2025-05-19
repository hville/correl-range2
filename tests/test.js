//import icdf from 'norm-dist/icdf-voutier.js'
import t from 'assert-op'
//import a from 'assert-op/assert.js'
import _ from '../src/parser.js'

t('2pts, no risk factors', a => {
	let data = _`1 2`
	a('{==}', data.points, [1,2, {}], 'correct points')
	a('{==}', data.risks, {}, 'correct risks')
})
t('2pts, risk factors', a => {
	let data = _`1 2 eco:.1 pol:10%`
	a('{==}', data.points, [1,2, {}], 'correct points')
	a('{==}', data.risks, {eco:.1, pol:.1}, 'correct risks')
})
t('3pts, risk factors,  mixed order', a => {
	let data = _`eco:-.1 [-1 1 2 3 4]  pol:-10`
	a('{==}', data.points, [1,3, {min:-1, med:2, max:4}], 'correct points')
	a('{==}', data.risks, {eco:-.1, pol:-10}, 'correct risks')
})
t('options', a => {
	let data = _`1 2 ci=90% max=9`
	a('{==}', data.points, [1,2, {max:9, ci:.9}], 'correct points')
})
