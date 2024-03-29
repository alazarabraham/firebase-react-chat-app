import React, {Component} from "react";
import './message.css';
import { directive } from "@babel/types";

export default class Message extends Component{
    render(){
        return(
            <div className="message">
                <span className="message_author">{this.props.message.userName}</span>
                {this.props.message.message}
            </div>
        )
    }
}