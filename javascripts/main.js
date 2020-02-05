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
//Main function
$(function(){
    console.log(this);
    $.get('MyTemplates/indexTpl.html', function(data){
        $("#tpl").html(data);
        $.getJSON('Data/descriptions.json', function(jsonData, status){
            console.log(status);
            console.log(jsonData)
            pageData.contents = jsonData.contents;
            contentHandler.update();
        });
    });
});