import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import './mymedia.css'
import { useNavigate } from 'react-router-dom';
export default function MyMedia() {
    const [media, setMedia] = useState([])
    console.log(media);

    useEffect(() => {
        const login_id = localStorage.getItem('login_id');
        console.log(login_id);

        axios.get(`http://localhost:5000/api/user/view_user_added_request/${login_id}`).then((res) => {
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

    const navigate = useNavigate();
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
                        <h2 className="" style={{ color: "black" }}>My Media</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">


                        {!media[0] ?

                            <div style={{paddingBottom:'100px'}}>
                                <h1 className="text-center">No Media Found!</h1><br />
                                <p style={{ color: 'black' }}>you have to upload any media first</p>
                            </div>
                            : media.map((item) => (
                                <div className="col-md-4">
                                    <div class="card-container ">
                                        <div class="card-wrapper">
                                            {item.content_type === "video" ?
                                                <div class="card-banner-image">
                                                    <video width={"165px"} controls>
                                                        <source src={item.content_url[0]} type="video/mp4" />
                                                    </video>
                                                </div>
                                                :
                                                <div class="card-banner-image"
                                                    style={{ backgroundImage: `url(${item.content_url[0]})` }}
                                                > </div>
                                            }


                                            <h5 style={{ margin: '10px' }}> Type : {item.content_type}</h5>
                                            <p>{item.description}</p>
                                        </div>
                                        <div class="card-button-wrapper">
                                            <div className="row">
                                                <div class="btn btn-card outline" onClick={() => { navigate(`/my-media-status/${item._id}`) }}>VIEW</div>
                                                <div class="btn btn-card outline" onClick={() => { deleteMedia(item._id) }}>DELETE</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}


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
