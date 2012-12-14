(function ($) {
    function getCountFromYoutube(p_sVideoId, p_oCallback) {
        var sCountDown;

        $.ajax({
              "url": 'http://query.yahooapis.com/v1/public/yql'
            , "async" : false
            , "data": {
                "q": 'select * from html where url="http://www.youtube.com/watch?v='+p_sVideoId+'" and xpath="//span[@class=\'watch-view-count\']"'
                , "format": 'json'
            }
            , "dataType" : 'jsonp'
            , "complete" : function () {
                p_oCallback(sCountDown);
            }
            , "success": function (p_oResponseData) {
                var iViews, iCountDown;
                
                if (p_oResponseData.query.count && parseInt(p_oResponseData.query.count, 10) > 0) {
                    iViews = parseInt(p_oResponseData.query.results.span.content.replace(/,/g, ''), 10);
                    iCountDown = 1000000000 - iViews;
                    
                    //add Commas
                    sCountDown = iCountDown + '';
                    var rExpression = /(\d+)(\d{3})/;
                    while (rExpression.test(sCountDown)) {
                        sCountDown = sCountDown.replace(rExpression, '$1' + ',' + '$2');
                    }
                }
            }
        });

        return sCountDown;
    }

    window.getCountFromYoutube = getCountFromYoutube;
}(jQuery));

$(window).load(function(){
    getCountFromYoutube('9bZkp7q19f0', function(p_sCountdown){
        $('#countdown').text(p_sCountdown);
    });
}); 

/*EOF*/
