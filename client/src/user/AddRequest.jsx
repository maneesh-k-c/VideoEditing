import React, { useState } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'

export default function AddRequest() {
    const [formData, setFormData] = useState({ content_type: '', content_url: '', message: '' });
    const [errors, setErrors] = useState({ content_type: '', content_url: '', message: '' });
    console.log(formData.content_url.type);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0] || '', 
        });
    };

    // Validate the form
    const validate = () => {
        let isValid = true;
        let errorMessages = { content_url: '', message: '' };

        // Validate file input
        if (!formData.content_type) {
            errorMessages.content_type = 'File is required';
            isValid = false;
        }

        if (!formData.content_url) {
            errorMessages.content_url = 'File is required';
            isValid = false;
        }

        // Validate message
        if (!formData.message.trim()) {
            errorMessages.message = 'Message cannot be empty';
            isValid = false;
        }

        setErrors(errorMessages);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            const formDataToSend = new FormData();
            formDataToSend.append('login_id', localStorage.getItem('login_id'));
            formDataToSend.append('content_type', formData.content_type);
            formDataToSend.append('content_url', formData.content_url);
            formDataToSend.append('message', formData.message);
            for (let [key, value] of formDataToSend.entries()) {
                console.log(key, value);
              }
            axios.post('http://localhost:5000/api/user/make_request', formDataToSend).then((res) => {
                toast.success(res.data.Message);

            }).catch((err) => {
                console.log(err);
                
                toast.error(err.response.data.message);
            })
        } else {
            console.log('Form is invalid');
        }
    };

    return (
        <>
            <Nav />
          
            <Toaster />
            <section className="contact_section layout_padding">
                <div className="container text-center">
                    <div className="">
                        <h2 className="" style={{ color: "black" }}>Add Request</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit}>

                                <div>
                                    {errors.content_type && (
                                        <span style={{ color: 'red' }}>{errors.content_type}</span>
                                    )}
                                    <select
                                        name="content_type"
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                            height: '50px',
                                            marginBottom: '25px',
                                            paddingLeft: '25px',
                                            backgroundColor: '#ffffff',
                                            outline: 'none',
                                            color: '#101010',
                                            borderRadius: '50px'
                                        }}
                                    >
                                        <option value="">Select Content Type</option>
                                        <option value="video">Video</option>
                                        <option value="image">Image</option>
                                    </select>
                                </div>
                                {/* File Input */}
                                <div>
                                    {errors.content_url && (
                                        <span style={{ color: 'red' }}>{errors.content_url}</span>
                                    )}
                                    <label
                                        htmlFor="fileInput"
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            height: '50px',
                                            marginBottom: '25px',
                                            paddingLeft: '25px',
                                            backgroundColor: '#ffffff',
                                            color: '#101010',
                                            borderRadius: '50px',
                                            lineHeight: '50px',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            border: 'none',
                                            outline: 'none'
                                        }}
                                    >
                                        Choose File
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="video/*,image/*"
                                        name="content_url"
                                        onChange={handleFileChange}
                                        style={{
                                            display: 'none' // Hide the default file input
                                        }}
                                    />
                                </div>
                                <div>
                                    {errors.message && (
                                        <span style={{ color: 'red' }}>{errors.message}</span>
                                    )}
                                    <input
                                        type="text"
                                        className="message-box"
                                        placeholder="Message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="d-flex">
                                    <button type="submit">SUBMIT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >
            <section className="container-fluid footer_section">
                <p>
                    © 2020 All Rights Reserved By
                    <a href="https://html.design/">Free Html Templates</a>
                    <br />
                    Distributed By
                    <a href="https://themewagon.com/" target="_blank" rel="noopener noreferrer">
                        ThemeWagon
                    </a>
                </p>
            </section>
        </>
    );
}
