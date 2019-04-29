$('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 200,
    fitWidth: true,
    gutter: 10
});

$(document).ready(function() { 
    $("#info").hover(function() { 
        $(".title-wrapper").css("display", "none");
        $(".intro").css("display", "inline-block");  
    }, function() { 
        $(".title-wrapper").css("display", "block"); 
        $(".intro").css("display", "none");  
    }); 
}); 