/**
 * Created by s152047 on 2016/08/05.
 */
var contentHandler = {
    update : function () {
        console.log(pageData.contents[0]);
        var template = $('#tpl').html();
        var html = Mustache.to_html(template, pageData.contents[0]);
        $('#tp-output').html(html);
        bodyStyler.styleFix();
        toggleList();
        toggleGalleryList();
    }
};
var bodyStyler = {
        styleFix: function(){
            var body = $('body')
            var bodyHeight = body.height()
            console.log(bodyHeight)
            body.css('top',-bodyHeight*0.1*0.8)
            .css('height',bodyHeight*0.8)
            .css('transform','scale(0.8)')
        }
    };
var pageData = {
};
function smoothScroll(el, to, duration) {
    if (duration < 0) {
        return;
    }
    var difference = to - $(window).scrollTop();
    var perTick = difference / duration * 10;
    this.scrollToTimerCache = setTimeout(function() {
        if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            smoothScroll(el, to, duration - 10);
        }
    }.bind(this), 10);
}
function scrollToContact() {
    // body...
    smoothScroll($(window), 3000, 500);
}
var patentListOpen = true;
function toggleList(argument) {
    var patentList = $("ul#patentList")
    var btn = $("a#patentMoreButton")
    if(!patentListOpen){
        // body...
        patentList.css('height', 'auto');
        btn.html("- Less");
        patentListOpen = true;
    }
    else{
        patentList.css('height', '82px');        
        btn.html("+ More");
        patentListOpen = false
    }

    console.log(patentListOpen)
    console.log(btn.html() )
    
}
var galleryListOpen = true;
function toggleGalleryList(argument) {
    var galleryList = $("ul.ImageGallery")
    var btn = $("a#galleryMoreButton")
    if(!galleryListOpen){
        // body...
        galleryList.css('height', 'auto');
        btn.html("- Less");
        galleryListOpen = true;
    }
    else{
        galleryList.css('height', '305px');        
        btn.html("+ More");
        galleryListOpen = false
    }

    console.log(galleryListOpen)
    console.log(btn.html() )
    
}
//Main function
$(function(){
    console.log(this);
    $.get('MyTemplates/suinftTpl.html', function(data){
        $("#tpl").html(data);
        $.getJSON('Data/suinft_data.json', function(jsonData, status){
            console.log(status);
            console.log(jsonData)
            pageData.contents = jsonData.contents;
            contentHandler.update();
        });
    });
});