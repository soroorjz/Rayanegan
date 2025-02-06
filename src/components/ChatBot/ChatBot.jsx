import { TiMessages } from "react-icons/ti";
import "./ChatBot.scss"
const ChatBot = () => {
    return(
        <div className="chatBoxContainer"> 
        <button className="chatBoxBtn" >
          <TiMessages />
       </button>
        <div className="chatBoxDesc">
                گفت و گوی آنلاین
</div>
<div className="chatBoxContent">
    
</div>

       </div>
    ) ;
  };
  
  export default ChatBot;