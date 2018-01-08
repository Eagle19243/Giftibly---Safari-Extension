GIFTIBLY = {
    addToBasket: function() {

        function createElement(tag, className, id) {
            var elem = document.createElement(tag);
            if(id) { 
                elem.id = id;
            }
            if(className) {
                elem.className = className; 
            }
            return elem;
        }

        function close() {
            savetobasketCnt.style.opacity = '0';
            overlay.style.opacity = '0';
            removeExtDom();
        }

        function removeExtDom() {
            var elements = document.getElementsByClassName('GFTBmask');
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }

        function stopScroll(event) {
            var delta = 0;
            if(event.wheelDelta) {
                delta = event.wheelDelta/120;
            } else if (event.detail) {
                delta = -event.detail/3;
            }
            if((this.scrollTop === (this.scrollHeight - this.offsetHeight) && delta < 0) || (this.scrollTop === 0 && delta > 0)) {
                if(event.preventDefault) {
                    event.preventDefault();
                }
                event.returnValue = false;
            }
        }

        removeExtDom();

        var height = Math.max(document.body.scrollHeight, document.body.offsetHeight) + 'px';

        var iframe = createElement('iframe', 'GFTBmask');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.height = height;
        
        var overlay = createElement('div', 'GFTBmask', 'GFTBoverlay');
        overlay.style.height = height;

        var savetobasketCnt = createElement('div', 'GFTBmask', 'GFTBsavetobasketCnt');
        savetobasketCnt.innerHTML = '<div id="GFTBheader"><div id="GFTBclose"></div></div><div id="GFTBproductCnt"></div>';

        document.body.appendChild(iframe);
        document.body.appendChild(overlay);
        document.body.appendChild(savetobasketCnt);
        document.getElementById('GFTBclose').addEventListener('click', close);

        document.addEventListener("keydown", function(e){
            if(e.keyCode == 27) { close(); }
        });

        var productCnt = savetobasketCnt.lastChild;
        productCnt.addEventListener("DOMMouseScroll", stopScroll);
        productCnt.addEventListener("mousewheel", stopScroll);

        var images = [],
            minSize = 100,
            imageRatio = 3,
            squareWidth = 200,
            thumbWidth = 200,
            popup,
            popupWidth = 900,
            popupHeight = 480
        ;
        
        for(var i=0; i<document.images.length; i++) {
            var img = document.images[i];

            if(!img.src.replace(/\s/g, '')) {
                continue;
            }

            var w = img.width,
                h = img.height,
                longSide = Math.max(w,h),
                shortSide = Math.min(w,h)
            ;

            if(img.src!=='' && longSide >= minSize && (longSide/shortSide) <= imageRatio) {
                images.push(img);
            }
        }

        if(!images.length) {
            removeExtDom();
            alert('Giftibly:\nSorry, there doesn\'t appear to be any usable images on this page. Please try another.');
        }

        images.sort(function(a,b) { return (b.width * b.height) - (a.width * a.height); });

        for(var i=0; i < images.length; i++){ 
            addImage(images[i].src, images[i].alt);
        }

        function addImage(imageSrc, imageAlt) {
            var productWrapper = createElement('div', 'GFTBproductWrapper');
            var img = document.createElement('img');
            img.style.opacity = '0';
            img.alt=imageAlt;
            
            img.onload=function() {
                var width = this.width;
                var height = this.height;
                if(width < height) {
                    var ratio = thumbWidth / height;
                    var longEdge = height;
                } else {
                    var ratio = thumbWidth / width;
                    var longEdge = width;
                }
                if(width < 200 && height < 200) {
                    var ratio = 1;
                }

                var newWidth = Math.floor(width * ratio);
                var newHeight = Math.floor(height * ratio);
                this.width = newWidth;
                this.height = newHeight;
                this.style.left = Math.floor((squareWidth - newWidth)/2) + 'px';
                this.style.top = Math.floor((squareWidth - newHeight)/2) + 'px';
                this.style.opacity = '1';
            };

            var product = createElement('div', 'GFTBproduct');
            product.appendChild(img);
            
            var addButton = createElement('div', 'GFTBbutton', 'GFTBaddButton');
            addButton.innerHTML = 'Add to Gift Basket';
            product.appendChild(addButton);
            
            productWrapper.appendChild(product);
            productCnt.appendChild(productWrapper);

            productWrapper.addEventListener('click', function() {
                var prev_img =this.childNodes[0].childNodes[0];
                productCnt.innerHTML = "";
                load_confirmation(prev_img, imageAlt, addButton);
            });

            img.src = imageSrc;
            if(img.width > 0 || img.height > 0) {
                img.onload();
                img.onload = null;                
            }
        }

        function load_confirmation(prev_img, imageAlt, addButton){
            var conf_image = createElement('div', 'GFTBconf_image');
            var conf_overview = createElement('div', 'GFTBconf_overview');
            var conf_title = createElement('h4', 'conf_details');
            var newbasketButton = createElement('div', 'GFTBbutton','GFTBnewbasketButton');
            conf_title.innerHTML=imageAlt;
            productCnt.appendChild(conf_image);
            productCnt.appendChild(conf_overview);
            conf_image.appendChild(prev_img);
            conf_overview.appendChild(conf_title);
            conf_overview.appendChild(addButton);
            newbasketButton.innerHTML = 'Create New Gift Basket';
            conf_overview.appendChild(newbasketButton);

            var whichActionButtons = conf_overview.getElementsByClassName('GFTBbutton');
            for (var i = 0; i < whichActionButtons.length; i++) {
                whichActionButtons[i].addEventListener('click', function(imageSrc) {
                    console.log(this.id);
                    var whichAction = this.id;
                    popup = 'https://www.giftibly.com/SOMEURLTOHANDLEDATA?';   ///////// update url 
                    var image_url= 'imageUrl=' + encodeURIComponent(imageSrc);
                    var title = '&title=' + encodeURIComponent(document.title);
                    var link = '&link=' + encodeURIComponent(document.location.href);
                    var product_name = '&product_name=' + encodeURIComponent(imageAlt);
                    var left = Math.floor((screen.width - popupWidth)/2);
                    var top = Math.floor((screen.height - popupHeight)/2);
                    popup+=image_url;
                    popup+=title;
                    popup+=link;
                    popup+=product_name;
                    
                    openPopup(popupWidth, popupHeight, left, top);

                    var prev_img =this.childNodes[0].childNodes[0];
                    productCnt.innerHTML = "";
                });
            }            
        }

        function openPopup(popupWidth, popupHeight, left, top){
            window.open(popup, 'GIFTIBLY', 'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=' + popupWidth + ',height=' + popupHeight + ',left=' + left + ',top=' + top);
            close();
        }
    }
};

safari.self.addEventListener("message", function(event){
    if (event.name == "addToBasket"){
        GIFTIBLY.addToBasket();
    } else if (event.name == "addCSS"){
        GIFTIBLYSTYLE.loadCSS();
    }
}, false);
