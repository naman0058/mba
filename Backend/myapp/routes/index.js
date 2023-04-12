var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool =  require('./pool');
var cors = require('cors')





const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: 'AKIAXDAFFLS2MHJMGPOE',
  secretAccessKey: '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'
});





router.post('/insert/image',upload.single('image'), (req, res) => {
  let body = req.body;
  body['image'] = req.file.filename
  console.log('image',req.file.filename)
 pool.query(`insert into aws_data set ?`,body,(err,result)=>{

  if(err) throw err;
  else{
    uploadFile(req.file.filename)
    // res.json({msg:'sucess'})
    res.redirect('http://localhost:3000/#/FormattedDocument/success')
  
  }

 })



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


router.options('/myaws',cors(),(req,res)=>{
  // console.log('aaa')
  pool.query(`select * from aws_data order by id desc`,(err,result)=>{
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



router.get('/myaws',cors(),(req,res)=>{
  // console.log('aaa')
  pool.query(`select * from aws_data order by id desc`,(err,result)=>{
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
         Bucket: 'cloudnines', // pass your bucket name
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
  Bucket: 'cloudnines', // pass your bucket name
         Key: 'images', // file will be saved as testBucket/contacts.csv
};


router.get('/get-aws-files',cors(),(req,res)=>{
  s3.createBucket({
    Bucket: 'cloudnines'        /* Put your bucket name */
}, function () {
  const params = {
    Bucket: 'cloudnines', // pass your bucket name
    Key: 'images', // file will be saved as testBucket/contacts.csv 
  };
    s3.getObject(params, function (err, data) {
        if (err) {
           res.json(err);
        } else {
            console.log("Successfully dowloaded data from  bucket");
           res.json(data.Body)
        }
    });
});
})



router.options('/get-aws-files',cors(),(req,res)=>{
  s3.createBucket({
    Bucket: 'cloudnines'        /* Put your bucket name */
}, function () {
  const params = {
    Bucket: 'cloudnines', // pass your bucket name
    Key: 'images', // file will be saved as testBucket/contacts.csv 
  };
    s3.getObject(params, function (err, data) {
        if (err) {
           res.json(err);
        } else {
            console.log("Successfully dowloaded data from  bucket");
           res.json(data)
        }
    });
});
})



// uploadFile();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/dashboard',cors(),(req,res)=>{
 
  var query = `select count(id) as counter from aws_data;`
  var query1 = `select count(id) as counter from gdrive;`
  pool.query(query+query1,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })

})

router.options('/dashboard',cors(),(req,res)=>{
 
  var query = `select count(id) as counter from aws_data;`
  var query1 = `select count(id) as counter from gdrive;`
  pool.query(query+query1,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })

})



router.get('/aws-chart',cors(),(req,res)=>{
 
  var query = `select count(a.id) as y , a.date as x from aws_data a group by a.date order by a.date;`
  pool.query(query,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })

})


router.options('/aws-chart',cors(),(req,res)=>{
 
  var query = `select count(a.id) as y , a.date as x from aws_data a group by a.date order by a.date;`

  pool.query(query,(err,result)=>{
    if(err) throw err;
    else res.json(result)
  })

})












router.get('/myaws/delete',cors(),(req,res)=>{
  // console.log('aaa')
  pool.query(`delete from aws_data where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else {
      console.log('reasu',result)
      res.json({msg:'success'})
    }
  })
})


router.options('/myaws/delete',cors(),(req,res)=>{
  // console.log('aaa')
  pool.query(`delete from aws_data where id = '${req.query.id}'`,(err,result)=>{

    if(err) throw err;
    else {
      console.log('reasu',result)
      res.json({msg:'success'})

    }
  })
})



router.get('/mydrive/delete',cors(),(req,res)=>{
  // console.log('aaa')
  pool.query(`delete from gdrive where id = '${req.query.id}'`,(err,result)=>{

    if(err) throw err;
    else {
      console.log('reasu',result)
      res.json({msg:'success'})

    }
  })
})




router.options('/mydrive/delete',cors(),(req,res)=>{
  // console.log('aaa')
  pool.query(`delete from gdrive where id = '${req.query.id}'`,(err,result)=>{
    if(err) throw err;
    else {
      console.log('reasu',result)
      res.json({msg:'success'})

    }
  })
})

module.exports = router;
