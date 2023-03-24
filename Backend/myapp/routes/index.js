var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool =  require('./pool');
var cors = require('cors')





const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: 'AKIAU4KLUEYUE5VSVKOF',
  secretAccessKey: '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'
});





router.post('/insert/image',upload.single('image'), (req, res) => {
  let body = req.body;
  body['image'] = req.file.filename
  console.log('image',req.file.filename)
  uploadFile(req.file.filename)
  // res.json({msg:'sucess'})
  res.redirect('http://localhost:3000/#/FormattedDocument/success')


})



router.post('/insert/gdrive',upload.single('image'), (req, res) => {
  let body = req.body;
  body['image'] = req.file.filename
  console.log('image',req.file.filename)
 pool.query(`insert into gdrive set ?`,body,(err,result)=>{
  if(err) throw err;
  else  res.redirect('http://localhost:3000/#/GDrive/success')

 })


})



// router.options('/mydrive',(req,res)=>{
//   // console.log('aaa')
//   pool.query(`select * from gdrive order by id desc`,(err,result)=>{
//     if(err) throw err;
//     else {
//       console.log('reasu',result)
//       res.json(result)
//     }
//   })
// })



router.options('/mydrive',cors(),(req,res)=>{
  // console.log('aaa')
  pool.query(`select * from gdrive order by id desc`,(err,result)=>{
    if(err) throw err;
    else {
      console.log('reasu',result)
      res.json(result)
    }
  })
})



router.get('/mydrive',cors(),(req,res)=>{
  // console.log('aaa')
  pool.query(`select * from gdrive order by id desc`,(err,result)=>{
    if(err) throw err;
    else {
      console.log('reasu',result)
      res.json(result)
    }
  })
})



router.options('/check-password',cors(),(req,res)=>{
  console.log('aaa',req.body)
  pool.query(`select * from admin where email = '${req.body.email}' and password = '${req.body.password}'`,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
      res.json({msg:'success'})
    }
    else {
     res.json({msg:'invalid'})
    }
  })
})


router.post('/check-password',cors(),(req,res)=>{
  console.log('aaa',req.body)
  pool.query(`select * from admin where email = '${req.body.email}' and password = '${req.body.password}'`,(err,result)=>{
    if(err) throw err;
    else if(result[0]){
      console.log('aaabxsss',result)

      res.json({msg:'success'})
    }

    else {
      console.log('aaab',result)
     res.json({msg:'invalid'})
    }
  })
})




const uploadFile = (fileName) => {
  fs.readFile(`public/images/${fileName}`, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: 'namanbucket0058', // pass your bucket name
         Key: 'images', // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
};


const params = {
  Bucket: 'namanbucket0058', // pass your bucket name
         Key: 'images', // file will be saved as testBucket/contacts.csv
};


router.get('/get-aws-files',(req,res)=>{
  s3.createBucket({
    Bucket: 'namanbucket0058'        /* Put your bucket name */
}, function () {
  const params = {
    Bucket: 'namanbucket0058', // pass your bucket name
    Key: 'images', // file will be saved as testBucket/contacts.csv 
  };
    s3.getObject(params, function (err, data) {
        if (err) {
           res.json(err);
        } else {
            console.log("Successfully dowloaded data from  bucket");
           res.json(data.Body.toString())
        }
    });
});
})

const s3download = function (params) {
  return new Promise((resolve, reject) => {
      s3.createBucket({
          Bucket: 'namanbucket0058'        /* Put your bucket name */
      }, function () {
          s3.getObject(params, function (err, data) {
              if (err) {
                  reject(err);
              } else {
                  console.log("Successfully dowloaded data from  bucket");
                  resolve(data);
              }
          });
      });
  });
}

// uploadFile();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
