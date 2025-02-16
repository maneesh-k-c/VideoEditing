import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import './mymedia.css'
import { useNavigate, useParams } from 'react-router-dom';
export default function OutPut() {
    const [media, setMedia] = useState([])
    const { id } = useParams()
    console.log(media);

    useEffect(() => {
        const login_id = localStorage.getItem('login_id');
        console.log(login_id);

        axios.get(`http://localhost:5000/api/user/view_out/${id}`).then((res) => {
            setMedia(res.data.Data);
        })
    }, [id])



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
                        <h2 className="" style={{ color: "black" }}>OutPut</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">


                        {media.map((item) => (
                            <div className="col-md-4">
                                <div class="card-container ">
                                    <div class="card-wrapper">
                                        {item.content_type === "video" ?
                                            <div class="card-banner-image">
                                                <video width={"165px"} controls>
                                                    <source src=
                                                        {item.content_url[0]}
                                                        type="video/mp4" />
                                                </video>
                                            </div>
                                            :
                                            <div class="card-banner-image"
                                                style={{
                                                    backgroundImage:
                                                        `url(${item.content_url[0]})`
                                                }}
                                            > </div>
                                        }


                                        <h5 style={{ margin: '10px' }}> Type :
                                            {item.content_type}
                                        </h5>
                                        <p>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div class="card-button-wrapper">
                                        <div className="row">
                                            <div
                                                className="btn btn-card outline"
                                                style={{width:'150px'}}
                                                onClick={() => {
                                                    if (item.content_url && item.content_url.length > 0) {
                                                        const link = document.createElement("a");
                                                        link.href = item.content_url[0]; // URL of the file
                                                        link.download = item.content_url[0].split("/").pop(); // Extracts filename
                                                        document.body.appendChild(link);
                                                        link.click();
                                                        document.body.removeChild(link);
                                                    } else {
                                                        alert("No file available for download.");
                                                    }
                                                }}
                                            >
                                                Download
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }




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
