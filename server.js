'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
// Above the upfile is the name used for the file in index.html
  
//  you can do console.log(req.file); to know the names of file properties
  const { originalname, mimetype, size } = req.file;
// another way of writing the above syntax
//const { originalname: name, mimetype : type, size } = req.file;
//after doing so simply return res.json({name, type, size});
  
  return res.json({
    name: originalname,
    type: mimetype,
    size
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});


/*Points to be noted here 
1.usage of multer in package.json i.e in dependencies for file processing
2.require multer in server.js
3.rest you can go through the comments in server.js to see further details

*/
