import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Card, Button, Notification } from 'bloomer';


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
      <div className="app">
        <div className="app__header">
          <Notification isColor="dark">
          Zoo's Chat Planet
          </Notification>
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
        <div className="app__list">
          <ChatForm user={this.state.user} />
        </div>
      </div>
    );
  }
}
export default App;