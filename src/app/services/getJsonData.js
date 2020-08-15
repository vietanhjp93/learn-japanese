'use strict';
const { Storage } = require('@google-cloud/storage'); 
const storage = new Storage({ keyFilename: './learnjapaneseeas-1593326137089-a6b2fb101e63.json' });
exports.readFile = (req, res) => {
        console.log('Reading File');
        let stream = storage.bucket('news-list-folder').file('news.json').createReadStream();
        console.log('Concat Data');
        let buf = '';
        stream.on('data', function(d) {
          buf += d;
        }).on('end', function() {
          console.log(buf);
          console.log("End");
          res.send(buf);
        });     

};