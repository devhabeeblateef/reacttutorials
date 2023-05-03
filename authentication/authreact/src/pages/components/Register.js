import React, {useRef, useState, useEffect} from 'react'
import axios from '@/api/axios';
function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = userRegex.test(user);
        console.log(result)
        console.log(user);
        setValidName(result);
    })

    useEffect(() => {
        const result = passwordRegex.test(pwd);
        console.log(result)
        console.log(pwd);
        setValidPwd(result)
        const match = pwd == matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd] );

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = userRegex.test(user);
        const v2 = passwordRegex.test(user);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
    }
        try{
            const response = await axios.post('registerUrl',
            JSON.stringify({ user, pwd}),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            } );

            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setUser("")
            setPwd("")

        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    const userRegex = /^[a-zA-Z][a-zA-Z\d-_]{3,23}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const registerUrl = '/register'
    return (
    <>
    <div>
        <form>
          <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}
             aria-live="assertive">{errMsg}</p>
             <h1>Register</h1>

             <form onSubmit={handleSubmit}>
                <label htmlFor='username'> Username: </label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby='uidnote'
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id='uidnote' className={userFocus && user && !validName
                ? "instruction" : "offscreen"}>
                4 - 24 Characters. <br/>
                Must begin with a letter. <br/>
                Letters, numbers, underscore, hyphens allowed.
                </p>

                <label htmlFor='password'>Password: </label>

                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />     
                <p id='uidnote' className={pwdFocus && !validPwd ? "instruction"
                : "offscreen"}>
                    8 - 24 Characters. <br/>
                    Must include uppercase and lowercase letters, a number and a special character.<br/>
                    Must only have the folowing special characters - ! #$%
                    </p>
                
                <label htmlFor='confirmPwd'>Confirm Password: </label>
                 
                <input 
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-aria-describedby='confirmnote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />

                <p id="confirmnote" className={matchFocus && !validMatch ?
                "instructions" : "offscreen" }>
                Must Match Exactly with Password</p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                Register 
                </button>
             </form>
          </section>
        </form>
    </div>
    </>
  )
}

export default Register 