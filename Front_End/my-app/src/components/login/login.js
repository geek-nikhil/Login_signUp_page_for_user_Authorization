import React from 'react';
import '../SignUP/SignUp.css';

function Login() {
  return (
    <div>
      <div className="container1">
        <p className="wel">Welcome to</p>
        <img src="" alt="Breath ESG Logo" />
        <p className="bre">Breath ESG</p>
        <p className="intro">
          We Help You to track your organization's metrics as per the ESG Guidelines
        </p>
        <p className="extra">
          Sounds interesting? <a href="#">Get in touch</a>
        </p>
      </div>
      <div className="container">
        <h2>Login</h2>
        <form method="post" action="http://localhost:4000/login">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="text"
            id="email"
            placeholder="Your Email ID"
            name="email"
            required
          />
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            required
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
