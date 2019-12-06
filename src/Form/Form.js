import React, { Component } from 'react';
import './Form.css';
import Chat from '../Message/message';
import firebase from 'firebase';
import 'bulma/css/bulma.css';
import { Button , Input} from 'bloomer';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'Alazar',
      message: '',
      list: [],
    };
    this.messageRef = firebase.database().ref().child('messages');
    this.listenMessages();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user) {
      this.setState({'userName': nextProps.user.displayName});
    }
  }
  handleChange(event) {
    this.setState({message: event.target.value});
  }
  sendChat() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }
  keyPress(event) {
    if (event.key !== 'Enter') return;
    this.sendChat();
  }
  listenMessages() {
    this.messageRef
      .limitToLast(10)
      .on('value', message => {
        this.setState({
          list: Object.values(message.val()),
        });
      });
  }
  render() {
    return (
      <div className="form">
        <div className="form__message">
        { this.state.list.map((item, index) =>
            <Chat key={index} message={item} />,
          )}
        </div>
        <div className="form__row">
          <Input 
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.keyPress.bind(this)}
          />
          
          <Button 
            className="form__button"
            onClick={this.sendChat.bind(this)}
          >
            Chat!
          </Button>
        </div>
      </div>
    );
  }
}
export default ChatForm