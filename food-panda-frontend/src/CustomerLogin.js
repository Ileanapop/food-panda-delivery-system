import React from "react";
import axios from "axios";
import "./App.css";
import { Navigate } from "react-router-dom";
import {Link} from "react-router-dom";

class CustomerLogin extends React.Component {

  constructor(){
    super();
    this.state = 
    {
      username:'',
       password:'',
       loggedIn:0
    };
  }
   
  handleLoginCustomer(e) { 
    
     axios.get("http://localhost:8080/restaurant/customer/login", {
           params: {
               username: this.state.username,
               password: this.state.password
           }
       })
       .then((response) =>{
        localStorage.setItem('customerEmail', JSON.stringify(response.data.email));
        //localStorage.setItem('customerPassword', JSON.stringify(response.data.password));
        this.setState({loggedIn:1})       
       })
       .catch((error) => alert("Invalid login credentials"));
  }
    
  render() {

    if(this.state.loggedIn){
      return (<Navigate to={"/customer/homepage"}/>)
    }

    return (
      <div className="*">
       
        <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username"  onChange={(e) => { this.setState({username: e.target.value})}}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password"  onChange={(e) => { this.setState({password: e.target.value})}}/>
          </div>
          <div>
          <button className="primary" onClick={(e) => this.handleLoginCustomer(e)}>Login</button>
            </div>
            <div>
          <button className="primary"><Link to="/register">Register</Link></button>
          </div>
      </div>
    );
  }
}
    
export default CustomerLogin;