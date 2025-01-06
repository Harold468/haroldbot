// Function to send a message to the Telegram bot
import  {replyprivateMessage,replygroupMessage,WelcomeNewGroupMember} from './basicfunctions.js'

const sendTelegramMessage = async (CHAT_ID,Chat_Type,message,BOT_TOKEN=process.env.BOT_TOKEN) => {
    try {
    let reply;
    switch(Chat_Type){
        case "private":
            reply=`${replyprivateMessage(CHAT_ID,message,BOT_TOKEN)}`;
            break;
        case "group":
            reply=`${replygroupMessage(CHAT_ID,message,BOT_TOKEN)}`;
            break;
        default:
            return "Invalid chat type";
    }
      
    } catch (error) {
      console.error("Error sending message to Telegram:", error.response?.data || error.message);
    }
  };

const TelegramFunctions = {sendTelegramMessage,WelcomeNewGroupMember}

export default TelegramFunctions