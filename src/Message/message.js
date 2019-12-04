import React, {Component} from "react";
import './message.css';
import { directive } from "@babel/types";
import 'bulma/css/bulma.css';
import { Card, Button , Message} from 'bloomer';

export default class Chats extends Component{
    render(){
        return(
            <div className="message">
                <span className="message_author">{this.props.message.userName + ": "}</span>
                {this.props.message.message}
            </div>
        )
    }
}