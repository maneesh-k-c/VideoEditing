import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from './components/Nav';
import axios from 'axios'
export default function About() {
  return (
     <>
        <div className="hero_area" style={{height: "10vh"}}>
    
            <Nav />
        </div>
    
    

        {/* end profile section */}
       
        <section className="about_section layout_padding">
  <div className="container-fluid">
    <div className="box">
      <div className="img_container">
        <div className="img-box b1">
          <img src="images/a-1.jpg" alt="" />
        </div>
        <div className="img-box b2">
          <img src="images/a-2.jpg" alt="" />
        </div>
      </div>
      <div className="detail-box">
        <h2>About Our Studio</h2>
        <p style={{color:'black'}}>
          There are many variations of passages of Lorem Ipsum There are many
          variations of passages of Lorem Ipsum
        </p>
        <a href="">Read More</a>
      </div>
    </div>
  </div>
</section>

       
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
