import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const NavigationBar = props => (
    <>
    <Navbar bg="dark" variant="dark">
        <Form inline>
            <FormControl type="text" placeholder="Enter keyword..." className="search-text-box" />
        </Form>
        <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#world">World</Nav.Link>
        <Nav.Link href="#politics">Politics</Nav.Link>
        <Nav.Link href="#business">Business</Nav.Link>
        <Nav.Link href="#technology">Technology</Nav.Link>
        <Nav.Link href="#sports">Sports</Nav.Link>
        </Nav>
    </Navbar>
    </>
);

const ArticleCard = props => (
    <></>
);

ReactDOM.render(
    <NavigationBar />, document.getElementById('root')
);