import metanorm from '@hugov/metanorm'
import RandomNumber from './src/_random-number.js'
import Sim from './src/_sim.js'
import parser from '@hugov/metanorm/parser.js'
export {default as Stats} from './src/_stats.js'

/**
 * @param {function} factory (...once) => (...each) => ({...sample})
 * @param {Object} [options]
 * @param {number} [options.confidence=0.8] either confidence interval (default IQR) or min and max of N samples (eg 3 gives 0.59)
 * @param {number} [options.resolution=128] number of points in empirical distribution
 * @returns
 */
export default function( factory, {confidence=0.8, resolution=128}={} ) {
	const	riskNames = [],
				rndNs = [],
				conf = confidence <= 1 ? confidence : Math.pow(2, 1 - 1/confidence) - 1

	let init = false
	const rndFn = function(strings, ...values) {
		if (init) throw Error('distribution definition must be at initiation')
		const {points, options, risks} = parser(strings, ...values)
		return rndNs[rndNs.length] = new RandomNumber( metanorm(...points, options) )._link(riskNames, risks)
	}
	const model = factory(rndFn)
	init = true
	return new Sim(rndNs, riskNames, model, resolution)
}
