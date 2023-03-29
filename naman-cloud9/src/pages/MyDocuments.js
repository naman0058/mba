import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import commands from "../data/commands";

import { TransactionsTable } from "../components/Tables";

export default class API extends React.Component {

    state = {
        data1 : [],
        refreshing:false
    }


componentDidMount(){
    fetch('http://localhost:4000/mydrive', {
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

    render(){


      let list = this.state.data1

      if (list[0] == undefined) {

        return(
          <>
          <p>Loading...</p>
          </>
        )

      } else if (list[0].id == undefined) {
        
        
        return(
          <>
          <p>No Data Found</p>
          </>
        )

      } else {


        return (
            <>
       
       <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Image</th>
             
            </tr>
          </thead>
          <tbody>

{
  list.map(item=>(
    <tr>
    <th className="border-0" style={{ width: '5%' }}><Image src={"http://localhost:4000/images/" + item.image } style={{width:100}}/></th>
 
  </tr>
  ))
}

         
          </tbody>
        </Table>
      </Card.Body>
    </Card>
        
          
            </>
          );
    }
  }
};
