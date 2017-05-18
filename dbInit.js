require('bable-core/register')({
    presets: ['stage-3']
});

const model = require('./model.js');

model.sync();
console.log('db init ok.');

process.exit(0);

