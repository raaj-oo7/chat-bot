const chatButtonsContainer = document.getElementById("chat-buttons-container");

// Function to display messages
function displayMessages() {
    chatContainer.innerHTML = '';
    messages.forEach((message, index) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("messages", message.isUser ? "user-message" : "chatbot-message");
        messageElement.innerHTML = `
        <div>
          <img src="${message.isUser ? "./images/user-icon.svg" : "./images/chatbot-icon.svg"}" class="profile-icon">
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

    // Toggle title if messages display or not
    toggleTitleVisibility();
}

// Function to show or hide hidden elements based on the number of messages
function toggleTitleVisibility() {
    const elements = document.getElementsByClassName("hidden-part");
    if (messages.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "flex";
        }
    }
}

// Function to create chat buttons dynamically
function createChatButtons() {
    chatButtonsContainer.innerHTML = '';

    // Get the list of chat UUIDs stored in local storage
    const chatUUIDs = Object.keys(localStorage).filter(key => key.startsWith('chat_')).map(uuid => uuid.replace('chat_', ''));

    // Create buttons for each chat
    chatUUIDs.forEach((chatUUID) => {
        const uniqueChatId = `chat_${chatUUID}`;

        const chatButton = document.createElement('div');
        chatButton.classList.add('chat', 'sidebar-content');

        const icon = document.createElement('div');
        icon.classList.add('flex-item');
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-message"><path d="M8 9h8"></path><path d="M8 13h6"></path><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path></svg>'

        const chatText = document.createElement('div');
        chatText.classList.add('chat-text');
        chatText.textContent = "New Conversation";

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons');

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-trash"><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>';
        deleteButton.addEventListener('click', (event) => {
            // Stop the event from propagating to the chat button click event
            event.stopPropagation();

            // Get the chat UUID from the chat button ID
            const chatId = chatUUID;

            // Call the deleteChat function with the chat UUID
            deleteChat(chatId);
        });

        buttonsContainer.appendChild(deleteButton);

        chatButton.appendChild(icon);
        chatButton.appendChild(chatText);
        chatButton.appendChild(buttonsContainer);

        chatButton.id = uniqueChatId; // Set the unique ID for the chat button
        chatButton.addEventListener('click', () => loadChat(chatUUID));
        chatButtonsContainer.appendChild(chatButton);
    });

    // Display "no data" SVG icon if there are no chat buttons
    if (chatUUIDs.length === 0) {
        // Call this function to display "no data" message
        displayNoDataMessage();
    }
}

// Call this function to create chat buttons on page load
createChatButtons();
