/**
 * Parses a string and returns metanorm arguments and risk factors
 * @param {TemplateStringsArray} strings
 * @param  {...any} values
 * @returns {Object} metanorm arguments
 */
export default function(strings, ...values) {
	// Combine template strings and values
	const tokens = strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '').split(/\s+/),
				points = [],
				options = {},
				risks = {}

	for (let t of tokens) {
		if (t.endsWith(']')) options.max = +t.slice(0, -1)
		else if (t.startsWith('[')) options.min = +(t.slice(1))
		else if (t.includes(':')) {
			const [key, val] = t.split(':')
			risks[key] = val.endsWith('%') ? +val.slice(0, -1)/100 : +val
		}
		else if (t.includes('=')) {
			const [key, val] = t.split('=')
			options[key] = val.endsWith('%') ? +val.slice(0, -1)/100 : +val
		}
		else points.push(+t.replace(/[,_]/g,''))
	}
	if (points.length === 3) options.med = points.splice(1,1)[0]
	points.push(options)
	return {points, risks}
}
