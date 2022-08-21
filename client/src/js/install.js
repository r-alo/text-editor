const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
    // Store triggers
    window.deferredPrompt = event;

    // Remove hidden class
    butInstall.classList.toggle("hidden", false);
});

//Click event listener on `butInstall`
butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // See prompt
    promptEvent.prompt();

    // Reset. can be used once
    window.deferredPrompt = null;

    butInstall.classList.toggle("hidden", true);
});

// Click event listener on`appinstalled`
window.addEventListener("appinstalled", (event) => {
    // Clear
    window.deferredPrompt = null;
});