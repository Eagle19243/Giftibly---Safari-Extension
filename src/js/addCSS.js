GIFTIBLYSTYLE = {
    loadCSS: function(){
        var style = document.createElement('link');
        style.rel = "stylesheet";
        style.type = "text/css";
        style.href = safari.extension.baseURI + "public/css/main.min.css";
        (document.head || document.documentElement).appendChild(style);
    }
};
