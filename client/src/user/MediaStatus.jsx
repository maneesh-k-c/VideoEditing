import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import './mymedia.css'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import QRCode from 'react-qr-code';
export default function MediaStatus() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [request, setRequest] = useState([])
    const [media, setMedia] = useState({})
    const [upi, setUpi] = useState('')
    const [payment, setPayment] = useState({
        request_id: '',
        amount: '',
        editor_login_id: '',
    })
    console.log(payment);
    
    const [showDonationModal, setShowDonationModal] = useState(false);
    const [showQrModal, setShowQrModal] = useState(false);

    const handleDonation = (id) => {
        setOrpDonationId(id);
        setShowDonationModal(true);
    }

    const confirmation = () => {
        setShowQrModal(false)
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Payment completed!",
        });
    }


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

    const makePayment = (id,editor) => {
        setShowDonationModal(true)
        setPayment({...payment,request_id:id,editor_login_id:editor})
    }
        const savePayment = () => {
            axios.get(`http://localhost:5000/api/user/make/${payment.request_id}/${payment.amount}`).then((res) => {
            
                setShowDonationModal(false)
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
                                                                <div className="details col-md-8" >
                                                                    <h5 onClick={() => navigate(`/single-editor/${req.editor._id}`)} style={{ margin: '10px', textTransform: 'uppercase' }}> Name : {req.editor.name}</h5>
                                                                    <p onClick={() => navigate(`/single-editor/${req.editor._id}`)} style={{ margin: '10px' }}> Mobile : {req.editor.mobile}</p>
                                                                    <p onClick={() => navigate(`/single-editor/${req.editor._id}`)} style={{ textTransform: 'lowercase' }}>{req.editor.email}</p>
                                                                    <div class="btn btn-card outline" style={{ width: '160px', marginBottom: '5px' }} onClick={() => { 
                                                                        makePayment(req.request_id,req.editor._id),
                                                                        setUpi(req.editor.upi) 
                                                                        }}>Make Payment</div>
                                                                        

                                                                </div>


                                                                <div className="buttons-request col-md-4">

                                                                    <div class="btn btn-card outline" onClick={() => { navigate(`/chat/${req.editor_login_id}`) }}>chat</div>
                                                                    {req.output[0]?.status == "completed" ?
                                                                        <div class="btn btn-card outline" onClick={() => { navigate(`/request/${req.request_id}`) }}>output</div> : ''
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


                        {showDonationModal && (

                            <div
                                className="modal show d-flex align-items-center justify-content-center"
                                tabIndex="-1"
                                style={{
                                    display: "block",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    zIndex: 1050, // Ensures it appears above other content
                                }}
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content" style={{ borderRadius: "10px", overflow: "hidden" }}>
                                        <div className="modal-header bg-primary text-white">
                                            <h5 className="modal-title">Make Payment</h5>
                                            <input
                                                type="button"
                                                className="btn"
                                                onClick={() => setShowDonationModal(false)}
                                                value='X'
                                                style={{ color: "red", fontSize: "18px", height:'30px', width:'30px',padding:'0px' }}
                                            />
                                            
                                        </div>

                                        <div className="modal-body text-center p-4">
                                            <form>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="donations" style={{color:'black'}} className="form-label fw-bold">Enter Amount</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="donations"
                                                        name="donations"
                                                        onChange={(e) => setPayment({...payment,  amount: e.target.value })}
                                                        required
                                                        min='0'
                                                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                                                    />
                                                </div>
                                                <button className="btn btn-success w-100" onClick={(e) => { e.preventDefault(), setShowQrModal(true), setShowDonationModal(false), savePayment() }}>Submit</button>
                                            </form>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        )}

                        {showQrModal && (
                            <div
                                className="modal show"
                                tabIndex="-1"
                                style={{
                                    display: "block",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                }}
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content" style={{marginTop: "100px"}}>
                                        <div className="modal-header">
                                            <h5 className="modal-title">Donate via UPI</h5>
                                          
                                             <input
                                                type="button"
                                                className="btn"
                                                onClick={() => setShowQrModal(false)}
                                                value='X'
                                                style={{ backgroundColor:'#f0b016', color: "red", fontSize: "18px", height:'30px', width:'30px',padding:'0px' }}
                                            />
                                            
                                        </div>
                                        <div className="modal-body text-center">
                                            {upi ? (
                                                <>
                                                    <p style={{color:'black'}}>
                                                        Scan the QR code below or use a UPI app to make your
                                                        donation.
                                                    </p>
                                                    <QRCode value={upi} size={200} />
                                                    <p className="mt-3" style={{color:'black'}}>
                                                        <strong>Amount:</strong> ₹{payment?.amount}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-danger">No UPI ID available.</p>
                                            )}
                                        </div>
                                        <div className="modal-footer">
                                            
                                            <input
                                                type="button"
                                                className="btn"
                                                onClick={() => confirmation()}
                                                value='close'
                                                style={{ backgroundColor:'#f0b016',color: "black", fontSize: "18px", height:'30px', width:'150px',padding:'0px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}




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
