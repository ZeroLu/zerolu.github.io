/**
 * Created by s152047 on 2016/08/05.
 */
var urlHandler = {
    url:window.location.href,/*url by default is url in the bar*/
    getCurrentUrl: function () {
        return (window.location.href);
    },
    parseUrl: function (url) {
        var that = this;
        var a =  document.createElement('a');
        if(!url){
            a.href = that.url;
        }
        else {
            a.href = url;
        }
        return {
            source: a.href,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(/^\?/,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    },
    params:function(){
        var that = this;
        return that.parseUrl().params;
    },
    bindPopstateEvent: function () {
        var that = this;
        window.addEventListener("popstate", function () {
            console.log(that.currentUrl+"  Here!  ");
            contentHandler.update(that.getCurrentUrl());
        })
    },
    pushHistory: function (url) {
        history.pushState(null, null, url);
    },
    categoryHrefs: function (categories) {
        var that = this;
        return categories.map(function (category,i) {
            return (that.parseUrl().path + "?category=" + i)
        });
    },
    imageUrlsForProject:function(category,project) {
        var prefix = "images/projectImages";
        var categoryName = "/" + category;
        var projectTitle = "/" + project.titleEng;
        var result = {};
        try {
            result.mainPicture = encodeURI(prefix + categoryName + projectTitle + "/main.jpg");
            result.thumbnail = encodeURI(prefix + categoryName + projectTitle + "/thumbnail.jpg");
            //result.videoPoster = encodeURI(prefix + categoryName + projectTitle + "/video.jpg");
            return result;
        }
        catch (e){
            console.log("No image for this project!  "+ e);
        }
    },
    projectHrefs: function(categoryId, projects){
        var that = this;
        return projects.map(function (project, i) {
            return (that.parseUrl().path + "?category=" + categoryId+ "&project=" +i );
        })
    },
    projectThumbnails : function(category, projects){
        var that = this;
        return projects.map(function (project) {
            return (function(){
                var prefix = "images/projectImages";
                var categoryName = "/" + category;
                var projectTitle = "/" + project.titleEng;
                var result = {};
                try {
                    result = encodeURI(prefix + categoryName + projectTitle + "/thumbnail.jpg")
                    return result;
                }
                catch (e){
                    console.log("No thumbnail for this project!  "+ e);
                }
            });
        })
    },
    actionUrlsForProject : function(categoryId, projectId){
        var that = this;
        var result = {};
        if(projectId >= 1){
            //*1 to turn data type into int
            var lastProjectId = projectId*1 - 1;
            result.lastProject = that.parseUrl().path + "?category=" + categoryId+ "&project=" + lastProjectId ;
        }
        else {
            result.lastProject = "none"
        }
        //TODO need to be more robust
        if(projectId <= 4){
            //*1 to turn data type into int
            var nextProjectId = projectId*1 + 1;
            result.nextProject = that.parseUrl().path + "?category=" + categoryId+ "&project=" + nextProjectId ;
        }
        else {
            result.nextProject = "none"
        }
        return result;
    }
};
var utils = {
};
var linkHandler = {
    bindEvent : function(){
        var ajaxLinks = $(".ajax-link-wrap a");
        ajaxLinks.click(function (e) {
            e.preventDefault();
            var clickedUrl = this.attributes['href'].value;
            contentHandler.update(clickedUrl);
            if (this != urlHandler.getCurrentUrl()) {
                urlHandler.pushHistory(clickedUrl);
            }
            else {
                console.log("The same url! " + this);
            }
        });
    }
};
var contentHandler = {
    update : function (url) {
        urlHandler.url = url;
        //For the rendering of the page, the data from the descriptions.json file must be reconstructed.
        //The reconstruction mainly consists of adding hrefs. Hrefs are generated with urlHandler.
        var fetchedData = {};
        fetchedData.categories = [];
        fetchedData.categories.names = pageData.categories;
        fetchedData.categories.hrefs = urlHandler.categoryHrefs(pageData.categories);
        fetchedData.categories = fetchedData.categories.names.map(function (name,i) {
            //Add categories href
            return {name:name, href:fetchedData.categories.hrefs[i]};
        });

        /*find valid category in url*/
        if((urlHandler.params().category)&&(urlHandler.params().category < pageData.categories.length)) {
            fetchedData.categoryId = urlHandler.params().category;
            fetchedData.category = fetchedData.categories[fetchedData.categoryId];
            fetchedData.projects = pageData.contents[fetchedData.categoryId].projects;
            fetchedData.projects.hrefs = urlHandler.projectHrefs(fetchedData.categoryId, fetchedData.projects);
            fetchedData.projects.thumbnail = urlHandler.projectThumbnails(fetchedData.category.name, fetchedData.projects);
            fetchedData.projects = fetchedData.projects.map(function (project, i) {
                //Add project href for each project
                project.href = fetchedData.projects.hrefs[i];
                project.thumbnail = fetchedData.projects.thumbnail[i];
                return project;
            });
            console.log("Got category");

            /*find valid project in url*/
            if ((urlHandler.params().project) && (urlHandler.params().project < pageData.contents[fetchedData.categoryId].projects.length)) {
                fetchedData.projectId = urlHandler.params().project;
                fetchedData.project = fetchedData.projects[fetchedData.projectId];
                //Add image urls for each project
                fetchedData.project.imageUrls = urlHandler.imageUrlsForProject(fetchedData.category.name,fetchedData.project);
                fetchedData.project.actionUrls = urlHandler.actionUrlsForProject(fetchedData.categoryId,fetchedData.projectId);
                console.log("Got project");
            }
            else{
                console.log("No project");
            }
        }
        else{
            console.log("No category");
        }

        console.log(fetchedData);
        var template = $('#tpl').html();
        var html = Mustache.to_html(template, fetchedData);
        $('#tp-output').html(html);

        //Bind event to all the links
        linkHandler.bindEvent();
    }
};
var pageData = {
};
//Main function
$(function(){
    urlHandler.bindPopstateEvent();
    $.get('MyTemplates/indexTpl.html', function(data){
        $("#tpl").html(data);
        $.getJSON('Data/descriptions_CN.json', function(data){
            pageData.contents = data.contents;
            pageData.categories = data.categories;
            contentHandler.update(urlHandler.getCurrentUrl());
        });
    });


    //autoRefresh();
});


function autoRefresh(){
    window.onblur = function () {
        location.reload();
    };
    window.onfocus = function () {
        location.reload();
    };
}