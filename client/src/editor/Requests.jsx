
import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import '../user/mymedia.css'
export default function Requests() {
    const [request, setRequest] = useState([])
    console.log(request);

    useEffect(() => {       
        axios.get(`http://localhost:5000/api/editor/view_pending_request`).then((res) => {
            setRequest(res.data.Data);
        })
    }, [])



    const acceptRequest = (id) => {
        const data = {
            request_id:id,
            editor_login_id:localStorage.getItem('login_id'),
        }
        axios.post(`http://localhost:5000/api/editor/request_for_approval`, data).then((res) => {
            toast.success(res.data.Message);
        }).catch((err) =>{
            toast.error(err.response.data.Message);
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
                           <h2 className="" style={{ color: "black" }}>All Requests</h2>
                       </div>
                   </div>
                   <div className="container">
                       <div className="row justify-content-center">
   
   
                           {!request[0]?
                            <div style={{paddingBottom:'100px'}}>
                            <h1 className="text-center">No Request Found!</h1><br />
                            <p style={{ color: 'black' }}>be patient you will get what you deserve</p>
                        </div>
                           :request.map((item) => (
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
                                               <div class="btn btn-card outline" style={{width:'170px'}}
                                                onClick={() => acceptRequest(item._id)}>Accept Request</div>
                                             
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
