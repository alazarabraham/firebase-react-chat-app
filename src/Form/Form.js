import React, {Component} from "react";
import './Form.css';
import Message from '../Message/message.js';
import firebase from 'firebase';

export default class Form extends Component{
    constructor(props){
        super(props);
        this.state={
            userName: 'Alazar',
            message: '',
            list: [],
        };
        this.messageRef = firebase.database().ref().child('messages');
        this.listenMessages();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.user){
            this.setState({'userName': nextProps.user.displayName})
        }
    }
    handleChange(event){
        this.setState({message: event.target.value})
    }
    handleSend(){
        if(this.state.message){
            var newItem = {
                userName: this.state.userName,
                message: this.state.message,
            }
            this.messageRef.push(newItem);
            this.setState({message:''})
        }
    }
    handleKeyPress(event){
        if(event.key !== 'Enter') return;
        this.handleSend();
    }
    listenMessages(){
        this.messageRef
        .limitToLast(10)
        .on('value', message=>{
            this.setState({
                list: Object.values(message.val()),
            })
        })
    }
    render(){
        return(
            <div className="form">
                <div className="form_message">
                    {this.state.list.map((item,index)=>
                    <message key={index} message={item}/>
                    )}
                </div>
                <div className="form_row">
                    <input
                    className="form_input"
                    type="text"
                    placeholder="Type message"
                    value={this.state.message}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyPress.bind(this)}/>
                    <button 
                    className="form_button"
                    onClick={this.handleSend.bind(this)}>Chat!
                    </button>
                </div>
            </div>
        )
    }

}