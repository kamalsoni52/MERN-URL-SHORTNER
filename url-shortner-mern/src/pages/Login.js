import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/authApiSlice"
import { setCredential } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
const emailRegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const emailRef = useRef();


  useEffect(() => {
    emailRef.current.focus();
  }, [])
  useEffect(() => {
    setErrorMsg("");
  }, [email, password])

  useEffect(() => {
    setValidEmail(emailRegExp.test(email));
  }, [email])

  async function loginBtn() {
    const v1 = emailRegExp.test(email)
    if (!v1) {
      setErrorMsg("Please type Valid Email Id");
      return;
    }
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredential({ ...userData }))
      navigate("/")
    }
    catch (error) {
      if (!error?.data) {
        console.log(error)
        setErrorMsg("No Server Response")
      } else if (error?.status === 409) {
        setErrorMsg(error.data.error)
      }
      else {
        setErrorMsg("Something is Wrong")
      }
    }

  }

  return (
    <div className='pad Container'>
      <div className='formContainer'>
        <p className={errorMsg ? "error" : "hide"}>
          {errorMsg}
        </p>
        <h2>LOGIN FORM</h2>
        <form action="" >
          <div className='flex'>
            <label htmlFor="email">
              Email Id
              <span className={validEmail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              ref={emailRef}
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            />
            <p id="emailNote" className={emailFocus && !validEmail ? "instructions" : "hide"}>
              "Please type valid email"
            </p>
          </div>

          <div className='flex'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

        </form>

        <button
          className='btn login-btn'
          onClick={loginBtn}
          disabled={email && password ? false : true}
        >Login</button>

      </div>
    </div>
  )
}

export default Login