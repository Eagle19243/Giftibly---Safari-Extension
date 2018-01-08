safari.application.addEventListener("command", function(){
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("addCSS", null);
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("addToBasket", null);
}, false);
