import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'
import '../user/mymedia.css'
import { useNavigate, useParams } from 'react-router-dom';
export default function MyWorks() {
    const navigate = useNavigate()
    const [media, setMedia] = useState([])
    console.log(media);

    useEffect(() => {
        const login_id = localStorage.getItem('login_id');
        console.log(login_id);
        axios.get(`http://localhost:5000/api/user/editor_view_my_works/${login_id}`).then((res) => {
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



    const [file, setFile] = useState(null);
    console.log(file);
    const [formData, setFormData] = useState({ content_url: '', description: '', outPutUrl: '' });
    const [sendOut, setSendOut] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const errors = {};

        // File validation
        if (!formData.content_url) {
            errorMessages.content_url = 'File is required';
            isValid = false;
        }

        // Description validation
        if (!formData.description.trim()) {
            errors.description = "Description is required.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);


        const formDataToSend = new FormData();
        formDataToSend.append("editor_login_id", localStorage.getItem("login_id"));
        formDataToSend.append("request_id", media[0]._id);
        formDataToSend.append("description", formData.description);
        formDataToSend.append('login_id', localStorage.getItem('login_id'));
        formDataToSend.append('content_type', media[0].content_type);
        formDataToSend.append('content_url', formData.content_url);
        for (let [key, value] of formDataToSend.entries()) {
            console.log(key, value);
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/upload_output",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response) {
                toast("Output Uploaded Successfully");
                setFile(null);
                setDescription("");
            }




        } catch (error) {
            console.error("Error submitting the form:", error.response || error.message);

        } finally {
            setIsSubmitting(false);
        }
    };




    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0] || '',  // Save the first selected file
        });
    };


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
                        <h2 className="" style={{ color: "black" }}>My Works</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">

                        {sendOut == true ?
                            <div className="col-md-10">
                                <div className="card-container">
                                    <div className="row" style={{ width: "100%" }}>
                                        <div className="col-md-12">
                                            <div className="card-wrapper">
                                                <div
                                                    className="buttons-request col-lg-12 mt-4"
                                                    style={{ display: "flex", justifyContent: "center" }}
                                                >
                                                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                                                        {/* File Upload Field */}
                                                        <div>
                                                            {errors.file && (
                                                                <div style={{ color: "red", marginTop: "5px" }}>
                                                                    {errors.file}
                                                                </div>
                                                            )}
                                                            <label
                                                                htmlFor="fileInput"
                                                                style={{
                                                                    display: "block",
                                                                    width: "100%",
                                                                    height: "50px",
                                                                    marginBottom: "25px",
                                                                    paddingLeft: "25px",
                                                                    backgroundColor: "#ffffff",
                                                                    color: "#101010",
                                                                    borderRadius: "50px",
                                                                    lineHeight: "50px",
                                                                    textAlign: "left",
                                                                    cursor: "pointer",
                                                                    border: "none",
                                                                    outline: "none",
                                                                }}
                                                            >
                                                                Upload Output
                                                            </label>

                                                            <input
                                                                id="fileInput"
                                                                type="file"
                                                                accept="video/*,image/*"
                                                                name="content_url"
                                                                style={{ display: "none" }}
                                                                onChange={handleFileChange}
                                                            />

                                                        </div>


                                                        {/* Description Textarea */}
                                                        <div className="form-group mb-3">
                                                            <textarea
                                                                id="description"
                                                                className="form-control"
                                                                rows="4"
                                                                name='description'
                                                                placeholder="Enter a description"
                                                                onChange={handleChange}
                                                            ></textarea>
                                                            {errors.description && (
                                                                <div style={{ color: "red", marginTop: "5px" }}>
                                                                    {errors.description}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Submit Button */}
                                                        <div className="form-group mb-3" style={{ textAlign: "center" }}>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary"
                                                                disabled={isSubmitting}
                                                            >
                                                                {isSubmitting ? "Submitting..." : "Submit"}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                {media.map((item, index) => (
                                    <div className="col-md-10">
                                        <div class="card-container ">
                                            <div className="row" style={{ width: "100%" }}>
                                                <div className="col-md-6">
                                                    <div class="card-wrapper">
                                                        {item.content_type === "video" ?
                                                            <div class="card-banner-image">
                                                                <video width={"165px"} controls>
                                                                    <source src={item.content_url[0]} type="video/mp4" />
                                                                </video>
                                                            </div>
                                                            :
                                                            <div class="card-banner-image"
                                                                style={{ backgroundImage: `url(${item?.content_url[0]})` }}
                                                            > </div>
                                                        }
                                                        <div className="buttons-request col-lg-12 mt-4" style={{ display: "flex", justifyContent: "center" }}>
                                                            <div class="btn btn-card outline" style={{ width: "150px" }} onClick={() => { navigate(`/chat/${item.login_id}`) }}>chat</div>
                                                            <div class="btn btn-card outline" style={{ width: "150px" }} onClick={() => { setSendOut(true) }}>send output</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div class="card-wrapper">
                                                        <div class="request-banner" >
                                                            <div className="details col-md-12">
                                                                <h5 style={{ margin: '10px', textTransform: 'uppercase' }}> Name : {item.user.name}</h5>
                                                                <p style={{ margin: '10px' }}> Mobile : {item.user.mobile}</p>
                                                                <p style={{ textTransform: 'lowercase' }}>{item.user.email}</p>
                                                                <h5>Description</h5>
                                                                <span style={{ textAlign: 'justify', display: 'block', fontFamily: 'Lato', }}>File Type : {item.content_type} <br />{item.description}</span>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }
                            </>
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
