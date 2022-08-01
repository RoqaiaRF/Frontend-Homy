
import React from "react"
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'
import './index.css';

 const SignIn = () => {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3 sec-password">
            <Form.Group className="" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Save Password" />
            </Form.Group>
            <p className="forgot-password text-right mt-2">
              <a href="/">Forgot password?</a>
            </p>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#0F6AD0'}}>
              Sign In
            </button>
          </div>
          <div className="d-grid gap-2 mt-3">
            <hr />
            <p className=""> New Customer?</p>
            <Link to="/signUp" className="new-customer-a">
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#fff', color: '#0F6AD0', width: '100%'}}>
                Create An Account
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
export default SignIn;