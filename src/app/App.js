import React,{Component} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Message from "../Message/message.js";
import Form from "../Form/Form.js";
import Firebase from 'firebase';
import firebaseConfig from '../config';
import { tsConstructorType } from '@babel/types';
Firebase.initializeApp(firebaseConfig);



class App extends Component {
  constructor(props){
  super(props)
  this.state={
    user: null,
  }
}
componentDidMount(){
  Firebase.auth().onAuthStateChanged(user=>{
    this.setState({user});
  })
}
handleSignIn(){
  const provider= new Firebase.auth.GoogleAuthProvider();
  Firebase.auth().signInWithPopup(provider);
}
handleLogout(){
  Firebase.auth().signOut();
}
render(){
  return(
    <div className="app">
      <div className="app_header">
      {this.state.user ?(
        <button
        className="app_button"
        onClick={this.handleSignIn.bind(this)}>
          Sign In
        </button>
      ) :(
        <button
        className="app_button"
        onClick={this.handleLogout.bind(this)}>
          Logout
        </button>
      )}
      </div>
      <div>
        <div className="app_list">
          <Form user={this.state.user}/>
        </div>
      </div>
    </div>
  )
}
}

export default App;
