import React, { Component } from 'react'
// import './register.css'
export default class Register extends Component {
    render() {
        return (
            <div className="container">
            <form className="form-register" id="form-register">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">ConfirmPassword</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="ConfirmPassword" />
              </div>
              <div className="btn-register"><button type="button" className="btn btn-primary" id="btn-register"> Register</button></div>
            </form>
          </div>
          
        )
    }
}
