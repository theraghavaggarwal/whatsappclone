import './App.css';
import React,{ useState,useEffect } from 'react';
import SideBar from './SideBar';
import Chat from './Chat';
import Pusher from "pusher-js"
import axios from './axios';

function App() {
	const [messages,setMessages]=useState([]);
  useEffect(()=>{
    axios.get('/messages/sync').then(response=>{
      setMessages(response.data)
    })
	},[]);

	useEffect(()=>{
		const pusher = new Pusher('227a072182f348837e4a', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages,newMessage])
    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();

    }
	},[messages]);

  console.log(messages)

	
  return (
    <div className='app' >
   		<div className='app_body'>
   		<SideBar />	
   		<Chat messages={messages} />	
   		</div>
   		
   		 	 
    </div>
  );
}

export default App;
