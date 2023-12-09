const chatContainer = document.getElementById("chat");
const userMessageInput = document.getElementById("user-message");
const sendButton = document.getElementById("send-button");

let messages = [];
let currentChatId = 1;

// Chatbot data
const chatbotData = {
    "good morning": "Good Morning!",
    "hi": "Hi!",
    "hello": "Hello! How can I assist you?",
    "favorite color": "What's your favorite color?",
    "goodbye": "Goodbye!",
};

// Function to generate a UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// sending a user message
sendButton.addEventListener("click", () => {
    const userMessage = userMessageInput.value.trim(); // Trim to remove leading and trailing whitespaces
    if (userMessage) {
        addUserMessage(userMessage);
        userMessageInput.value = "";

        const chatbotResponse = chatbotData[userMessage.toLowerCase()];
        if (chatbotResponse) {
            setTimeout(() => {
                addChatbotMessage(chatbotResponse);
            }, 1000);
        } else {
            setTimeout(() => {
                addChatbotMessage("I'm sorry, don't understand. Please explain it correctly.");
            }, 1500);
        }
        saveChat(currentChatId);
    }
    createChatButtons();

});
     
// User enter a message
userMessageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});