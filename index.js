import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import TelegramFunctions from './src/helpers/telegrambot.js'
const PORT = 4000 || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

  
app.post('*',async(req,res)=>{
    // (BOT_TOKEN,CHAT_ID,message)
    let response;
    if(req.body?.message?.new_chat_participant && !req.body?.message?.new_chat_participant?.new_chat_participant){
        response =  TelegramFunctions.WelcomeNewGroupMember(req.body?.message?.chat?.id,req.body?.message?.new_chat_participant?.first_name);
    }else{
        response = await TelegramFunctions.sendTelegramMessage(req.body?.message?.chat?.id,req.body?.message?.chat?.type,req.body?.message?.text);
    }
    res.json({message:'message sent'})
    
})
app.get('*', (req, res) => {
    res.send('Hello World');
});
app.listen(4000,()=>{
    console.log(`Server started on port ${PORT}`);
})