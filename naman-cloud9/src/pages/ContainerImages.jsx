
import React from 'react';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';

import { BlobServiceClient } from "@azure/storage-blob";

const containerName = `uploaded`;
const sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
const storageAccountName = process.env.REACT_APP_AZURE_STORAGE_RESOURCE_NAME;


const deleteBlob=()=>{
  alert('hi')
}


const DisplayImagesFromContainer = ({blobList}) => (

  
 

  // delete(txt){
  //   fetch(`http://localhost:4000/myaws/delete?id=${txt}`, {
  //     method: 'GET',
  //     // mode: 'no-cors',
  // headers: {
  // 'Access-Control-Allow-Origin':'*'
  // }
  //   })
  //   .then((response) => response.json())
  //     .catch((error) => console.error('Error', error))
  //     .then((result) => {
  //   console.log('result',result)
  //       if (result.msg == 'success') {
  //    this.componentDidMount()
  //       }
  //       else{
  //     alert('An error occured..Plese try again later')
  //       }
  //     })
        
  // }

    <div>
      <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
      <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
            <th style={{ width: '5%' }}>Documents</th>
             
              <th  style={{ width: '5%' }}>Action</th>
              <th  style={{ width: '5%' }}>Delete</th>

             
            </tr>
          </thead>
          <tbody>
        {blobList.map((item) => {
          return (

            <tr>
              <th>{item.name}</th>
              <th><a href={item.url} download>Download</a></th>
              <th><button className='btn btn-light' onClick={deleteBlob(item.url)}>Delete</button></th>


         
          </tr>
          
          );
        })}
         </tbody>
        </Table>
      </Card.Body>
    </Card>
    </div>
  );

  export default DisplayImagesFromContainer;