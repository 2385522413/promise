const fs = require('fs');
const util = require('util');
//util.promisify是返回一个promsie对象
var myreadFile = util.promisify(fs.readFile);
myreadFile('./content.txt').then(value => {
    console.log(value.toString());
})
