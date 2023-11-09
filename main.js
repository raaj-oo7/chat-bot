// Get DOM elements
const chatContainer = document.getElementById("chat");
const userMessageInput = document.getElementById("user-message");
const sendButton = document.getElementById("send-button");
const newButton = document.getElementById("new-button");
const messages = [];

// Chatbot data
const chatbotData = {
  "good morning": "Good Morning!",
  "hi": "Hi!",
  "hello": "Hello! How can I assist you?",
  "favorite color": "What's your favorite color?",
  "goodbye": "Goodbye!",
};

// Function to add a user message to the chat
function addUserMessage(message) {
  messages.push({ text: message, isUser: true });
  displayMessages();
}

// Function to add a chatbot message to the chat
function addChatbotMessage(message) {
  messages.push({ text: message, isUser: false });
  displayMessages();
}

// copy chat messages 
function copyTextToClipboard(text) {
  // Create a new text area element
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  tempTextArea.setAttribute('readonly', '');
  document.body.appendChild(tempTextArea);
  tempTextArea.select();

  // Use the Clipboard to copy the selected text to the clipboard
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log("Text copied to clipboard: " + text);
    })
    .catch(err => {
      console.error("Unable to copy text to clipboard: " + err);
    })
    .finally(() => {
      // Remove the temporary text area
      document.body.removeChild(tempTextArea);
    });
}

// Function to display messages
function displayMessages() {
  chatContainer.innerHTML = ''; // Clear the chat container
  messages.forEach((message, index) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("messages", message.isUser ? "user-message" : "chatbot-message");
    messageElement.innerHTML = `
      <div class="profile-background ${message.isUser ? "user-profile-background" : ""}">
        <img src="${message.isUser ? "./images/user.png" : "./images/chatbot-image.png"}" alt="Profile Image" class="profile-icon">
      </div>
      <div class="message-and-icon">
        <div class="messages-text">
          <p class="text">${message.text}</p>
        </div>
        <button class="copy-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" class="copy-icon">
            <path
             d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z">
            </path>
          </svg>
        </button>
      </div>
    `;

    // copy text from displaying chat messages
    const copyButton = messageElement.querySelector(".copy-button");
    if (copyButton) {
      copyButton.addEventListener("click", () => {
        const textToCopy = message.text;
        copyTextToClipboard(textToCopy);
      });
    }

    if (index > 0) {
      const horizontalLine = document.createElement("div");
      horizontalLine.className = "horizontal-line";
      chatContainer.appendChild(horizontalLine);
    }
    chatContainer.appendChild(messageElement);
  });
}

// sending a user message
sendButton.addEventListener("click", () => {
  const userMessage = userMessageInput.value;
  if (userMessage) {
    addUserMessage(userMessage);
    userMessageInput.value = "";

    // Simulate a chatbot response based on chatbotData
    const chatbotResponse = chatbotData[userMessage.toLowerCase()];
    if (chatbotResponse) {
      setTimeout(() => {
        addChatbotMessage(chatbotResponse);
      }, 1500);
    }
    else{
      setTimeout(() => {
        addChatbotMessage("I'm sorry,don't understand explain correctly.");
      }, 2000);
    }
  }

  // hide elements of hidden class
  const elements = document.getElementsByClassName("hidden-part");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
});

userMessageInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendButton.click();
  }
});

// Click ON new button and start new conversation
newButton.addEventListener("click", () => {
  // Clear chat messages
  messages.length = 0; 
  displayMessages();
  chatContainer.innerHTML = '';

  // Show the hidden parts
  const hiddenParts = document.querySelectorAll(".hidden-part");
  hiddenParts.forEach((element) => {
    element.style.display = "block";
  });
});