import {useState} from 'react'
import {Chatbot} from 'supersimpledev';
import loadingImage from '../assets/loading-spinner.gif'
import './ChatInput.css';

export function ChatInput({setChatMessages}){
        const [inputText,setInputText]=useState('');
        function saveInputText(event){
          setInputText(event.target.value);    //gives element 
        }
        async function sendMessage(){
          if (!inputText.trim()) return;
          const userMessage = {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          };

          const loadingMessage = {
            message: <><img src={loadingImage} className="loading-image"/></>,
            sender: 'robot',
            id: crypto.randomUUID()
          };
          setChatMessages(prev=>[
            ...prev,
            userMessage,
            loadingMessage
          ])
          setInputText('');
          //setChatMessages(newChatMessages);
          const response=await Chatbot.getResponseAsync(inputText);
          
          setChatMessages(prev=>
            prev.map(msg=>
              msg.id===loadingMessage.id ? {...msg,message:response}:msg
            )
          );
          setInputText(''); // to empty after button click ;uses value in input
        }

        function keyDown(event){ // for handling the event on keydown
          if(event.key==='Enter'){
            sendMessage();
          }
          if(event.key==='Esc'||event.key==='Escape'){
            setInputText('');
          }
        }
        return (
          <div className="chat-input-container">
            <input 
              placeholder="Send a message to ChatBot" 
              size="30"
              onChange={saveInputText}
              value={inputText} // here we empty the box 
              onKeyDown={keyDown} //for keydown event
              className="chat-input"
            />
            <button 
            onClick={sendMessage}
            className="send-button"
            >
              Send
            </button>
          </div>
        );
      }