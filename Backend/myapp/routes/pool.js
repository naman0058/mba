 
var mysql = require('mysql')



const pool = mysql.createPool({

  host:'localhost',
  user: 'root',
 password:'123',
   database: 'aws',
   port:'3306' ,
   multipleStatements: true
 })
  


  // footer , checkout(footer) , view-product(footer) , similar-product ,  single-vendor-details (product show)

// https://www.webwiki.com/info/add-website.html


// AIzaSyCYcFwXvWVQ8h41nugPmK4ajd-MEeWRnXs


// 380320AnfL61mSot62e7789bP1 MSG91 API KEY
// 380320AhIyd5lZU62ea0eebP1 MSG91 API KEY


//  add-agent1
// save-merchant1




// cloudinary.config({ 
//   cloud_name: 'dealsaaj', 
//   api_key: '834585216648781', 
//   api_secret: '5EGwTslWUo6qfp3vlA5_-Q8-LNk' 
// });
  

module.exports = pool;

