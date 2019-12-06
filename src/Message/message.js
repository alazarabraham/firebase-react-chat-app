import React, {Component} from "react";
import './message.css';
import 'bulma/css/bulma.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

class Chats extends Component{
    render(){
        return(
    
            <div className="message">
                <span className="message_author">{this.props.message.userName + ": " }</span>
                {this.props.message.message}
                
            </div>
        )
    }
}
export default Chats