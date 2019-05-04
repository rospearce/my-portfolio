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
    $(".column").on("click", function () {
        $(".column").removeClass("active");
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
});