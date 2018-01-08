safari.application.addEventListener("command", function(){
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("type", "addCSS");
    safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("type", "addToBasket");
}, false);
