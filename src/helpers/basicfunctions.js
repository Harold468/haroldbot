import axios from "axios";
import { sendPhoto } from "./multimediafunctions.js";
const sendMessageHandler=async(CHAT_ID,reply,BOT_TOKEN)=>{
    const response = await axios.post(
        `${process.env.telegram_link}${BOT_TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          text: reply,
        }
      );
      return response;
}



const replyprivateMessage=(CHAT_ID,reply,BOT_TOKEN)=>{
return replyMessage(CHAT_ID,reply,BOT_TOKEN)
}
const replygroupMessage=(CHAT_ID,message,BOT_TOKEN)=>{
    if(message.includes(`${process.env.bot_name}`)){
        message = message.replace(`${process.env.bot_name}`,'')
    }
    return replyMessage(CHAT_ID,message,BOT_TOKEN)
}

const replyDefault=async(CHAT_ID,message,BOT_TOKEN)=>{
message =  "I'm sorry, I didn't understand that command. Type /help for more info."
await sendMessageHandler(CHAT_ID,message,BOT_TOKEN)
}
const replyStart=async(CHAT_ID,message,BOT_TOKEN)=>{
message = "Welcome to our bot. Type /help for more info."
await sendMessageHandler(CHAT_ID,message,BOT_TOKEN)
}
const replyHelp=async(CHAT_ID,message,BOT_TOKEN)=>{
    message="Available commands:\n/start - Start the bot\n/help - Get help\n/store - show store"
    await sendMessageHandler(CHAT_ID,message,BOT_TOKEN)
}

const replystore=async(CHAT_ID,message,BOT_TOKEN)=>{
    message="Our store is here:\nEarphones GHS 250 type /Ep \nIphone 16 GHS 20000 type /Ip \nShoes GHS 450 type /Shoe"
    await sendMessageHandler(CHAT_ID,message,BOT_TOKEN)
    // await sendPhoto(CHAT_ID, photoPathOrURL, BOT_TOKEN) 
}

const replyMessage=(CHAT_ID,message,BOT_TOKEN)=>{
    const command = message.split('/')[1]
    switch(command){
        case "start":
            return replyStart(CHAT_ID,message,BOT_TOKEN);
        case "help":
            return replyHelp(CHAT_ID,message,BOT_TOKEN);
        case "store":
            return replystore(CHAT_ID,message,BOT_TOKEN);
        case "Ip":
            return sendPhoto(CHAT_ID, "https://www.apple.com/newsroom/images/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/article/Apple-iPhone-16-hero-240909_inline.jpg.large_2x.jpg",BOT_TOKEN);
        case "Shoe":
            return sendPhoto(CHAT_ID, "https://cdn.pixabay.com/photo/2024/04/12/11/49/ai-generated-8691762_1280.png",BOT_TOKEN);
        case "Ep":
            return sendPhoto(CHAT_ID, "https://media.istockphoto.com/id/1412240771/photo/headphones-on-white-background.webp?s=2048x2048&w=is&k=20&c=UrFVGxBN3NTrnSkOPAqZMoCKMyeB7ZkO-Fs-VVbWyCQ=",BOT_TOKEN);
        default:
            return replyDefault(CHAT_ID,message,BOT_TOKEN);
    } 
}

const WelcomeNewGroupMember=async(CHAT_ID,user_first_name,user_last_name,BOT_TOKEN=process.env.BOT_TOKEN)=>{
    try {
        const response = await axios.post(
          `${process.env.telegram_link}${BOT_TOKEN}/sendMessage`,
          {
            chat_id: CHAT_ID,
            text: `Welcome ${user_first_name} ${user_last_name}`,
          }
        );
        return response;
      } catch (error) {
        console.error("Error sending message to Telegram: Unable to Welcome New Group Member", error.response?.data || error.message);
      }
}

export {replyprivateMessage,replygroupMessage,WelcomeNewGroupMember}