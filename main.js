// Get DOM elements
const chatContainer = document.getElementById("chat");
const userMessageInput = document.getElementById("user-message");
const sendButton = document.getElementById("send-button");
const newButton = document.getElementById("new-button");
const chatButtonsContainer = document.getElementById("chat-buttons-container");

let messages = [];
let currentChatId = 1;
let isSidebarOpen = false;

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
    saveChat(currentChatId);
}

// Function to add a chatbot message to the chat
function addChatbotMessage(message) {
    messages.push({ text: message, isUser: false });
    displayMessages();
    saveChat(currentChatId);
}

// Function to load the chat from local storage
function loadChat(chatId) {
    const chatData = localStorage.getItem(`chat_${chatId}`);
    if (chatData) {
        messages = JSON.parse(chatData);
        displayMessages();
    }
}

// Function to save the chat to local storage
function saveChat(chatId) {
    const chatData = JSON.stringify(messages);
    localStorage.setItem(`chat_${chatId}`, chatData);

    // Update chat buttons dynamically after saving a new chat
    createChatButtons();
}

// Sidebar Handler
function openNav() {
    document.getElementById("sidebar").style.width = "260px";
    document.getElementById("sidebar").style.padding = "10px";
    document.getElementById("content").style.marginLeft = "260px";
    updateSidebarIcon(true);
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("sidebar").style.padding = "0";
    document.getElementById("content").style.marginLeft = "0";
    updateSidebarIcon(false);
}

function updateSidebarIcon(isOpen) {
    const icon = document.getElementById("openBtnIcon");

    if (isOpen) {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-arrow-bar-left"><path d="M4 12l10 0"></path><path d="M4 12l4 4"></path><path d="M4 12l4 -4"></path><path d="M20 4l0 16"></path></svg>';
    } else {
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-arrow-bar-right"><path d="M20 12l-10 0"></path><path d="M20 12l-4 4"></path><path d="M20 12l-4 -4"></path><path d="M4 4l0 16"></path></svg>';
    }
}

function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
    if (isSidebarOpen) {
        openNav();
    } else {
        closeNav();
    }
}

// copy chat messages
async function copyTextToClipboard(text) {
    // Create a new text area element
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    tempTextArea.setAttribute('readonly', '');
    document.body.appendChild(tempTextArea);
    tempTextArea.select();

    try {
        // Use the Clipboard to copy the selected text to the clipboard
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error("Unable to copy text to clipboard: " + err);
    } finally {
        document.body.removeChild(tempTextArea);
    }
}

// Function to display messages
function displayMessages() {
    chatContainer.innerHTML = '';
    messages.forEach((message, index) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("messages", message.isUser ? "user-message" : "chatbot-message");
        messageElement.innerHTML = `
      <div>
        <img src="${message.isUser ? "./images/user-icon.svg" : "./images/chatbot-image.png"}" class="profile-icon">
      </div>
      <div class="message-and-icon">
          <p class="messages-text">${message.text}</p>
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

// Function to show or hide hidden elements based on the number of messages
function toggleTitleVisibility() {
    const elements = document.getElementsByClassName("hidden-part");

    if (messages.length > 0) {
        // If there are messages, hide the elements
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
    } else {
        // If there are no messages, show the elements
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "flex";
        }
    }
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
            }, 1000);
            toggleTitleVisibility();
        } else {
            setTimeout(() => {
                addChatbotMessage("I'm sorry, don't understand. Please explain it correctly.");
            }, 1500);
            toggleTitleVisibility();
        }
        // Save the current chat to local storage
    }
});

userMessageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});

// Function to create chat buttons dynamically
function createChatButtons() {
    // Clear existing buttons
    chatButtonsContainer.innerHTML = '';

    // Get the total number of chats stored in local storage
    const totalChats = Object.keys(localStorage).filter(key => key.startsWith('chat_')).length;

    // Create buttons for each chat
    for (let i = 1; i <= totalChats; i++) {


        const chatButton = document.createElement('div');
        chatButton.classList.add('chat', 'sidebar-content');

        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-comment');

        const chatText = document.createElement('div');
        chatText.classList.add('chat-text');
        chatText.textContent = `Chat ${i}`;

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons');

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.addEventListener('click', (event) => {
            // Stop the event from propagating to the chat button click event
            event.stopPropagation();

            // Get the chat ID from the chat text content
            const chatId = parseInt(chatText.textContent.split(' ')[1]);

            // Call the deleteChat function with the chat ID and the chat button element
            deleteChat(chatId, chatButton);
        });

        buttonsContainer.appendChild(deleteButton);

        chatButton.appendChild(icon);
        chatButton.appendChild(chatText);
        chatButton.appendChild(buttonsContainer);

        chatButton.addEventListener('click', () => loadChat(i));
        chatButtonsContainer.appendChild(chatButton);
    }
}

// Call this function to create chat buttons on page load
createChatButtons();

// Function to start a new conversation
function startNewConversation() {
    // Check if there are any existing messages in the current chat
    if (messages.length > 0) {
        // Clear the current chat messages
        messages.length = 0;
        displayMessages();

        // Increment the chat id for the new chat
        currentChatId++;

        // Toggle the visibility of hidden elements
        toggleTitleVisibility();

        // Save the current chat to local storage with the new chat ID
        saveChat(currentChatId);

        // Load the new chat from local storage
        loadChat(currentChatId);
    } else {
        alert("Cannot create a new chat with empty conversion messages.");
    }
}

newButton.addEventListener("click", () => {
    startNewConversation();
    createChatButtons();
});

function deleteChat(chatId, chatButton) {
    // Remove the chat from local storage
    localStorage.removeItem(`chat_${chatId}`);

    // Reset messages array
    messages = [];

    // Display an empty chat
    displayMessages();

    // Toggle the visibility of hidden elements
    toggleTitleVisibility();

    // Remove the UI button
    chatButton.parentNode.removeChild(chatButton);
}
