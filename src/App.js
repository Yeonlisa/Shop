/*eslint-disable*/
import React, { useState, useContext, lazy, Suspense } from 'react';
import { Navbar, Container, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
// import Detail from './Detail.js';
let Detail = lazy(() => { return import('./Detail.js') });

import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import Cart from './Cart.js';

export const 재고context = React.createContext();



function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Jumbotron className='background'>
            <h1>20% Season Off!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">

            <재고context.Provider value={재고}>            
              <div className="row">
                {
                  shoes.map((a,i) => {
                    return <Card shoes={shoes[i]} i={i} key={i} />
                  })
                }
              </div>
            </재고context.Provider>

            <button className='btn btn-primary' onClick={() => {

              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                console.log(result.data);
                shoes변경([...shoes, ...result.data]);
              })
              .catch(() => {
                console.log('실패')
              })
            
            }}>더보기</button>
          </div>
        </Route>


        <Route path="/detail/:id">
          <재고context.Provider value={재고}> 
            <Suspense fallback={<div>로딩중이에요</div>}>
              <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
            </Suspense>
          </재고context.Provider>
        </Route>

        <Route path="/cart">
            <Cart></Cart>
        </Route>



      </Switch>

      {/* <Route path="/어쩌구" component={Modal}></Route> */}


    </div>
  );
}


function Card(props) {

  let 재고 = useContext(재고context);
  let history = useHistory();

  return (
      <div className="col-md-4" onClick={() => { history.push('/detail/' + props.shoes.id) }}>

        <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
        <h4>{ props.shoes.title }</h4>
        <p>{ props.shoes.content } & { props.shoes.price }</p>
        <Test />
      </div>
  )
}

function Test() {
  let 재고 = useContext(재고context);
  return <p>{재고[0]}</p>
}

export default App;
