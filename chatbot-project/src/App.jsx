import {useState} from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App(){
        const [chatMessages,setChatMessages]=useState([
          
        ]);
        //const [chatMessages,setChatMessages]=array;
        //const chatMessages=array[0]; current data
        //const setChatMessages=array[1]; Function that updates the data

        return (
          <div className="app-container">
            <ChatMessages 
              chatMessages={chatMessages}
            />
            <ChatInput 
              setChatMessages={setChatMessages}
            />
          </div>
        );
      };

export default App
