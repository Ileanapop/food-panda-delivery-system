import React from "react";
import axios from "axios";
import "./AdministratorLogin.css";
import { Navigate } from "react-router-dom";
    
class AdministratorLogin extends React.Component {

  constructor(){
    super();
    this.state = 
    {
      username:'',
       password:'',
       loggedIn:0
    };
  }
   
  handleLogin(e) { 
    
     axios.get("http://localhost:8080/restaurant/api/administrator/login", {
           params: {
               username: this.state.username,
               password: this.state.password
           }
       })
       .then((response) =>{
        localStorage.setItem('username', JSON.stringify(response.data.username));
        localStorage.setItem('password', JSON.stringify(response.data.password));
        this.setState({loggedIn:1})       
       })
       .catch((error) => alert("Invalid login credentials"));
  }
    
  render() {

    if(this.state.loggedIn){
      return (<Navigate to={"/administrator/homepage"}/>)
    }

    return (
      <div className="AdministratorLogin">
       
        <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username"  onChange={(e) => { this.setState({username: e.target.value})}}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password"  onChange={(e) => { this.setState({password: e.target.value})}}/>
          </div>
          <button className="primary" onClick={(e) => this.handleLogin(e)}>Login</button>
      </div>
    );
  }
}
    
export default AdministratorLogin;