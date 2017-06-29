
var glob = require('glob'),
    chalk = require('chalk'),
    fs = require('fs'),
    process = require('process');

console.log(chalk.bgGreen.white.bold("@Plain Concepts -> Creating sass application barrel, please wait..."));
let startTime = new Date();
let sassPath = process.argv.slice(2);
console.log(`Searching sass files in ${sassPath[0]}`);
glob(sassPath[0], { ignore: ["node_modules/**/*.scss", "sassBarrel.scss"] }, function (err, files) {
    if (files.length > 0) {
        var stream = fs.createWriteStream("sassBarrel.scss");
        stream.once('open', function (fd) {
            files.forEach(function (sassfile) {
                console.log(chalk.green(`Processing file: ${sassfile}`));
                stream.write(`@import '${sassfile.substr(0, sassfile.lastIndexOf('.'))}'; \n`);
            });
            stream.end();
        });
    }
});