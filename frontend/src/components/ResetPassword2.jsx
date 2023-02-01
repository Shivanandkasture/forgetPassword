
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import axios from '../axios/axios';
const ForgotPassword = () => {

    const { id, token } = useParams();
console.log(token)
    const history = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const userValid = async () => {
        const res = await axios.get(`/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()

        if (data.status == 201) {
            console.log("user valid")
        } else {
            history("*")
        }
    }


    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();

       try{
            const res = await axios.get(`/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });

           

            if (res.status == 201) {
                setPassword("")
                setMessage(true)
            } 
        }catch(error) {
           alert("! Token Expired generate new LInk")
        }
    }

    useEffect(() => {
        userValid()
        setTimeout(() => {
            setData(true)
        }, 3000)
    }, [])

    return (
      
           
                    <>
                        <section>
                            <div className="form_data">
                                <div className="form_heading">
                                    <h1>Enter Your NEW Password</h1>
                                </div>

                                <form>
                                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}
                                    <div className="form_input">
                                        <label htmlFor="password">New password</label>
                                        <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                                    </div>

                                    <button className='btn' onClick={sendpassword}>Send</button>
                                </form>
                                <p><NavLink to="/">Home</NavLink></p>
                              
                            </div>
                        </section>
                    </>
                
            
        
    )
}

export default ForgotPassword