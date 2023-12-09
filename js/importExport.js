// export chat
document.getElementById("exportAllChats").addEventListener("click", exportAllChats);

function exportAllChats() {
    const allChatsData = {
        version: 1,
        history: [],
    };

    // Loop through all stored chats in localStorage
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('chat_')) {
            const chatId = key.replace('chat_', '');
            const chatData = JSON.parse(localStorage.getItem(key));

            // Add each chat to the 'history' array
            allChatsData.history.push({
                chatId: `chat_${chatId}`,
                messages: chatData,
            });
        }
    });

    // Check if there are any chats to export
    if (allChatsData.history.length > 0) {
        const blob = new Blob([JSON.stringify(allChatsData)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'export_chats.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    } else {
        console.error('No chats found for export.');
    }
}

// Import chat function
document.getElementById("importChatsButton").addEventListener("click", function () {
    // Trigger the file input click 
    document.getElementById("importChats").click();
});

document.getElementById("importChats").addEventListener("change", handleImportChats);

function handleImportChats(event) {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const importedData = JSON.parse(e.target.result);

                if (importedData && importedData.version === 1 && importedData.history) {
                    importedData.history.forEach(chat => {
                        const chatId = chat.chatId.replace('chat_', '');
                        const chatData = chat.messages;

                        // Save the imported chat to local storage
                        localStorage.setItem(chat.chatId, JSON.stringify(chatData));

                        // Update chat buttons dynamically after importing a new chat
                        createChatButtons();
                    });

                    // Optionally display a success message
                    alert('Chats imported successfully!');
                } else {
                    console.error('Invalid chat export format.');
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Error importing chats. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}