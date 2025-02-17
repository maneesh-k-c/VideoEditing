import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import './mymedia.css'
import { useNavigate, useParams } from 'react-router-dom';

export default function SingleEditor() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [request, setRequest] = useState([])
    const [out, setOut] = useState([])

    console.log('request', out);
    useEffect(() => {

        axios.get(`http://localhost:5000/api/user/view-single-editor/${id}`).then((res) => {
            setRequest(res?.data?.Data[0]);
        })
        const login_id = localStorage.getItem('login_id');
        axios.get(`http://localhost:5000/api/user/view_out_editor/${login_id}`).then((res) => {
            setOut(res?.data?.Data);
        })

    }, [id])


    return (
        <>
            {/* Header Section */}
            <Nav />
            {/* End Header Section */}

            {/* Contact Section */}
            <Toaster />
            <section className="contact_section card-section layout_padding">
                <div className="container text-center">
                    <div className="">
                        <h2 className="" style={{ color: "black" }}>Editor Details</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">



                        <div className="col-md-12">
                            <div class="card-container ">
                                <div className="row" style={{ width: "100%" }}>
                                    <div className="col-md-3">
                                        <div class="card-wrapper">

                                            <div class="card-banner-image"
                                                style={{ backgroundImage: `url(${request.image})` }}
                                            > </div>



                                            <h5 style={{ margin: '10px' }}> Name : {request.name}</h5>
                                            <p>{request.email}</p>
                                            <p>{request.mobile}</p>
                                        </div>

                                    </div>
                                    <div className="col-md-9">
                                        <div class="card-wrapper">

                                            {out[0] ?
                                                out.map((req, index) => (
                                                    <>

                                                        <div class="request-banner row">
                                                            <div className="details col-md-8 row">
                                                                {req.content_type === "video" ?
                                                                    <div class="card-banner-image col-lg-8" style={{height:'220px'}} >
                                                                        <video width={"165px"} controls>
                                                                            <source src={req.content_url[0]} type="video/mp4" />
                                                                        </video>
                                                                    </div>
                                                                    :
                                                                    <div class="card-banner-image col-lg-8"
                                                                        style={{ backgroundImage: `url(${req.content_url})`,height:'220px' }}
                                                                    > </div>
                                                                }
                                                                <div className="col-lg-4">

                                                                    <h5 style={{ margin: '10px', textTransform: 'uppercase' }}> Description  </h5>
                                                                    <h6>{req.description}</h6>
                                                                </div>
                                                            </div>




                                                        </div>

                                                    </>
                                                )) :
                                                <div className="no-request">
                                                    <p>No works.</p>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </section >
            {/* End Contact Section */}

            {/* Footer Section */}
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
            {/* End Footer Section */}
        </>
    )
}
