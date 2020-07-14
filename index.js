const child = require('child_process')

let spawn = child.spawn

function run_something() {
	return new Promise((resolve) => {

        // This is our python build.
        // Use pyinstaller --onefile ./run,py
        // 2 and 2000 are command line args.
        // calculating 2^100
        let p1 = spawn('./dist/run', [2, 2000])
        

		p1.stdout.on('data', (data) => {
			return resolve(data)
		})
	})
}

async function run_parallel() {
    console.time('6 process parallel')
    
    // We can have different functions here -> raw_to_jpeg, save_metadata or just pass different bathces
	let arr = [run_something(), run_something(), run_something(), run_something(), run_something()]
	let data = (await Promise.all(arr)).toString()
    // Log this data to see the output
    
    console.timeEnd('6 process parallel')
}

async function run() {
	console.time('1 process')
    let data = (await run_something()).toString()
    // Log this data to see the output
    
	console.timeEnd('1 process')
}

run_parallel()
run()
