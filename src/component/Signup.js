import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name : "", email : "", password : "", cpassword: ""})
    let navigate = useNavigate();
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
            localStorage.setItem("token", json.authtoken);
            navigate("/login")
            props.showAlert("Account Created Successfully", "success")
          }
          else{
            props.showAlert("Invalid Details", "danger")
          }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

  return (
    
    <div className='mt-3'>
        <h3 className='my-4'>Create an account to use iNotebook</h3>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange}  required minLength={5}/>
  </div>
  <div className="form-group">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form> 
    </div>
  )
}

export default Signup
