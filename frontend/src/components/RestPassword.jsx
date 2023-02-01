import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "../axios/axios"
import "../style/style.css"

const Resetpassword = () => {

    const navigate = useNavigate()
    const [reset, setReset] = useState({  email: "" })

    const { email } = reset

    const inputEvent = (e) => {

        console.log(e.target.value)
        console.log(e.target.name)

        setReset({ ...reset, [e.target.name]: e.target.value })
    }

    const onResetPassword = async (e) => {
        e.preventDefault()

        const userEmail = { email }

        const config = { headers: { "Content-Type": "application/json" } }

        try {
            const body = JSON.stringify(userEmail);

            let res = await axios.post("/sendpasswordlink", body, config)

            console.log(res)
            alert("you are reset password")
            navigate('/login')

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
                        <h1>Reset Password</h1>
                    </div>
                    <form>
                        <div className="form_input">
                            <label>Email</label>
                            <input type='email' name='email' placeholder="Enter Your Email Address"
                                value={email} onChange={inputEvent}></input>
                        </div>

                        <button className="btn" onClick={onResetPassword}>send</button>
                   </form>
                </div>
            </section>
        </>
    )

}

export default Resetpassword