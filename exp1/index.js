const child = require('child_process')

let spawn = child.spawn

function run_something() {
	return new Promise((resolve) => {
		let p1 = spawn('./dist/run', [2, 2000])
		p1.stdout.on('data', (data) => {
			return resolve(data)
		})
	})
}

async function run_parallel() {
	console.time('6 process parallel')
	let arr = [run_something(), run_something(), run_something(), run_something(), run_something()]
	let data = (await Promise.all(arr)).toString()
	console.timeEnd('6 process parallel')
}

async function run() {
	console.time('1 process')
	let data = (await run_something()).toString()
	console.timeEnd('1 process')
}

run_parallel()
run()
