import { useState, useRef, useEffect }  from 'react'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/api';

const emailRegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/


const Signup = () => {
  const userRef = useRef();
  
  const [username ,setUserName] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  
  const [email ,setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password ,setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errorMsg, setErrorMsg] =useState("");
  const [successMsg, setSuccessMsg] =useState("");



  async function signup(){
    const v1 = emailRegExp.test(email);
    const v2 = passwordRegExp.test(password);
    if(!v1 || !v2){
      setErrorMsg("Invalid Entry")
      return; 
    }
     try{
      const body = {
        username: username,
        email: email,
        password: password,
      }
      const res = await axios.post("/user/signup/",JSON.stringify(body) ,{
        headers: {
          "Content-type": "application/json"
        }
      });

      
      setEmail("");
      setPassword("");
      setUserName("");
      setSuccessMsg(res.data.msg)
      console.log(res.data.msg)
      console.log(res)

    }
    catch(error){
      
      if(!error?.response){
        setErrorMsg("No server Response");

        setSuccessMsg("");
        
      }
      else if(error.response?.status === 409){
        setErrorMsg("email id already exist")
        setSuccessMsg("");
      }
      else {
        setErrorMsg("Registration failed")
        setSuccessMsg("");
      }

    }

    
  }


  useEffect(()=>{
    userRef.current.focus();
  },[])

  useEffect(()=>{
    setValidEmail(emailRegExp.test(email));
  },[ email ])

  useEffect(()=>{
    setValidPassword(passwordRegExp.test(password));
  },[password])

  useEffect(()=>{
    setErrorMsg("");
    
    
  },[email,password,username])




  return (
    <div className='Container flex-row'>      
      <div className='formContainer registerForm'>
      <p  className={errorMsg ? "error" : "hide"}>
        {errorMsg}
      </p>
      <p  className={successMsg ? "success" : "hide"}>
        {successMsg}
      </p>
        <h2>REGISTRATION FORM</h2>
        <form action="">

          <div className='flex'>
          <label htmlFor="username">username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e)=>setUserName(e.target.value)}
            ref={userRef}  
            onFocus={()=>setUserFocus(true)}
            onBlur={()=>setUserFocus(false)}
            autoComplete="off" 
            required
            />            
          </div>

          <div className='flex'>
          <label htmlFor="email">
            Email Id
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon = {faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon = {faTimes} />
            </span>
          </label>
          <input 
            type="text" 
            id="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            onFocus={()=>setEmailFocus(true)}
            onBlur={()=>setEmailFocus(false)}
            autoComplete='off'
            required  
            />
            <p id="emailNote" className={emailFocus && !validEmail ? "instructions": "hide"}>
              "Please type valid email"
            </p>            
          </div>

          <div className='flex'>
          <label htmlFor="pasword">
            Password
            <span className={validPassword ? "valid" : "hide"}>
              <FontAwesomeIcon icon = {faCheck} />
            </span>
            <span className={validPassword || !password ? "hide" : "invalid"}>
              <FontAwesomeIcon icon = {faTimes} />
            </span>
          </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            value={password} 
            onFocus = {()=>setPasswordFocus(true)}     
            onBlur={()=>setPasswordFocus(false)} 
            onChange={(e)=>setPassword(e.target.value)}
            required
            />      
          </div>
          <p id="emailNote" className={ passwordFocus && !validPassword  ? "instructions": "hide"}>
              1. Passowrd should be more than 8 words<br/>
              2. Must contain atleast one Uppercase one Lowercase and one Number
          </p> 
        </form>     
        <button 
          className='btn register-btn' 
          onClick={signup}
          disabled= {!validEmail ||!validPassword || !username ? true : false}
          >Register</button>
      </div>
    </div>
  )
}

export default Signup