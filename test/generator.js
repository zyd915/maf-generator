const {Generator} = require("../lib/Generator");
const config = require("./config");

const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '../'));

const generator = new Generator(rootPath, config);
generator.generator().then(function () {
    console.log('generate complated!');
    process.exit(0);
});

process.on('unhandledRejection', error => {
    console.error('unhandledRejection', error);
    process.exit(1) // To exit with a 'failure' code
});

