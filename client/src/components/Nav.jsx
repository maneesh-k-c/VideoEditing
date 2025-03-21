import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const navigate = useNavigate()
    const [role, setRole] = useState(localStorage.getItem('role'))
    console.log(role);

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const [request, setRequest] = useState([])
    console.log(request);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/editor/view_pending_request`).then((res) => {
            setRequest(res.data.Data);
        })
    }, [])
    
    return (
        <header className="header_section">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg custom_nav-container ">
                    <a href="index.html" className="navbar-brand">
                        {/* <img src="images/logo-black.png" alt="" /> */}
                    </a>
                    <button
                        className="navbar-toggler ml-auto"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="d-flex ml-auto flex-column flex-lg-row align-items-center">

                            {role == 'admin' ?
                                <ul className="navbar-nav  ">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/">
                                            Home <span className="sr-only">(current)</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/about">
                                            {" "}
                                            About
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/manage-media">
                                            Manage media
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/manage-clients">
                                            Manage Clients
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/manage-editors">
                                            Manage Editors
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => { logout() }}>
                                            Logout
                                        </a>
                                    </li>
                                </ul> :
                                role == 'user' ?

                                    <ul className="navbar-nav  ">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/">
                                                Home <span className="sr-only">(current)</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/about">
                                                {" "}
                                                About
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/add-requests">
                                                Upload Media{" "}
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/my-media">
                                                My Media{" "}
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/profile">
                                                Profile
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={() => { logout() }}>
                                                Logout
                                            </a>
                                        </li>
                                    </ul> : role == 'editor' ?
                                        <ul className="navbar-nav  ">
                                            <li className="nav-item active">
                                                <a className="nav-link" href="/">
                                                    Home <span className="sr-only">(current)</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link"style={{position:'relative'}}  href="/all-requests">
                                                    {" "}
                                                    Requests 
                                                    {request.length>0 ?
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: '0',
                                                        right: '0',
                                                        backgroundColor: 'red',
                                                        borderRadius: '50%',
                                                        width: '23px',
                                                        height:'23px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'end',
                                                        padding: '0px',
                                                    }}>{request?.length}</span> :''
                                                }
                                                    
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/my-works">
                                                    My Works{" "}
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/profile">
                                                    Profile
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" onClick={() => { logout() }}>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul> :
                                        <ul className="navbar-nav  ">
                                            <li className="nav-item active">
                                                <a className="nav-link" href="/">
                                                    Home <span className="sr-only">(current)</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/about">
                                                    {" "}
                                                    About
                                                </a>
                                            </li>

                                            <li className="nav-item">
                                                <a className="nav-link" href="/register">
                                                    Register
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/login">
                                                    Login
                                                </a>
                                            </li>
                                        </ul>
                            }

                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}
