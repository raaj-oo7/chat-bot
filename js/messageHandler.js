const newButton = document.getElementById("new-button");

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

// Function to save the current chat to local storage
function saveChat(chatId) {
    const chatData = {
        messages: messages,
    };
    localStorage.setItem(`chat_${chatId}`, JSON.stringify(chatData));
}

// Function to load a chat from local storage
function loadChat(chatId) {
    const chatData = localStorage.getItem(`chat_${chatId}`);
    if (chatData) {
        messages = JSON.parse(chatData).messages;
        displayMessages();
        currentChatId = chatId;
    }
}

// Function to start a new conversation
function startNewConversation() {
    if (messages.length > 0) {
        messages.length = 0;
        displayMessages();
        currentChatId = generateUUID();
        saveChat(currentChatId);
        createChatButtons();
        toggleTitleVisibility();
    }
}

// New-chat button
newButton.addEventListener("click", () => {
    startNewConversation();
});

function searchChatText() {
    // Get the search input element
    const searchInput = document.getElementById("search-input");

    if (searchInput) {
        // Get the search query
        const searchQuery = searchInput.value.toLowerCase();

        // Filter chat buttons based on the search query
        const chatButtons = document.getElementsByClassName("chat");
        for (let i = 0; i < chatButtons.length; i++) {
            const chatTextElement = chatButtons[i].getElementsByClassName("chat-text")[0];

            if (chatTextElement) {
                const chatText = chatTextElement.textContent.toLowerCase();

                if (chatText.includes(searchQuery)) {
                    // Show the chat button if the chat text contains the search query
                    chatButtons[i].style.display = "flex";
                } else {
                    // Hide the chat button if the chat text does not contain the search query
                    chatButtons[i].style.display = "none";
                }
            }
        }
    }
}

// Add an event listener to the search input for real-time searching
document.getElementById("search-input").addEventListener("input", searchChatText);
