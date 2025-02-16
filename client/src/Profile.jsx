import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from './components/Nav';
import axios from 'axios'
export default function Profile() {
      const [role,setRole] = useState(localStorage.getItem("role"));
      const [profile,setProfile] = useState([]);
        console.log(profile);
        
      useEffect(() => {
        const login_id = localStorage.getItem("login_id");
       
         axios.get(`http://localhost:5000/api/user/profile/${login_id}/${role}`).then((res) =>{
            setProfile(res.data.data);
         })
      
      },[role]);
       
  return (
    <>
    <div className="hero_area" style={{height: "10vh"}}>

        <Nav />
    </div>


    {/* profile section */}
    <section className="client_section layout_padding">
        <div className="container">
            <div className="heading_container">
                <h2>Profile</h2>
                <p>Lorem Ipsum available, but the majority</p>
            </div>
            <div className="client_container">
              
              
                <div
                    id="carouselExampleControls"
                    className="carousel slide"
                    data-ride="carousel"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="box">
                                <div className="img-box">
                                <img src={profile?.image?profile?.image[0]:''} alt="" />
                                </div>
                                <div className="detail-box" >
                                    <h4>{profile?.name}</h4>
                                    <p style={{color:"black"}}>
                                        Mobile : {profile?.mobile} <br />
                                        Email : {profile?.email} <br />
                                        username : {profile?.login_id?.username} <br />
                                    </p>
                                    <img src="images/quote.png" alt="" />
                                </div>
                            </div>
                        </div>
                        
                      
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* end profile section */}
   

   
    {/* footer section */}
    <section className="container-fluid footer_section">
        <p>
            © 2020 All Rights Reserved By
            <a href="https://html.design/">Free Html Templates</a>
            <br />
            Distributed By
            <a href="https://themewagon.com/" target="_blank">
                ThemeWagon
            </a>
        </p>
    </section>
    {/* footer section */}

</>
  )
}
