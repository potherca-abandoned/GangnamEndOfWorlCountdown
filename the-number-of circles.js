(function ($) {
    function getCountFromYoutube(p_sVideoId, p_oCallback) {
        var iViews;

        $.ajax({
              "url": 'http://query.yahooapis.com/v1/public/yql'
            , "async" : false
            , "data": {
                "q": 'select * from html where url="http://www.youtube.com/watch?v='+p_sVideoId+'" and xpath="//*[@class=\'watch-view-count\']"'
                , "format": 'json'
            }
            , "dataType" : 'jsonp'
            , "complete" : function () {
                p_oCallback(iViews);
            }
            , "success": function (p_oResponseData) {                
                if (p_oResponseData.query.count && parseInt(p_oResponseData.query.count, 10) > 0) {
                    iViews = parseInt(p_oResponseData.query.results.div.content.replace(/,/g, ''), 10);
                }
            }
        });

        return iViews;
    }

    window.getCountFromYoutube = getCountFromYoutube;
}(jQuery));

$(window).load(function(){
    function addCommas(p_iNumber){
        var rExpression, sResult;
        //add Commas
        sResult = p_iNumber + '';
        rExpression = /(\d+)(\d{3})/;
        while (rExpression.test(sResult)) {
            sResult = sResult.replace(rExpression, '$1' + ',' + '$2');
        }
        
        return sResult;
    }
    
    getCountFromYoutube('9bZkp7q19f0', function(p_iViews){
        if(p_iViews < 1000000000){
            var iCountDown, sCountDown;            
            iCountDown = 1000000000 - p_iViews;
            sCountDown = addCommas(iCountDown);
            $('#countdown').text(sCountDown);
        } else {
            var iCountUp, sCountUp;
                    
            $('h1').text('The world did not end Gangnam Style.');
            $('p.intro').html(
                  'Dispite of Nostradamus\' prediction (as <a '
                + 'href="http://www.huffingtonpost.co.uk/2012/12/12/december-21-mayan-end-world-gangnam-style-psy-nostradamus_n_2285027.html"'
                + '>reported by the Huffington Post</a> and <a '
                + 'href="https://www.google.com/#hl=en&amp;q=end+of+the+world+gangnam+style"'
                + '>other fine sources on the internet</a>) the world did not end on '
                + 'December 21th when <a href="http://www.youtube.com/watch?v=9bZkp7q19f0"'
                + '>PSY\'s "Gangnam Style" video</a> reached one billion views.'
            );

            iCountUp = p_iViews - 1000000000;
            sCountUp = addCommas(iCountUp);
            
            $('p.countdown-container').html('We are currently <span id="countdown">' + sCountUp + '</span> views over one billion!');
        }
        
    });
}); 

/*EOF*/
