import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './user/mymedia.css'
import Nav from './components/Nav';
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom';
<style>
  {`
    @media (max-width: 768px) {
      .request-banner {
        flex-direction: column;
        height: auto;
      }

      .chat-container {
        width: 100%;
        max-width: none;
      }
    }
  `}
</style>

export default function Chat() {
    const { id } = useParams()
    const [role, setUsers] = useState(localStorage.getItem('role'));
    const [messages, setMessages] = useState([]);
    const [currentUser] = useState(localStorage.getItem('login_id')); 
    const [text, setText] = useState('');
    console.log('messages', messages, 'userid==>', currentUser, 'editor==>', id);


    useEffect(() => {
        const fetchMessages = () => {
            if (role === 'editor') {
              axios.get(`http://localhost:5000/api/chat/chat/${id}/${currentUser}`).then((res) => {
                console.log(res);
                setMessages(res.data);
              });
            } else {
              axios.get(`http://localhost:5000/api/chat/chat/${currentUser}/${id}`).then((res) => {
                console.log(res);
                setMessages(res.data);
              });
            }
          };
          fetchMessages();
          const interval = setInterval(fetchMessages, 5000);
        
          return () => clearInterval(interval);

    }, [id]);

    const sendMessage = async () => {
        if (text.trim() && id) {
            if (role === 'editor') {
                const message = { sender: currentUser, user_id: id, editor_id: currentUser, text };

                try {
                    await axios.post('http://localhost:5000/api/chat/send-message', message);

                    setMessages((prevMessages) => [...prevMessages, message]);
                    setText('');
                } catch (err) {
                    console.error('Error sending message:', err);
                }
            } else {
                const message = { sender: currentUser, user_id: currentUser, editor_id: id, text };

                try {
                    await axios.post('http://localhost:5000/api/chat/send-message', message);

                    setMessages((prevMessages) => [...prevMessages, message]);
                    setText('');
                } catch (err) {
                    console.error('Error sending message:', err);
                }
            }


        }
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
                        <h2 className="" style={{ color: "black" }}>Media Status</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center">



                        <div className="col-md-8">
                            <div class="card-container ">
                                <div className="row" style={{ width: "100%" }}>

                                    <div className="col-md-12">
                                        <div class="card-wrapper">

                                            <div className="request-banner row" style={{ border:'none', margin: '0', padding: '1rem', boxSizing: 'border-box' }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', height: '80vh',width:'100vw', gap: '1rem' }}>
                                                    {/* Chat Area */}
                                                    <div
                                                        style={{
                                                            flex: 1,
                                                            maxWidth: '150%',
                                                            margin: '0 auto',
                                                            boxShadow: '0px 5px 28px rgba(0, 0, 0, 0.5)',
                                                            padding: '1rem',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                       
                                                        <div
                                                            style={{
                                                                flex: 1,
                                                                overflowY: 'auto',
                                                                marginBottom: '1rem',
                                                                padding: '0.5rem',
                                                                boxSizing: 'border-box',
                                                            }}
                                                        >
                                                            {messages.map((msg, index) => (
                                                                <div
                                                                    key={index}
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: msg.sender === currentUser ? 'flex-end' : 'flex-start',
                                                                        margin: '0.5rem 0',
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            display: 'inline-block',
                                                                            padding: '0.5rem 1rem',
                                                                            borderRadius: '10px',
                                                                            color: 'black',
                                                                            background: msg.sender === currentUser ? '#d1f7c4' : '#f0f0f0',
                                                                            maxWidth: '70%',
                                                                            wordWrap: 'break-word', 
                                                                        }}
                                                                    >
                                                                        {msg.text}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                     
                                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                            <input
                                                                type="text"
                                                                value={text}
                                                                onChange={(e) => setText(e.target.value)}
                                                                style={{
                                                                    flex: 1,
                                                                    padding: '0.5rem',
                                                                    border: '1px solid #ccc',
                                                                    borderRadius: '5px',
                                                                }}
                                                            />
                                                            <button
                                                                onClick={sendMessage}
                                                                style={{
                                                                    padding: '0.5rem 1rem',
                                                                    marginTop:'5px',
                                                                    color: '#fff',
                                                                    border: 'none',
                                                                    borderRadius: '5px',
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                Send
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>





                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </section >
          

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
