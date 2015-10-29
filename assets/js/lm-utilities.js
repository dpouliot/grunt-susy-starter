/*used to determine the css height of the help center panel*/
var pageHeight = function(){
    var doc = window.document;
    var docElem = doc.documentElement;
    return Math.max( doc.body.scrollHeight, docElem.scrollHeight, docElem.clientHeight );
};

function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name,"",-1);
}


(function ($) {
    /* Close notifications, e.g. Recall Quote banner */
    var initRemoveOnce = function () {
        // simple function for hiding an element
        $("[data-remove-once]")
            .filterUnenhanced("remove-once")
            .bind("click", function (e) {
                e.preventDefault();
                var $all = $("." + $(this).attr("data-remove-once"));
                $all.removeClass("notification-active");
                //$all.remove();
            });
    };

    $(document).bind("enhance", initRemoveOnce);

    //Image Picker Top 5
    var imagePickerExpand = function(){
        $(".img-picker-set .show-all-link")
            .bind("click", function (e) {
                e.preventDefault();
                console.log("yo");
                $(".img-picker-set").removeClass("collapsed");
                $(this).parent().parent().attr("style","display:none");
            });
    }

    $(document).bind("enhance", imagePickerExpand);
    //Make this support multiple themes

    var enableThemer = function(){
        var themerBox = '<div class="themer"><h3>&oplus; <span>Pick a Theme</span></h3><div class="choices"></div></div></div>',
            libertyCheckbox = '<label><input type="radio" value="" name="themes"  /> liberty</label>',
            geicoCheckbox = '<label><input type="radio" value="geico" name="themes"  /> geico</label>',
            safecoCheckbox = '<label><input type="radio" value="safeco" name="themes"  /> safeco</label>',
        themerCss = '<link rel="stylesheet" href="/docs/css/themer/themer.css">';

        $(themerCss).appendTo("head");

        $(themerBox)
            .prependTo("body")
            .find(".choices")
            .append(libertyCheckbox)
            .append(geicoCheckbox)
            .append(safecoCheckbox);

        //check the radio matching the current cookie theme
        var currentTheme = getCookie("theme"),
            elem = '.themer [value="'+currentTheme+'"]';
        $(elem).prop("checked",true);

        $(".themer input")
            .bind( "click", function( e ){
                var thisTheme = $(this).val();
                var thisCss = thisTheme != "" && thisTheme != null ? '<link rel="stylesheet" href="/assets/css/themes/'+thisTheme+'/main.css" data-isTheme>': "";
                //remove any others first
                $("link[data-isTheme]").remove();

                if ($(this).is(':checked')) {

                    $(thisCss).appendTo("head");
                    $("body").attr("class",thisTheme);
                    setCookie("theme",thisTheme,10);

                } else {
                    $("body").removeClass(thisTheme);
                    setCookie("theme","",10);
                }
            }
        );
    };

    $( document ).bind( "enhance", enableThemer );

    setCurrentThemeByCookie= function(){
        var thisTheme = getCookie("theme");
        if(thisTheme != "" && thisTheme != null){
            var thisCss = '<link rel="stylesheet" href="/assets/css/themes/'+thisTheme+'/main.css" data-isTheme>';
            $(thisCss).appendTo("head");
            $("body").addClass(thisTheme);
        }
    }

    $( document ).bind( "enhance", setCurrentThemeByCookie );



}(jQuery));
