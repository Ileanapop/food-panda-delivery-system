import React from "react";
import {Link} from "react-router-dom";
import "./FirstPage.css";

    
class FirstPage extends React.Component {

  render() {
    
    return (
      
      <div className="FirstPage" >
          <button className="primary"><Link to="/administrator/login">Administrator</Link></button>
          <br></br>
          <div className="*" >      
          <br></br>
          <button className="primary"><Link to="/customer/login">Customer</Link></button>
      </div>

      </div>
    );
  }
}
    
export default FirstPage;