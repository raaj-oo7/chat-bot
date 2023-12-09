let isSidebarOpen = false;

// Sidebar Handler
function openNav() {
    document.getElementById("sidebar").style.width = "260px";
    document.getElementById("sidebar").style.padding = "8px";
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

// Function to create and display "no data" message
function displayNoDataMessage() {
    const noDataContainer = document.createElement('div');
    noDataContainer.classList.add('no-data-message');
    noDataContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="no-data-size"><path d="M12 5h9"></path><path d="M3 10h7"></path><path d="M18 10h1"></path><path d="M5 15h5"></path><path d="M14 15h1m4 0h2"></path><path d="M3 20h9m4 0h3"></path><path d="M3 3l18 18"></path></svg>';

    const noDataText = document.createElement('span');
    noDataText.textContent = 'No data';
    noDataText.classList.add('no-data-text');

    noDataContainer.appendChild(noDataText);
    chatButtonsContainer.appendChild(noDataContainer);
}