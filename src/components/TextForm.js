// TextForm.js
import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import Navbar from "./Navbar"; // Import your Navbar component
import './styles.css'; // Import the CSS file

export default function TextForm(props) {
    const [text, setText] = useState('');
    const [extractedEmails, setExtractedEmails] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [extractedLinks, setExtractedLinks] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const utteranceRef = useRef(null);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const handleUpperClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
    }

    const handleLowerClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
    }

    const handleClearClick = () => {
        setText('');
    }

    const handleOnChange = (event) => {
        setText(event.target.value);
    }

    const handleEmailClick = () => {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const extracted = text.match(emailRegex) || [];
        setExtractedEmails(extracted);
    }

    const handleLinkClick = () => {
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        const extracted = text.match(linkRegex) || [];
        setExtractedLinks(extracted);
    }

    const handleReadClick = () => {
        if ('speechSynthesis' in window) {
            if (!isSpeaking) {
                utteranceRef.current = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utteranceRef.current);
                setIsSpeaking(true);
            } else {
                if (utteranceRef.current) {
                    speechSynthesis.cancel();
                    setIsSpeaking(false);
                }
            }
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <>
            <Navbar title="TextUtils" darkMode={darkMode} /> 
            <div className="container" style={{ paddingTop: '56px' }}>
                <h1 className={darkMode ? "dark-mode-text" : "light-mode-text"}>{props.heading}</h1>
                <h5>Enter text here</h5>
                <div className="mb-3">
                    <textarea className={`form-control${darkMode ? ' dark-mode-textarea' : ''}`} value={text} onChange={handleOnChange} id="myBox" rows="8" ></textarea>
                    <button className="btn btn-primary my-3" onClick={handleUpperClick}>Uppercase</button>
                    <button className="btn btn-primary my-3 mx-3" onClick={handleLowerClick}>Lowercase</button>
                    <button className="btn btn-primary my-3 " onClick={handleClearClick}>Clear Text</button>
                    <button className="btn btn-primary my-3 mx-3" onClick={handleEmailClick}>Extract Emails</button>
                    <button className="btn btn-primary my-3 " onClick={handleLinkClick}>Extract Links</button>
                    <button className="btn btn-primary my-3 mx-3" onClick={handleReadClick}>{isSpeaking ? 'Pause' : 'Read Text'}</button>
                    
                </div>
            </div>
            <div className="container my-3">
                <h3 className={darkMode ? "dark-mode-text" : "light-mode-text"}>Your text summary</h3>
                <p>{text.split(" ").length} words and {text.length} characters</p>
                <p>{0.08 * text.split(" ").length} average minutes to read </p>
                <h3 className={darkMode ? "dark-mode-text" : "light-mode-text"}>Preview</h3>
                <p>{text}</p>
            </div>
            <div className="container my-3">
                <h3 className={darkMode ? "dark-mode-text" : "light-mode-text"}>Extracted Emails</h3>
                <ul>
                    {extractedEmails.map((email, index) => (
                        <li key={index}>{email}</li>
                    ))}
                </ul>
            </div>
            <div className="container my-3">
                <h3 className={darkMode ? "dark-mode-text" : "light-mode-text"}>Extracted Links</h3>
                <ul>
                    {extractedLinks.map((link, index) => (
                        <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                    ))}
                </ul>
            </div>
            {/* Dark mode button positioned at the bottom right corner */}
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <button className="btn btn-primary" onClick={toggleDarkMode}>{darkMode ? 'Light' : 'Dark'}</button>
            </div>
        </>
    );
}

TextForm.propTypes = {
    heading: PropTypes.string,
    title: PropTypes.string
};
