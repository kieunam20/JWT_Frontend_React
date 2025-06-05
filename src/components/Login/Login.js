import './Login.scss'

const Login = (props) =>{
        return (
           <div className="login-contanier mt-3">
           <div className="container"> 
                 <div className="row"> 
                        <div className="content-left col-7"> 
                          <div className='brand'>
                                 Kieu Nam
                            </div>
                            <div className='detail'>
                                 Hello 123! akdsfkhsdkjfhajksdhfjkads
                            </div>
                        </div>
                        <div className="content-right col-5 d-flex flex-column gap-3 py-3">
                         <input type='text' class='form-control' placeholder='Email or Phone number' />
                          <input type='password' class='form-control' placeholder='Password'/>
                          <button className='btn btn-primary'> Login </button>
                          
                          <span className='text-center'> Forgot your password ? </span>
                          <hr />
                          <div className='text-center'> 
                           <button className='btn btn-success'> Create new account </button>
                          </div>
                          
                        </div>
                    </div>
             </div>
           </div>
        )
}

export default Login;