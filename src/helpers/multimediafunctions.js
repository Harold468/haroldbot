import axios from "axios";

const sendPhoto = async (CHAT_ID, photoPathOrURL, BOT_TOKEN) => {
    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
        {
          chat_id: CHAT_ID,
          photo: photoPathOrURL, // URL or file_id of the photo
        }
      );
      console.log("Photo sent:", response.data);
    } catch (error) {
      console.error("Error sending photo:", error.response?.data || error.message);
    }
  };

  export {sendPhoto}