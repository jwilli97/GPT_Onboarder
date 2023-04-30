import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/OnboardAI.module.css';

export default function OnboardAI() {
  const [messages, setMessages] = useState([
    { content: 'Welcome to Snapbrillia! Say hello to get started!', sender: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') {
      return;
    }

    // Add user message to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: userInput, sender: 'user' },
    ]);

    try {
      // Make API request
      const response = await axios.post('/api/gpt', {
        message: userInput,
      });

      // Extract the bot response from the API response
      const botResponse = response.data.message;

      // Add bot response to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: botResponse, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error occurred while communicating with the GPT API:', error);
    }

    // Clear the user input field
    setUserInput('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Snapbrillia Onboarding AI</h1>

      <div className={styles.chatContainer}>
      {messages.map((message, index) => (
        <div
            key={index}
            className={`${styles.chatBubble} ${
            message.sender === 'bot' && index === 0
                ? styles.firstBotMessage
                : styles[message.sender]
            }`}
        >
            <p className={styles.message}>{message.content}</p>
        </div>
        ))}
      </div>
      <div className={styles.userInput}>
      <input
        type="text"
        placeholder="Type your reply here..."
         value={userInput}
        onChange={handleUserInput}
        onKeyPress={(e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        }}
        />
        <button className={styles.sendButton} onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};
