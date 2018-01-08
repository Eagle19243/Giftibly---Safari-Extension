safari.application.addEventListener("command", function(){
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("addCSS", "");
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("addToBasket", "");
}, false);
