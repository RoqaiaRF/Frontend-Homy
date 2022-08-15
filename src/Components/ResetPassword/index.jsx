import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../SignIn/index.css';
const  ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [ error, setError] = useState('');
    const [ success, setSuccess] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();
    const Update = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reset-password/${token}`
          , { newPassword });
          navigate("/signIn");
        } catch ({ response: { data: { message: msg } } }) {
          setError(msg);
        }
      };
  return (

    <div className="Auth-form-container">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Reset Password</h3>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input type="email" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}  className="form-control mt-1" />
        </div>
        {error && <div>{error}</div>}
        <div className="d-grid gap-2 mt-3 sec-password">
          <p className="forgot-password text-right mt-2">
            <Link to="/">Back to Sign In</Link> OR <Link to="/forgetPassword">Forget Password</Link>
          </p>
        </div>
        {success && <div className="alert alert-success">{success}</div>}
        <div className="d-grid gap-2 mt-3">
          <button onClick={(e) => Update(e) }  className="btn btn-primary">Update Password</button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default ResetPassword;
