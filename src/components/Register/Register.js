import './Register.scss'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Register = (props) =>{
    const [email, setEmail] = useState("");
     const [phone, setPhone] = useState("");
      const [username, setUsername] = useState("");
       const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");


   let history = useHistory();
        const handleLogin = ()  =>{
          history.push("/login")
          }

          useEffect(() =>{
            // axios.get("http://localhost:8080/api/test-api").then(data =>{
            //   console.log(">>Check data axios", data)
            // })
          }, []);


   const isValidInputs = () => {
    if(!email ) {
      toast.error(" Email is required");
      return false;
    }
    if(!phone ) {
      toast.error(" phone is required");
      return false;
    }
    if(!password ) {
      toast.error(" Password is required");
      return false;
    }
     if(password  != confirmPassword) {
      toast.error("Re-enter Password is not correct");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
     if(!regx.test(email)) {
      toast.error("Please  enter  a  valid  email   ");
      return false;
    }
    return true;
   }       



 const handleRegister = () =>{
   let check = isValidInputs();
     let userData = {email,phone,username,password};
     console.log(">>>check data", userData);
 }         

        return (
           <div className="register-contanier mt-3">
           <div className="container"> 
                 <div className="row px-3 px-sm-0"> 
                        <div className="content-left col-12 d-none col-sm-7 d-sm-block"> 
                          <div className='brand'>
                                 Kieu Nam IT
                            </div>
                            <div className='detail'>
                                Kieu Nam  helps you connect and share with the people in your life.
                            </div>
                        </div>

                        
                        <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 ">
                          <div className='brand d-sm-none'>
                                 Kieu Nam IT
                            </div>
                            <div className='form-group'>
                                <label> Email : </label>
                            <input type='text' class='form-control' placeholder='Email address' 
                            value={email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                             <div className='form-group'>
                                <label> Phone : </label>
                            <input type='text' class='form-control' placeholder='Phone number' 
                              value={phone} onChange={(event) => setPhone(event.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label>Username : </label>
                            <input type='text' class='form-control' placeholder='Username'
                            value={username} onChange={(event) => setUsername(event.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label> Password : </label>
                          <input type='password' class='form-control' placeholder='Password'
                          value={password} onChange={(event) => setPassword(event.target.value)}/>
                            </div>
                             <div className='form-group'>
                                <label> Re-enter Password : </label>
                          <input type='password' class='form-control' placeholder='Re-enter Password'
                          value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}/>
                            </div>
                        
                          
                          <button className='btn btn-primary' onClick={() => handleRegister()}> 
                            Register 
                            </button>
                          
                         
                          <hr />
                          <div className='text-center'> 
                           <button className='btn btn-success' onClick={() => handleLogin()}> 
                            Already've an account. Login 
                            </button>
                          </div>
                         
                        </div>
                    </div>
             </div>
           </div>
        )
}

export default Register;