import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


export default function Registration() {
    const navigate = useNavigate()
    const [type, setType] = useState(true); // Toggle between user and editor forms
    const [userdata, setUserdata] = useState({ name: '', email: '', mobile: '', username: '', password: '', image: '' });
    const [editordata, setEditordata] = useState({ name: '',upi:'', email: '', mobile: '', qualification: '', username: '', password: '',image:'' });
    const [userErrors, setUserErrors] = useState({});
    const [editorErrors, setEditorErrors] = useState({});

    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === 'user') {
            setUserdata({ ...userdata, [name]: value });
        } else {
            setEditordata({ ...editordata, [name]: value });
        }
    };

    const validateForm = (formType) => {
        const currentData = formType === 'user' ? userdata : editordata;
        const newErrors = {};

        if (!currentData.name) newErrors.name = 'Name is required';
        if (!currentData.image) newErrors.image = 'Image is required';
        if (!currentData.email || !/\S+@\S+\.\S+/.test(currentData.email)) newErrors.email = 'Valid email is required';
        if (!currentData.mobile || !/^\d{10}$/.test(currentData.mobile)) newErrors.mobile = 'Valid 10-digit mobile number is required';
        if (!currentData.username) newErrors.username = 'Username is required';
        if (!currentData.password || currentData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (formType === 'editor' && !currentData.qualification) {
            newErrors.qualification = 'Qualification is required';
        }
        if (formType === 'editor' && !currentData.upi) {
            newErrors.upi = 'Qualification is required';
        }

        if (formType === 'user') {
            setUserErrors(newErrors);
        } else {
            setEditorErrors(newErrors);
        }
console.log(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e, formType) => {
        
        e.preventDefault();
        if (validateForm(formType)) {
            console.log(formType);
            if (formType === 'user') {
                const formDataToSend = new FormData();
                formDataToSend.append('name', userdata.name);
                formDataToSend.append('email', userdata.email);
                formDataToSend.append('mobile', userdata.mobile);
                formDataToSend.append('username', userdata.username);
                formDataToSend.append('password', userdata.password);
                formDataToSend.append('image', userdata.image);

                axios.post('http://localhost:5000/api/register/user', formDataToSend).then((res) => {
                    console.log(res);
                    toast.success(res.data.Message);
                    setTimeout(() => {
                        navigate("/login")
                    }, 2000);

                }).catch((err) => {
                    console.log(err);

                    toast.error(err.response.data.Message);
                })

            } else {
                console.log(editordata);
                
                const formDataToSend = new FormData();
                formDataToSend.append('name', editordata.name);
                formDataToSend.append('email', editordata.email);
                formDataToSend.append('mobile', editordata.mobile);
                formDataToSend.append('qualification', editordata.qualification);
                formDataToSend.append('username', editordata.username);
                formDataToSend.append('upi', editordata.upi);
                formDataToSend.append('password', editordata.password);
                formDataToSend.append('image', editordata.image);
                axios.post('http://localhost:5000/api/register/editor', formDataToSend).then((res) => {
                    console.log(res);
                    toast.success(res.data.Message);
                    setTimeout(() => {
                        navigate("/login")
                    }, 2000);

                }).catch((err) => {
                    console.log(err);

                    toast.error(err.response.data.Message);
                })
            }
        }
    };

    const handlerestFileChange = (e) => {
        const { name, files } = e.target;
        setUserdata({
            ...userdata,
            [name]: files[0] || '',
        });
    };
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setEditordata({
            ...editordata,
            [name]: files[0] || '',
        });
    };

    return (
        <>
            <Toaster />
            <section className="contact_section layout_padding" style={{ height: '100vh' }}>
                <div className="container d-flex ">
                    <div style={{ width: '44%', textAlign: 'center' }}>
                        <h2 style={{ color: 'black' }}>{type ? 'Register as a user' : 'Register as an editor'}</h2>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ color: 'black', cursor: 'pointer' }} onClick={() => setType(!type)}>
                            {type ? 'Not a user? Click here if you are an editor' : 'Not an editor? Click here if you are a user'}
                        </h3>
                    </div>
                </div>

                {type ? (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <form onSubmit={(e) => handleSubmit(e, 'user')}>
                                    <div className="row">
                                        <div className='col-lg-6'>
                                            {userErrors.name && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{userErrors.name}</p>}
                                            <input
                                                onClick={() => setUserErrors({ ...userErrors, name: '' })}
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                value={userdata.name}
                                                onChange={(e) => handleInputChange(e, 'user')}
                                            />

                                        </div>
                                        <div className='col-lg-6'>
                                            {userErrors.email && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{userErrors.email}</p>}
                                            <input
                                                type="text"
                                                onClick={() => setUserErrors({ ...userErrors, email: '' })}
                                                name="email"
                                                placeholder="Email"
                                                value={userdata.email}
                                                onChange={(e) => handleInputChange(e, 'user')}
                                            />
                                        </div>
                                        <div className='col-lg-12'>
                                            {userErrors.mobile && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{userErrors.mobile}</p>}
                                            <input
                                                type="text"
                                                onClick={() => setUserErrors({ ...userErrors, mobile: '' })}
                                                name="mobile"
                                                placeholder="Mobile"
                                                value={userdata.mobile}
                                                onChange={(e) => handleInputChange(e, 'user')}
                                            />
                                        </div>
                                        <div className='col-lg-12'>
                                            {userErrors.image && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{userErrors.image}</p>}
                                            <input
                                                type="file"
                                                onClick={() => setUserErrors({ ...userErrors, image: '' })}
                                                name="image"
                                                onChange={handlerestFileChange}
                                            />
                                        </div>
                                        <div className='col-lg-12'>
                                            {userErrors.username && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{userErrors.username}</p>}
                                            <input
                                                type="text"
                                                onClick={() => setUserErrors({ ...userErrors, username: '' })}
                                                name="username"
                                                placeholder="Username"
                                                value={userdata.username}
                                                onChange={(e) => handleInputChange(e, 'user')}
                                            />
                                        </div>
                                        <div className='col-lg-12'>
                                            {userErrors.password && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{userErrors.password}</p>}
                                            <input
                                                type="password"
                                                onClick={() => setUserErrors({ ...userErrors, password: '' })}
                                                name="password"
                                                placeholder="Password"
                                                value={userdata.password}
                                                onChange={(e) => handleInputChange(e, 'user')}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <button type="submit">REGISTER</button>
                                    </div>
                                    <div className='d-flex justify-content-center mt-2' style={{ color: 'black' }}>
                                        <p>Already have an account? <a href='/login'>Login</a></p>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-6">
                                <div className="img-box">
                                    <img src="images/contact-img.png" alt="" />
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
                ) : (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <form onSubmit={(e) => handleSubmit(e, 'editor')}>
                                    <div className="row">
                                        <div className='col-lg-6'>
                                            {editorErrors.name && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{editorErrors.name}</p>}
                                            <input
                                                type="text"
                                                onClick={() => setEditorErrors({ ...editorErrors, name: '' })}
                                                name="name"
                                                placeholder="Name"
                                                value={editordata.name}
                                                onChange={(e) => handleInputChange(e, 'editor')}
                                            />
                                        </div>
                                        <div className='col-lg-6'>
                                            {editorErrors.email && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{editorErrors.email}</p>}
                                            <input
                                                type="text"
                                                onClick={() => setEditorErrors({ ...editorErrors, email: '' })}
                                                name="email"
                                                placeholder="Email"
                                                value={editordata.email}
                                                onChange={(e) => handleInputChange(e, 'editor')}
                                            />
                                        </div>
                                        <div className='col-lg-6'>
                                            {editorErrors.mobile && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{editorErrors.mobile}</p>}
                                            <input
                                                type="text"
                                                onClick={() => setEditorErrors({ ...editorErrors, mobile: '' })}
                                                name="mobile"
                                                placeholder="Mobile"
                                                value={editordata.mobile}
                                                onChange={(e) => handleInputChange(e, 'editor')}
                                            />
                                        </div>
                                        <div className='col-lg-6'>
                                            {editorErrors.qualification && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{editorErrors.qualification}</p>}
                                            <input
                                                type="text"
                                                onClick={() => setEditorErrors({ ...editorErrors, qualification: '' })}
                                                name="qualification"
                                                placeholder="Qualification"
                                                value={editordata.qualification}
                                                onChange={(e) => handleInputChange(e, 'editor')}
                                            />
                                        </div>
                                        <div className='col-lg-6'>
                                            {editorErrors.upi && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{editorErrors.upi}</p>}
                                            <input
                                                type="text"
                                                onClick={() => setEditorErrors({ ...editorErrors, upi: '' })}
                                                name="upi"
                                                placeholder="Enter Upi" 
                                                value={editordata.upi}
                                                onChange={(e) => handleInputChange(e, 'editor')}
                                            />
                                        </div>
                                        <div className='col-lg-12'>
                                            {editorErrors.image && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{userErrors.image}</p>}
                                            <input
                                                type="file"
                                                onClick={() => setEditorErrors({ ...editorErrors, image: '' })}
                                                name="image"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className='col-lg-12'>
                                            {editorErrors.username && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{editorErrors.username}</p>}
                                            <input
                                                type="text"
                                                name="username"
                                                onClick={() => setEditorErrors({ ...editorErrors, username: '' })}
                                                placeholder="Username"
                                                value={editordata.username}
                                                onChange={(e) => handleInputChange(e, 'editor')}
                                            />
                                        </div>
                                        <div className='col-lg-12'>
                                            {editorErrors.password && <p className="error" style={{ color: 'red', marginBottom: '0px' }}>{editorErrors.password}</p>}
                                            <input
                                                type="password"
                                                name="password"
                                                onClick={() => setEditorErrors({ ...editorErrors, password: '' })}
                                                placeholder="Password"
                                                value={editordata.password}
                                                onChange={(e) => handleInputChange(e, 'editor')}
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <button type="submit">REGISTER</button>
                                    </div>
                                    <div className='d-flex justify-content-center mt-2' style={{ color: 'black' }}>
                                        <p>Already have an account? <a href='/login'>Login</a></p>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-6">
                                <div className="img-box">
                                    <img src="images/contact-img.png" alt="" />
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
                )}
            </section>
        </>
    );
}
