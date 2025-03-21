
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from './components/Nav';
import axios from 'axios';

export default function Home() {
   

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const [collection, setCollection] = useState([]);
console.log(collection);

    useEffect(() => {
        axios.get('http://localhost:5000/api/register/all-collection').then((res) =>{
            setCollection(res.data.data)
        })
    },[])
    return (
        <>
            <div className="hero_area">
                <div className="main slick_main">
                    <div className="slider slider-for main_img-container">
                        <div className="main-img-box b1"></div>
                        <div className="main-img-box b2"></div>
                        <div className="main-img-box b3"></div>
                    </div>
                </div>
                {/* header section strats */}
                <Nav />
                {/* end header section */}
                {/* slider section */}
                <section className=" slider_section position-relative">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="brand_box">
                                    <a href="">
                                        {/* <img src="images/logo.png" alt="" /> */}
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-8 px-0">
                                <div className="slider_content "style={{color:'black'}}>
                                    <div
                                        id="carouselExampleIndicators"
                                        className="carousel slide"
                                        data-ride="carousel"
                                    >
                                        <div className="carousel-indicators-box">
                                            01/
                                            <ol className="carousel-indicators">
                                                <li
                                                    data-target="#carouselExampleIndicators"
                                                    data-slide-to={0}
                                                    className="active"
                                                >
                                                    01
                                                </li>
                                                <li
                                                    data-target="#carouselExampleIndicators"
                                                    data-slide-to={1}
                                                >
                                                    02
                                                </li>
                                                <li data-target="#carouselExampleIndicators">03</li>
                                            </ol>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <div className="detail_box">
                                                    <h1 style={{color:'black'}}>
                                                    Connect Edit <br /> Create
                                                    </h1>
                                                    <p style={{color:'black'}}>
                                                        There are many variations of passages of creativity
                                                    </p>
                                                    <div className="btn-box">
                                                        {/* <a href="" className="btn-1">
                                                            Contact
                                                        </a> */}
                                                        <a href="#aboutid" className="btn-2">
                                                            About Us
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item ">
                                                <div className="detail_box">
                                                    <h1 style={{color:'black'}}>
                                                    Your Video, Your Vision <br /> Our Editors
                                                    </h1>
                                                    <p style={{color:'black'}}>
                                                        There are many variations of passages of creativity
                                                    </p>
                                                    <div className="btn-box">
                                                        {/* <a href="" className="btn-1">
                                                            Contact
                                                        </a> */}
                                                        <a href="#aboutid" className="btn-2">
                                                            About Us
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="carousel-item ">
                                                <div className="detail_box">
                                                    <h1 style={{color:'black'}}>
                                                    Find the Right Editor <br /> for Your Story
                                                    </h1>
                                                    <p style={{color:'black'}}>
                                                        There are many variations of passages of Creativity
                                                    </p>
                                                    <div className="btn-box">
                                                        {/* <a href="" className="btn-1">
                                                            Contact
                                                        </a> */}
                                                        <a href="#aboutid" className="btn-2">
                                                            About Us
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="carousel-btn-box">
                                            <a
                                                className="carousel-control-prev"
                                                href="#carouselExampleIndicators"
                                                role="button"
                                                data-slide="prev"
                                            >
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a
                                                className="carousel-control-next"
                                                href="#carouselExampleIndicators"
                                                role="button"
                                                data-slide="next"
                                            >
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="img_container">
                                        <div className="slider slider-nav slick_slider-nav">
                                            <div className="img-box">
                                                <img src="images/img-1.jpg" alt="" />
                                            </div>
                                            <div className="img-box">
                                                <img src="images/img-2.jpg" alt="" />
                                            </div>
                                            <div className="img-box">
                                                <img src="images/img-3.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end slider section */}
            </div>
            {/* about section */}
            <section className="about_section layout_padding" id='aboutid'>
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
                            <h2>About Edify</h2>
                            <p style={{color:'black'}}>
                            Welcome to EDIFY, the platform that connects beginner video editors with clients looking for quality edits at affordable prices. Whether you're an aspiring editor building your portfolio or a client seeking creative video solutions, we make collaboration easy. Our mission is to bridge the gap between talent and opportunity, helping editors gain real-world experience while providing clients with multiple edited versions to choose from. Join us and bring your ideas to life!
                            </p>
                            {/* <a href="">Read More</a> */}
                        </div>
                    </div>
                </div>
            </section>
            {/* end about section */}
            {/* portfolio section */}
            {/* <section className="portfolio_section layout_padding-top">
                <div className="container">
                    <div className="heading_container">
                        <h2>Our Portfolio</h2>
                        <p>There are many variations of</p>
                    </div>
                </div>
                <Slider {...settings} className="portfolio_container" >
                    {["p-1.jpg", "p-2.jpg", "p-3.jpg", "p-4.jpg"].map((img, index) => (
                        <div className="box" key={index}>
                            <img src={`/images/${img}`} alt={`Portfolio ${index + 1}`} />
                            <div className="link-box">
                                <a href="#">
                                    <img src="/images/link.png" alt="Link Icon" />
                                </a>
                                <h6>There are many</h6>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section> */}
            {/* end portfolio section */}
            {/* quality section */}
            <section className="quality_section layout_padding">
                <div className="container">
                    <div className="quality_container">
                        <h2>
                            Quality <br />
                            your Photo
                        </h2>
                        <div className="box">
                            <div className="detail-box">
                                <div className="img-box">
                                    <img src="images/q-1.png" alt="" />
                                </div>
                                <div className="text-box">
                                    <h5>Registerd Users</h5>
                                    <p>{collection.user}</p>
                                </div>
                            </div>
                            <div className="detail-box">
                                <div className="img-box">
                                    <img src="images/q-1.png" alt="" />
                                </div>
                                <div className="text-box">
                                    <h5>Professional Editors</h5>
                                    <p>{collection.editor}</p>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </section>
            {/* end quality section */}
        
            {/* news section */}
            <section className="news_section layout_padding">
                <div className="container">
                    <div className="heading_container">
                       
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="box">
                                
                                <div className="img-box">
                                   
                                    <div className="date">
                                        
                                    </div>
                                </div>
                                <div className="detail-box">
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="box">
                                <div className="img-box">
                                   
                                    <div className="date">
                                        
                                    </div>
                                </div>
                                <div className="detail-box">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end news section */}
            {/* contact section */}
            {/* <section className="contact_section layout_padding">
                <div className="container ">
                    <div className="">
                        <h2 className="">Get In Touch</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form action="">
                                <div>
                                    <input type="text" placeholder="Name" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Phone Number" />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="message-box"
                                        placeholder="Message"
                                    />
                                </div>
                                <div className="d-flex ">
                                    <button>SEND</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="img-box">
                                <img src="images/contact-img.png" alt="" />
                                <div className="img_overlay">
                                    <h2>
                                        Best <br />
                                        Photo <br />
                                        studio
                                    </h2>
                                    <a href="">Contact Us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            {/* end contact section */}
           
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
            {/* end google map js */}
        </>

    )
}
