const fs = require('fs');

let files = fs.readdirSync(__dirname+'/models')
                .filter(file=> file.endsWith('.js'));


files.map(file=> {
    let name = file.substring(0, file.length-3);
    module.exports = {
        [`${name}`]: require(__dirname+'/models/'+file)
    };
});

modul.exports['sync'] = ()=> db.sync();

