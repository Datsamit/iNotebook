import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'



const Login = (props) => {

    const [credentials, setCredentials] = useState({email : "", password : ""})
    let navigate = useNavigate();
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email : credentials.email, password: credentials.password})
          });
          const json = await response.json()
          console.log(json);
          if(json.success){
            localStorage.setItem("token", json.authtoken);
            navigate("/");
            props.showAlert("Logged in Successfully", "success")
          }
          else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
      
    return (
        <div className='container mt-3'>
          <h3 className='my-4'>Login to continue to iNotebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name="email" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
