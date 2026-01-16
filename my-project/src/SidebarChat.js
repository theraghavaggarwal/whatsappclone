import React from "react";
import './SidebarChat.css';
import { Avatar } from "@mui/material";
import Chat from "./Chat.js";


function SidebarChat(){
	return (
		<div className="sidebarChat">
			<Avatar />
			<div className="sidebarchat_info">
				<h2>Room Name</h2>
			</div>
		
		
		
		</div>
	)
}
export default SidebarChat;