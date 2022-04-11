import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./App.css";
    
class App extends React.Component {

  constructor(){
    super();
    this.state = 
    {
      loginDTO:{
        username: '',
        password: ''
      },
       customerDTO:{
           email: '',
           lastName:'',
           firstName: ''
       }
    };
  }
   
  handleUpload(e) { 

    axios({
  
      url: 'http://localhost:8080/restaurant/customer/createAccount',
      method: "POST",
      headers: {'Content-type': 'application/json' },
  
      data: this.state,
    })  
      .then((res) => { })
     
      .catch((err) => {
        let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
        alert(message)
       });
  }
    
  render() {
    return (
      <div className="App">
       
        <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName"  onChange={(e) => {  var customerDTO = { ...this.state.customerDTO }  
                                                          customerDTO.firstName = e.target.value;
                                                          this.setState({ customerDTO })
                                                            }}/>
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" onChange={(e) => {  var customerDTO = { ...this.state.customerDTO }  
                                                          customerDTO.lastName = e.target.value;
                                                          this.setState({ customerDTO })
                                                            }}/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email"  onChange={(e) => {  var customerDTO = { ...this.state.customerDTO }  
                                                          customerDTO.email = e.target.value;
                                                          this.setState({ customerDTO })
                                                            }}/>
          </div>
        <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={(e) => {  var loginDTO = { ...this.state.loginDTO }  
                                                          loginDTO.username = e.target.value;
                                                          this.setState({ loginDTO })
                                                            }} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={(e) => {  var loginDTO = { ...this.state.loginDTO }  
                                                          loginDTO.password = e.target.value;
                                                          this.setState({ loginDTO })
                                                            }}/>
          </div>
          <button className="primary" onClick={(e) => this.handleUpload(e)}><Link to="/register">Register</Link></button>
      </div>
    );
  }
}
    
export default App;