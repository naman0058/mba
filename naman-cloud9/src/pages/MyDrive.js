import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';

import { TransactionsTable } from "../components/Tables";

export default class API extends React.Component {

    state = {
        data1 : [],
        refreshing:false
    }


componentDidMount(){
    fetch('http://172.20.10.3:4000/mydrive', {
        method: 'GET',
        
      })
        .then((res) => console.log('aaa',res))
        .catch((error) => console.error('Error', error))
        .then((result) => {
    //   console.log('result',res)
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




        return (
            <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <Dropdown className="btn-toolbar">
                  <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
                    <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                    <Dropdown.Item className="fw-bold">
                      <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
                    </Dropdown.Item>
                    <Dropdown.Item className="fw-bold">
                      <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
                    </Dropdown.Item>
                    <Dropdown.Item className="fw-bold">
                      <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
                    </Dropdown.Item>
        
                    <Dropdown.Divider />
        
                    <Dropdown.Item className="fw-bold">
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
        
                <ButtonGroup>
                  <Button variant="outline-primary" size="sm">Share</Button>
                  <Button variant="outline-primary" size="sm">Export</Button>
                </ButtonGroup>
              </div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                  <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                    <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                    <Breadcrumb.Item>Cloud9</Breadcrumb.Item>
                    <Breadcrumb.Item active>Upload</Breadcrumb.Item>
                  </Breadcrumb>
                  <h4>Transactions</h4>
                  {/* <p className="mb-0">Your web analytics dashboard template.</p> */}
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <ButtonGroup>
                    <Button variant="outline-primary" size="sm">Share</Button>
                    <Button variant="outline-primary" size="sm">Export</Button>
                  </ButtonGroup>
                </div>
              </div>
        
              <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                  <Col xs={8} md={6} lg={3} xl={4}>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Search" />
                    </InputGroup>
                  </Col>
                  <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                        <span className="icon icon-sm icon-gray">
                          <FontAwesomeIcon icon={faCog} />
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                        <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                        <Dropdown.Item className="d-flex fw-bold">
                          10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                        </Dropdown.Item>
                        <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                        <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </div>
        
              <TransactionsTable />
            </>
          );
    }
 
};
