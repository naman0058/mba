import React from 'react';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';


import Documentation from "../components/Documentation";

export default class API extends React.Component {





  state = {
    data1 : [],
    refreshing:false
}


componentDidMount(){

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });


fetch('http://localhost:4000/myaws', {
    method: 'GET',
    // mode: 'no-cors',
headers: {
'Access-Control-Allow-Origin':'*'
}
  })
  .then((response) => response.json())
    .catch((error) => console.error('Error', error))
    .then((result) => {
  console.log('result',result)
      if (result) {
        this.setState({
          refreshing: false,
          data1: result, //setstate of data which is convert in to fetch data and pass them in to component see below
        });

     
        // alert(result[0].timeleft)


      } else {
        this.setState({
          refreshing: false,
          data1: ['result'], //setstate of data which is convert in to fetch data and pass them in to component see below
        });
      }
    });

}


 encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString("base64");
  return base64;
}

render(){



  let list = this.state.data1

  if (list[0] == undefined) {

    return(
      <>
      <article>
      <p>Upload Formatted Documents</p>
      
      <form action='http://localhost:4000/insert/image' method='post' encType='multipart/form-data'>
<input type='file' name='image' className='form-control'></input>
   

<button type='submit' className='btn btn-primary' style={{marginTop:40}}>Submit</button>
</form>
        

    </article>
      <p>Loading...</p>
      </>
    )

  } 
  
   else if (list[0].id == undefined) {
    
    
    return(
      <>
      <article>
      <p>Upload Formatted Documents</p>
      
      <form action='http://localhost:4000/insert/image' method='post' encType='multipart/form-data'>
<input type='file' name='image' className='form-control'></input>
   

<button type='submit' className='btn btn-primary' style={{marginTop:40}}>Submit</button>
</form>
        

    </article>
      <p>No Data Found</p>
      </>
    )

  }
  
  else {


  return (
    <>
    <article>
      <p>Upload Formatted Documents</p>
      
      <form action='http://localhost:4000/insert/image' method='post' encType='multipart/form-data'>
<input type='file' name='image' className='form-control'></input>
   

<button type='submit' className='btn btn-primary' style={{marginTop:40}}>Submit</button>
</form>
        

    </article>


<br/><br/>

 
        <div className='container'>
          <div className='row'>
            
        
       

          {
  list.map(item=>(

    <div className='col-lg-2'>
         <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">

      <Image src={"http://localhost:4000/images/" + item.image } style={{width:180,textAlign:'center',height:180,objectFit:'contain'}}/>


</Card.Body>
    </Card>

    </div>
  //   <tr>
  //   <th className="border-0" style={{ width: '5%' }}><Image src={"http://localhost:4000/images/" + item.image } style={{width:100}}/></th>
 
  // </tr>
  ))
}

         
</div>
        </div>
          {/* </tbody>
        </Table> */}
   

    </>
  );
  }
}
};
