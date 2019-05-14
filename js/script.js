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

// instantiate lazy loading of images
// after masonry layout

const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

$(document).ready(function() {
    // FILTER PROJECTS
    $("#portfolio-nav .column").on("click", function () {
        $("#portfolio-nav .column").removeClass("active");
        $(this).addClass("active");

        let type = $(this).attr('class').split(' ')[1];

        // filter projects
        if (type == "all") {
            $(".grid-item").css("display", "block");
        } else {
            $(".grid-item").css("display", "none");
            $(".grid-item." + type).css("display", "block");
        }

        // refresh masonry layout
        $('.grid').masonry();

    });

    // NAVIGATION
    $("#top-nav .control").on("click", function () {

        $("#top-nav .column").removeClass("active");
        $(this).parent().addClass("active");

        let name = $(this).attr('class').split(' ')[1];

        // anchor scroll
        function scrollToAnchor(x){
            let aTag = $("a[name='"+ x +"']");
            $('html,body').animate({scrollTop: aTag.offset().top -60},'slow');
        }

        scrollToAnchor(name);


    });

    // HOME BUTTON
    $("#home").on("click", function () {
        $('html,body').animate({scrollTop: 0},'slow');
    });

});

function goToContact () {
    $('html,body').animate({scrollTop: $("a[name='contact']").offset().top -60},'slow');
}