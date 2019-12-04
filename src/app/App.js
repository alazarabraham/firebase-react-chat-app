import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Card, Button, Notification, MenuList, MenuLink, Image ,Menu, MenuLabel} from 'bloomer';
import {BrowserRouter as Router, Route, Link, } from 'react-router-dom';


import ChatForm from '../Form/Form.js';
import firebase from 'firebase';
import firebaseConfig from '../config';
firebase.initializeApp(firebaseConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
  }
  render() {
    return ( 
      <>
    <Router>
      <div className="app">
        <div className="app__header">
          <Link to='/'><Button isColor="dark">
          Home
          </Button></Link>
          { !this.state.user ? (
            <Button isColor="danger"
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </Button>
          ) : (
            <Button isColor="warning"
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </Button>
          )}
        </div>
        
          <Route exact path="/"><MenuList><Link to='/chat'>
          Zoo's Chat Planet
          </Link></MenuList></Route>
          
        <div className="app__list">
         <Route exact path="/chat"><ChatForm user={this.state.user} /></Route>
        </div>
      </div>
      {/* <Menu>
    <MenuLabel>Start Chatting!</MenuLabel>
    <MenuList>
    <Route exact path="/"><MenuList isColor="danger"><MenuLink isActive><Link to='/chat'>
          Zoo's Chat Planet
          </Link></MenuLink></MenuList></Route>
    </MenuList>
</Menu> */}
</Router></>
    );
  }
}
export default App;