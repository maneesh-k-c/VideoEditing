import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import '../user/mymedia.css'
import { useNavigate } from 'react-router-dom';

export default function ManageEditor() {
    const [media, setMedia] = useState([])
    console.log(media);

    useEffect(() => {


        axios.get(`http://localhost:5000/api/register/all-editors`).then((res) => {
            setMedia(res.data.data);
        })
    }, [])

    const deleteMedia = (id) => {
        axios.get(`http://localhost:5000/api/register/delete-editor/${id}`).then((res) => {
            toast.success(res.data.Message);
            const filterData = media.filter((item) => {
                return item.login_id !== id
            })
            setMedia(filterData);
        })
    }
    const approveUSer = (id) => {
        axios.get(`http://localhost:5000/api/register/approve-editor/${id}`).then((res) => {
            toast.success(res.data.message);
            const filterData = media.filter((item) => {
                if (item.login_id._id == id) {
                    item.login_id.status = "approved"
                }
                return item
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
                <Toaster
                    position="bottom-center"
                    reverseOrder={false}
                />
                <section className="contact_section card-section layout_padding">
                    <div className="container text-center">
                        <div className="">
                            <h2 className="" style={{ color: "black" }}>Manage Editors</h2>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
    
    
                            {media?.map((item) => (
                                <div className="col-md-4">
                                    <div class="card-container ">
                                        <div class="card-wrapper">
    
    
                                            <h5 style={{ margin: '10px' }}> Name : {item.name}</h5>
                                            <h6 style={{ margin: '10px' }}> Email : {item.email}</h6>
                                            <h6 style={{ margin: '10px' }}> Mobile : {item.mobile}</h6>
    
                                        </div>
                                        <div class="card-button-wrapper">
                                            <div className="row">
                                                {item.login_id?.status == 'pending' ?
                                                    <>
                                                        <div class="btn btn-card outline" onClick={() => { approveUSer(item.login_id?._id) }}>Approve</div>
                                                        <div class="btn btn-card outline btn-danger" onClick={() => { deleteMedia(item.login_id?._id) }}>DELETE</div></>
                                                    :
                                                    <>
                                                        <div class="btn btn-card outline btn-danger" onClick={() => { deleteMedia(item.login_id?._id) }}>DELETE</div> </>
                                                }
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
