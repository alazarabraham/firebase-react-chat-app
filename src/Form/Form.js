import React, { Component } from 'react';
import './Form.css';
import Chat from '../Message/message';
import firebase from 'firebase';
import 'bulma/css/bulma.css';
import { Card, Button, Notification , Input} from 'bloomer';
export default class ChatForm extends Component {
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
  handleSend() {
    if (this.state.message) {
      var newItem = {
        userName: this.state.userName,
        message: this.state.message,
      }
      this.messageRef.push(newItem);
      this.setState({ message: '' });
    }
  }
  handleKeyPress(event) {
    if (event.key !== 'Enter') return;
    this.handleSend();
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
            <Chat key={index} message={item} />
          )}
        </div>
        <div className="form__row">
          <Input 
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <Button 
            className="form__button"
            onClick={this.handleSend.bind(this)}
          >
            Chat!
          </Button>
        </div>
      </div>
    );
  }
}