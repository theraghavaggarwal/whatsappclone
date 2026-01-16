import React from "react";
import "./SideBar.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import {IconButton,Avatar} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
function SideBar(){
	return(
		<div className='sidebar'>
		<div className="sidebar_header">
		<Avatar  />
			<div className="sidebar_headerRight">
				<IconButton>
				<DonutLargeIcon />
				</IconButton>
				<IconButton>
				<ChatIcon />
				</IconButton>
				<IconButton>
				<MoreVertIcon />
				</IconButton>
				
			</div>
					
		</div>
		<div className="sidebar_search">
			<div className="sidebar_searchcontainer">
				<SearchOutlined />		
				<input type="text" placeholder="Search or start a new chat" />
			
			</div>
		</div>
		<div className="sidebar_chats">
			<SidebarChat />
			<SidebarChat />
			<SidebarChat />
		</div>
		
		</div>
	)
}
export default SideBar;