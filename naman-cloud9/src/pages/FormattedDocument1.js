import React from 'react';
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Container, InputGroup } from '@themesberg/react-bootstrap';

import Documentation from "../components/Documentation";

export default () => {
  return (
    <article>


<p>Uploaded Successfull...</p>

<p>Upload Formatted Documents</p>

      
      <form action='http://localhost:4000/insert/image' method='post' encType='multipart/form-data'>
<input type='file' name='image' className='form-control'></input>
   

<button type='submit' className='btn btn-primary' style={{marginTop:40}}>Submit</button>
</form>
        

    </article>
  );
};
