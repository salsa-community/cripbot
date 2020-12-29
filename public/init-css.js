var BotCss = {
    init: function () {
        // create css dynamically
        var color = '';
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('color')) {
            color = 'color=' + urlParams.get('color');
        }
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '/bot/css/styles.css?' + color;
        link.media = "screen,print";
        head.appendChild(link);
    }
};


(function () {
    BotCss.init();
})();