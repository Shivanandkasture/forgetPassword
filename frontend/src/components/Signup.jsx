import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "../axios/axios"
import "../style/style.css"

const Singup = () => {

     const navigate = useNavigate()
    const [singup, setSingup] = useState({
        email: "", password: ""
    })

    const { email, password } = singup

    const inputEvent = (e) => {

        console.log(e.target.value)
        console.log(e.target.name)

        setSingup({ ...singup, [e.target.name]: e.target.value })
    }

    const onSingup = async (e) => {
        e.preventDefault()

        const userRegister = { email, password }

        const config = { headers: { "Content-Type": "application/json" } }

        try {
            const body = JSON.stringify(userRegister);

            let res = await axios.post("/register", body, config)

            // console.log(res)
        
            alert("you are successfully register")
           // setSingup('')
            navigate('/')

        } catch (error) {
            alert(error.message)

            console.log(error.response.data);
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Register</h1>
                    </div>
                    <form>
                        <div className="form_input">
                            <label>Email</label>
                            <input type='email' name='email' placeholder="Enter Your Email Address"
                                value={email} onChange={inputEvent} required></input>
                        </div>
                        <div className="form_input">
                            <label>Password</label>
                            <input type='password' name='password' placeholder="Enter Your Password"
                                value={password} onChange={inputEvent} required></input>
                        </div>

                        <button className="btn" onClick={onSingup}>Sing up</button>
                        <p>You have already login<NavLink to="/">&nbsp;Login</NavLink></p>
                    </form>
                </div>
            </section>
        </>
    )

}

export default Singup