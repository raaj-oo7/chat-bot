const clearAllButton = document.getElementById("clear-all-conversion");

// Function to delete a specific chat by its ID
function deleteChat(chatId) {
    const chatKey = `chat_${chatId}`;
    const chatUUIDs = Object.keys(localStorage).filter(key => key.startsWith('chat_')).map(uuid => uuid.replace('chat_', ''));

    // Check if the chat exists in local storage
    if (localStorage.getItem(chatKey)) {
        // Remove the chat from local storage
        localStorage.removeItem(chatKey);

        // Clear the current chat messages and update UI
        messages = [];
        displayMessages();

        // Remove the chat button from the sidebar
        const chatButton = document.getElementById(`chat_${chatId}`);
        if (chatButton) {
            chatButton.remove();
        }

        // Toggle the visibility of hidden elements
        toggleTitleVisibility();
    } else {
        console.error(`Chat with ID ${chatId} not found.`);
    }

    // Display "No Data" message
    if (chatUUIDs.length === 0) {
        // Call this function to display "no data" message
        displayNoDataMessage();
    }
}

// Function to clear all conversations
function clearAllConversations() {
    Object.keys(localStorage)
        .filter(key => key.startsWith('chat_'))
        .forEach(key => localStorage.removeItem(key));
    messages = [];
    displayMessages();
    chatButtonsContainer.innerHTML = '';
    toggleTitleVisibility();
}

// Call this function to clear all conversations and update UI
function clearAllAndReload() {
    clearAllConversations();
    createChatButtons();
}

// Add an event listener to the clear all button
clearAllButton.addEventListener("click", clearAllAndReload);