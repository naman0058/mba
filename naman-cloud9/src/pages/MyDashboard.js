import React from 'react';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import uploadFileToBlob, { isStorageConfigured, getBlobsInContainer } from './azure-storage-blob';
import {CanvasJSChart} from 'canvasjs-react-charts'



export default class NEWAPI extends React.Component {





  state = {
    data1 : [],
    refreshing:false,
    azureData:'',
    awsDate:'',
    awsCount:''
}


componentDidMount(){
  this.getAwsChart()
  this.getAzureDocument()
fetch('http://localhost:4000/dashboard', {
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


getAzureDocument(){
  getBlobsInContainer().then((list) =>{
   this.setState({azureData:list.length})
  })
}



getAwsChart(){
  fetch('http://localhost:4000/aws-chart', {
    method: 'GET',
    // mode: 'no-cors',
headers: {
'Access-Control-Allow-Origin':'*'
}
  })
    .then((response) => response.json())
    .catch((error) => console.error('Error', error))
    .then((result1) => {
console.log(result1)
      if(result1){
        // console.log('aaa',result1)

this.setState({
  awsDate : result1
})

        var month = [];
        var totalprice = []
       for(var i in result1){
           month.push(result1[i].date)
           totalprice.push(result1[i].counter)
       }



       this.setState({
        // awsDate : month,
        awsCount : totalprice
       })



   
      }
      else{
alert('Error Occureed')
      }
     
    
  
})


}


render(){


  console.log('month',this.state.awsDate)


if(this.state.awsDate){
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title:{
      text: "Bounce Rate by Week of Year"
    },
    axisY: {
      title: "Bounce Rate",
      suffix: "%"
    },
    axisX: {
      title: "Week of Year",
      prefix: "W",
      interval: 2
    },
    data: [{
      type: "line",
      toolTipContent: "Week {x}: {y}%",
      dataPoints:this.state.awsDate
    }]

  }
}



  let list = this.state.data1

  // console.log(list)

  if (list[0] == undefined) {

    return(
      <>
      <article>
      <p>Upload GDrive Documents</p>
      
      <form action='http://localhost:4000/insert/gdrive' method='post' encType='multipart/form-data'>
<input type='file' name='image' className='form-control'></input>
   

<button type='submit' className='btn btn-primary' style={{marginTop:40}}>Submit</button>
</form>
        

    </article>
      <p>Loading...</p>
      </>
    )

  } 
  
  else if (list[0][0].counter == undefined) {
    
    console.log('list',list[0][0].counter)
    
    return(
      <>
   
      <p>No Data Found</p>
      </>
    )

  } else {


  return (
    <>
  


<br/><br/>

<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
        <div className='container'>
          <div className='row'>
            
        
          <div className='col-lg-4'>
         <Card border="light" className="shadow-sm">
      <Card.Body className="p-5">

<h3>AWS Documents</h3>
  <p>Total Documents {list[0][0].counter}</p>

</Card.Body>
    </Card>

    </div>



    <div className='col-lg-4'>
         <Card border="light" className="shadow-sm">
      <Card.Body className="p-5">

<h3>Drive Documents</h3>
  <p>Total Documents {list[1][0].counter}</p>

</Card.Body>
    </Card>

    </div>



    <div className='col-lg-4'>
         <Card border="light" className="shadow-sm">
      <Card.Body className="p-5">

<h3>Azure Documents</h3>
  <p>Total Documents {this.state.azureData}</p>

</Card.Body>
    </Card>


    

    </div>


{
  (this.state.awsDate ?    
    
    
    <div className='col-lg-12' style={{marginTop:50}}>
    <Card border="light" className="shadow-sm">
 <Card.Body className="p-5">

 <CanvasJSChart options = {{animationEnabled: true,
animationEnabled: true,
exportEnabled: true,
theme: "dark2", // "light1", "dark1", "dark2"
title:{
  text: "Cloud 9 Storage Summary"
},

data: [{

  type: "pie",
				indexLabel: "{label}: {y} ",		
				startAngle: -90,
        dataPoints: [
					{ y: list[0][0].counter, label: "AWS Documents" },
					{ y: list[1][0].counter, label: "Drive Documents" },
					{ y: this.state.azureData, label: "Azure Documents" },
					
				]
}]

 }}
   /* onRef={ref => this.chart = ref} */
 />

</Card.Body>
</Card>




</div> 
    
    :
  
    <p>Done</p>
  
  )
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
