import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
    const navigate =useNavigate()
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let isValid = true;
        let errorMessages = { username: '', password: '' };

        if (!formData.username) {
            errorMessages.username = 'Username is required';
            isValid = false;
        }

        if (!formData.password) {
            errorMessages.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 3) {
            errorMessages.password = 'Password must be at least 3 characters long';
            isValid = false;
        }

        setErrors(errorMessages);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            axios.post('http://localhost:5000/api/register/checklogin', formData).then((response) => {
                console.log(response);
                localStorage.setItem('role', response.data.data.role)
                localStorage.setItem('username', response.data.data.username)
                localStorage.setItem('login_id', response.data.data._id)

                navigate("/")
            }).catch((error) =>{
                console.log(error);
                
                toast.error(error.response.data.message);
            })
        } else {
            console.log('Form is invalid');
        }
    };

    return (
        <>
        <Toaster />
            {/* Contact Section */}
            <section className="contact_section layout_padding" style={{ height: '100vh' }}>
                <div className="container">
                    <div style={{ width: '44%', textAlign: 'center' }}>
                        <h2 style={{ color: 'black' }}>Login</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-flex">
                                    <button type="submit">LOGIN</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="img-box">
                                <img src="images/contact-img.png" alt="Contact" />
                                <div className="img_overlay">
                                    <h2>
                                        Connect <br />
                                        Edit <br />
                                        Create
                                    </h2>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Contact Section */}
        </>
    );
}
