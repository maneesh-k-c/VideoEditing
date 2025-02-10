import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import './mymedia.css'
import { useNavigate, useParams } from 'react-router-dom';
export default function MediaStatus() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [request, setRequest] = useState([])
    const [media, setMedia] = useState({})
    console.log(media);
    console.log('request', request);

    useEffect(() => {
        const login_id = localStorage.getItem('login_id');
        console.log(login_id);


        axios.get(`http://localhost:5000/api/user/view_pending_approval_request/${id}`).then((res) => {
            setRequest(res.data.Data);
        })
        axios.get(`http://localhost:5000/api/user/view_single_request/${id}`).then((res) => {
            setMedia(res.data.Data);
        })
    }, [])

    const deleteMedia = (id) => {
        axios.get(`http://localhost:5000/api/user/delete_request/${id}`).then((res) => {
            toast.success(res.data.Message);
            const filterData = media.filter((item) => {
                return item._id !== id
            })
            setMedia(filterData);
        })
    }
    const accept = (approval, editor, request) => {
        axios.get(`http://localhost:5000/api/user/user_accept_request/${request}/${editor}/${approval}`).then((res) => {
            console.log(res.data);

        })
    }

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
                        <h2 className="" style={{ color: "black" }}>Media Status</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">



                        <div className="col-md-12">
                            <div class="card-container ">
                                <div className="row" style={{ width: "100%" }}>
                                    <div className="col-md-3">
                                        <div class="card-wrapper">
                                            {media.content_type === "video" ?
                                                <div class="card-banner-image">
                                                    <video width={"165px"} controls>
                                                        <source src={media.content_url[0]} type="video/mp4" />
                                                    </video>
                                                </div>
                                                :
                                                <div class="card-banner-image"
                                                    style={{ backgroundImage: `url(${media.content_url})` }}
                                                > </div>
                                            }


                                            <h5 style={{ margin: '10px' }}> Type : {media.content_type}</h5>
                                            <p>{media.description}</p>
                                        </div>

                                    </div>
                                    <div className="col-md-9">
                                        <div class="card-wrapper">

                                            {request[0] ?
                                                request.map((req, index) => (
                                                    <>
                                                        {req.status === 'accepted' ?
                                                            <div class="request-banner row">
                                                                <div className="details col-md-8">
                                                                    <h5 style={{ margin: '10px', textTransform: 'uppercase' }}> Name : {req.editor.name}</h5>
                                                                    <p style={{ margin: '10px' }}> Mobile : {req.editor.mobile}</p>
                                                                    <p style={{ textTransform: 'lowercase' }}>{req.editor.email}</p>
                                                                </div>


                                                                <div className="buttons-request col-md-4">

                                                                    <div class="btn btn-card outline" onClick={() => { navigate(`/chat/${req.editor_login_id}`) }}>chat</div>
                                                                    {req.output[0]?.status=="completed" ? 
                                                                    <div class="btn btn-card outline" onClick={() => { navigate(`/request/${req._id}`) }}>output</div>:''
                                                                }


                                                                </div>


                                                            </div> :
                                                            <div class="request-banner row">
                                                                <div className="details col-md-8">
                                                                    <h5 style={{ margin: '10px', textTransform: 'uppercase' }}> Name : {req.editor.name}</h5>
                                                                    <p style={{ margin: '10px' }}> Mobile : {req.editor.mobile}</p>
                                                                    <p style={{ textTransform: 'lowercase' }}>{req.editor.email}</p>
                                                                </div>


                                                                <div className="buttons-request col-md-4">



                                                                    <div class="btn btn-card outline" onClick={() => { accept(req._id, req.editor_login_id, req.requests._id) }}>assign</div>
                                                                    <div class="btn btn-card outline" onClick={() => { deleteMedia(media._id) }}>reject</div>

                                                                </div>


                                                            </div>
                                                        }
                                                    </>
                                                )) :
                                                <div className="no-request">
                                                    <p>No Requests, Waiting for Editors to commit work.</p>
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
