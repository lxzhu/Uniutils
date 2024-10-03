const { program } = require('commander');
const EventEmitter = require('events');
const readline = require('readline');
const csv = require('csv');
//
function parse_list(delimiter) {
    return function (inputValue, prevValue) {
        return inputValue.split(delimiter);
    }
}

// define options and arguments
var inputFile = null;
var outputFile = null;
var argv = {};
program
    .name("cut - select sections from each line")
    .description("Hello it is me")
    .version("1.0.0")
    .option("-d, --delimiter <DELIM>", "use DELIM instead of TAB for field delimiter", "\t")
    .option("-i, --include-fields [LIST]", "include these fields. This option is prioritized over exclude-fields when both are provided.", parse_list(','))
    .option("-e, --exclude-fields [LIST]", "exclude these fields", parse_list(','))
    .argument("[input-file]", "input file", (value, prev) => { argv.input_file = value; })
    .argument("[output-file]", "Specify output file", (value, prev) => { argv.output_file = value; });
var cmd = program.parse();
var opts = cmd.opts();

console.log(cmd.opts().delimiter)
console.log(argv.input_file);

process.stdin
    .pipe(csv.parse({ delimiter: "\t" }))
    .pipe(csv.transform((record) => {
        console.log(record);
        return [record[0], record[2]];
    }))
    .pipe(csv.stringify({
        delimiter: cmd.delimiter,
        quoted: true
    }))
    .pipe(process.stdout);