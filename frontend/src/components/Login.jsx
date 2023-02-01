import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "../axios/axios"
import "../style/style.css"

const Login = () => {

    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "", password: ""
    })

    const { email, password } = login

    const inputEvent = (e) => {

        console.log(e.target.value)
        console.log(e.target.name)

        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const onLogin = async (e) => {
        e.preventDefault()

        const userRegister = { email, password }

        const config = { headers: { "Content-Type": "application/json" } }

        try {
            const body = JSON.stringify(userRegister);

            let res = await axios.post("/login", body, config)
            console.log(res.data.data.token)
            if (res.status === 200) {
                localStorage.setItem("usersdatatoken", res.data.data.token);
                navigate('/home')
                setLogin({ ...login, email: "", password: "" });
            } else {
                alert("Invalid Credentials");
            }


            alert("you are successfully register")


        } catch (error) {
            alert(error.message)

        }


    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Login</h1>
                    </div>
                    <form>
                        <div className="form_input">
                            <label>Email</label>
                            <input type='email' name='email' placeholder="Enter Your Email Address"
                                value={email} onChange={inputEvent}></input>
                        </div>
                        <div className="form_input">
                            <label>Password</label>
                            <input type='password' name='password' placeholder="Enter Your Password"
                                value={password} onChange={inputEvent} required="mobile number"></input>
                        </div>
                        <p><NavLink to='/sendpasswordlink'>forget password</NavLink></p>
                        <button className="btn" onClick={onLogin}>Login</button>
                        <p>You have don't account<NavLink to="/register">&nbsp; register</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )

}

export default Login