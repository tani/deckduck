const createProcessor = require("./processor")
const yargs = require("yargs")
const vfile = require("to-vfile")
const fs = require("fs")
const path = require("path")
const tmp = require("tmp")
if (yargs.argv._.length === 2) {
    createProcessor(yargs.argv).process(vfile.readSync(yargs.argv._[0]), (error, file)=>{
        if(error) throw error
        if(path.extname(yargs.argv._[1]) === ".html") {
            fs.writeFile(yargs.argv._[1], file.toString())
        } else if (path.extname(yargs.argv._[1]) === ".pdf") {
            tmp.file({ extname: ".html" }, (error, tmpfile) => {
                if (error) throw error
                fs.writeFile(tmpfile, file.toString(), (error) => {
                    if (error) throw error
                    // convert tmpfile to pdf
                })
            })
        } else {
            throw new Error("Invalid output format")
        }
    })
} else if (yargs.argv._.length === 1) {
    createProcessor(yargs.argv).process(vfile.readSync(yargs.argv._[0]), (error, file)=>{
        if(error) throw error
        tmp.file({ extname: ".html" }, (error, tmpfile) => {
            if (error) throw error
            fs.writeFile(tmpfile, file.toString(), (error) => {
                if (error) throw error
                // launch puppeteer
            })
        })
    })
}