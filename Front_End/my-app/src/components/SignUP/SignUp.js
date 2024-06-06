import React from 'react'
import './SignUp.css'    

function SignUp() {
  return (
    <div>
        <div className="container1">
            <p className="wel">Welcome to</p>
            <img src=""/>
            <p className="bre">Breath ESG</p>
            <p className="intro">We Help You to tracj your organisations metrics as the ESG Guidlines</p>
            <p className="extra">Sounds intersting? <a>Get in touch</a></p>
        </div>
     <div className="container">
    <h2>Sign Up</h2>
    <form method="post" action="http://localhost:4000/signup">
        <label for="email">Email <span class="required">*</span></label>
        <input type="text" id="email" placeholder="Your Email ID" name="email" required/>
        
        <label for="password">Password <span class="required">*</span></label>
        <input type="password" id="password" placeholder="Password" name="password" required/>
        
        <label for="confirmpassword">Confirm Password <span class="required">*</span></label>
        <input type="password" id="confirm-password" placeholder="Password" name="confirmpassword" required/>
        
        <button type="submit">Continue</button>
    </form>
  </div>
    </div>
  )
}

export default SignUp
