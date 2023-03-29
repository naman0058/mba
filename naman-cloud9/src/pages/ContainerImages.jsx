
import React from 'react';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';


const DisplayImagesFromContainer = ({blobList}) => (
    <div>
      <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
      <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
            <th style={{ width: '5%' }}>Documents</th>
             
              <th  style={{ width: '5%' }}>Action</th>
             
            </tr>
          </thead>
          <tbody>
        {blobList.map((item) => {
          return (

            <tr>
              <th>{item.name}</th>
              <th><a href={item.url} download>Download</a></th>

         
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