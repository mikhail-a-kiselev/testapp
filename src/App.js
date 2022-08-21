import { Navbar, Nav, Container, Badge, Modal, Button, Table, Form, InputGroup, Pagination } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getTable} from './actions';

import {BsBellFill, BsArrowDownShort, BsArrowUpShort} from "react-icons/bs";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const dispatch = useDispatch();
  const table = useSelector((state) => state.table)
  const [messages, setMessages] = useState([
    {title:"First message", text:"Lorem ipsum", id:1},
    {title:"Second message", text:"Dolor sit amet", id:2}
  ]);
  const [tableParams, setTableParams] = useState({
    page:1,
    sort:'fioasc',//fiodesc dobasc dobdesc
    fio:'',
    dobfrom:'',
    dobto:''
  });
  const pagesCount = Math.ceil(table.count/10);
  const [dialogbox, setDialogbox] = useState(false);
  const deleteMessage = (id) => {
    setMessages(messages.filter((item)=>{return item.id!==id}))
  }
  const add8Messages = () => {
    const newMessages = []
    for(let i=3;i<11;i++){
      newMessages.push({title:"message"+i, text:"Dolor sit amet", id:i});
    }
    setMessages([...messages, ...newMessages]);
  }
  const bellClick = () => {
      setDialogbox(!dialogbox);
  }
  const fioClick = () => {
    const params = {...tableParams}
    params.sort = tableParams.sort === 'fioasc' ? 'fiodesc' : 'fioasc';
    setTableParams(params, dispatch(getTable(params)));
  }
  const dobClick = () => {
    const params = {...tableParams}
    params.sort = tableParams.sort === 'dobasc' ? 'dobdesc' : 'dobasc';
    setTableParams(params, dispatch(getTable(params)));
  }
  const fioChange = (e) => {
    const params = {...tableParams}
    params.fio = e.target.value;
    params.page = 1;
    setTableParams(params, dispatch(getTable(params)));
  }
  const dobfromChange = (e) => {
    const params = {...tableParams}
    params.dobfrom = e.target.value;
    params.page = 1;
    setTableParams(params, dispatch(getTable(params)));
  }
  const dobtoChange = (e) => {
    const params = {...tableParams}
    params.dobto = e.target.value;
    setTableParams(params, dispatch(getTable(params)));
  }
  const pageClick = (num) => {
    const params = {...tableParams}
    params.page = num+1;
    setTableParams(params, dispatch(getTable(params)));
  }

  useEffect(() => {
      dispatch(getTable(tableParams));
      setTimeout(add8Messages, 2000);
      // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <Navbar bg="light" expand="md" sticky="top">
        <Container>
          <Navbar.Brand  className="nav-link" href="./">Home</Navbar.Brand>
          <Navbar.Toggle type="button" data-toggle="collapse" data-target="#navbarDefault" aria-controls="navbarDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarDefault">
            <Nav className="navbar-nav mr-auto">
              <span onClick={bellClick} role={messages.length ? "button" : "img"}>
                <BsBellFill />
                {messages.length ? <Badge bg="danger" text="light">
                  {messages.length}
                </Badge> : ""}
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={dialogbox && messages.length} onHide={bellClick}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <tbody>
              {messages.map((msg)=>{
                return <tr key={msg.id}>
                  <td>{msg.title}</td>
                  <td>{msg.text}</td>
                  <td>
                    <Button variant="danger" onClick={()=>{deleteMessage(msg.id)}}>
                      Mark as read
                    </Button>
                  </td>
                </tr>
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th role="button" onClick={fioClick}>
              Name{tableParams.sort === 'fioasc' ? <BsArrowDownShort /> : ''}{tableParams.sort === 'fiodesc' ? <BsArrowUpShort /> : ''}
            </th>
            <th role="button" onClick={dobClick}>DOB{tableParams.sort === 'dobasc' ? <BsArrowDownShort /> : ''}{tableParams.sort === 'dobdesc' ? <BsArrowUpShort /> : ''}</th>
            <th>Photo</th>
          </tr>
          <tr>
            <td>
              <Form.Control
                onChange={fioChange}
                type="text"
              />
            </td>
            <td>
              <InputGroup className="">
                <Form.Control
                  onChange={dobfromChange}
                  type="date"
                />
                <Form.Control
                  onChange={dobtoChange}
                  type="date"
                />
              </InputGroup>
            </td>
            <td>
            </td>
          </tr>
        </thead>
        <tbody>
          { table.results.map((item) => {return <tr key={item.id}>
            <td>{item.fio}</td>
            <td>{item.dob}</td>
            <td><img alt={item.fio} src={"https://kiselev.su/test/dme/"+item.photo} width="64" height="48"></img></td>
          </tr>}) }
        </tbody>
      </Table>
        <Container>
          <Pagination>
            { [...Array(pagesCount)].map((item, i) => {
              const show = pagesCount<11 || i<3 || i>pagesCount - 4 || (tableParams.page-i<4 && tableParams.page-i>0) || (i-tableParams.page<3 && i-tableParams.page>0);
              if(!show){
                return (i===tableParams.page-4 && i>3) || (i===tableParams.page+3 && i<pagesCount-4) ? <Pagination.Ellipsis  key={i} onClick={()=>{pageClick(i);}} /> : '';
              }
              return i===tableParams.page-1 ? <Pagination.Item key={i} active>{i+1}</Pagination.Item> : <Pagination.Item key={i} onClick={()=>{pageClick(i);}}>{i+1}</Pagination.Item>
            }) }
        
        </Pagination>
      </Container>
    </div>
  );
}

export default App;
