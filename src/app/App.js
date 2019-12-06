import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Button,Icon, Title} from 'bloomer';
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
    // firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   var token = result.credential.accessToken;
    //   // The signed-in user info.
    //   var user = result.user;
    //   console.log(user)
    //   // ...
    // }).catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // The email of the user's account used.
    //   var email = error.email;
    //   // The firebase.auth.AuthCredential type that was used.
    //   var credential = error.credential;
    //   // ...
    // });
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      const user = result.user;
      
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    }
    );
        
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
            <Button isColor="danger" isHovered='true' isOutlined='true'
              className="app__button"
              onClick={this.SignIn.bind(this)}
            >
              Sign in
            </Button>
          ) : (
            <Button isColor='warning' isHovered='true'
              className="app__button"
              onClick={this.LogOut.bind(this)}
            >
              Logout
            </Button>
          )}  
          <Button className='app_button' isHovered='true' isColor='info' id="twitter" data-social-network="Twitter" data-social-action="tweet"
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
        <img src='https://www.thespruceeats.com/thmb/f8iuHil9qeQ_VvrpsklcERyGFFU=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/cappuccino-with-cocoa-powder-in-a-coffee-shop-696828002-5a8cdd4030371300379a59fd.jpg'/>
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
