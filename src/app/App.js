import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Button, NavbarItem,NavbarDivider,NavbarEnd,Icon,Navbar,Field,Control,NavbarBrand,brand,NavbarBurger,NavbarMenu,NavbarStart,NavbarLink,NavbarDropdown} from 'bloomer';
import {BrowserRouter as Router, Route, Link, } from 'react-router-dom';


import ChatForm from '../Form/Form.js';
import firebase from 'firebase';
import firebaseConfig from '../config'
firebase.initializeApp(firebaseConfig);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  SignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user)
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    
    // firebase.auth().signInWithPopup(provider);
   
  
    
  }
  LogOut() {
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
              onClick={this.SignIn.bind(this)}
            >
              Sign in
            </Button>
          ) : (
            <Button isColor='warning'
              className="app__button"
              onClick={this.LogOut.bind(this)}
            >
              Logout
            </Button>
          )}  
          <Button isColor='info' id="twitter" data-social-network="Twitter" data-social-action="tweet"
                    data-social-target="http://bloomer.js.org" target="_blank" href="https://twitter.com/intent/tweet?text=Zoo's chat, the best chat on the planet 😏">
                        <Icon className="fa fa-twitter" />
                        <span>Tweet</span>
                    </Button>
        </div>
        <div className='menu'>
          {/* <Route exact path="/"><MenuList><Link to='/chat'>
          Zoo's Chat Planet
          </Link></MenuList></Route> */}
        </div>  
        <div className="app__list">
        <img src='https://miro.medium.com/max/1400/1*OBaJPAq9-QUuD1qzFwZveA.png'/>
         <Route exact path="/"><ChatForm user={this.state.user} /></Route>
        
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
