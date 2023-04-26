$(function() {
    const sliderWithThumbsThumbs = new Swiper('.slider-with-thumbs__thumbs', {
        slidesPerView: 3,
        spaceBetween: 16,
        freeMode: true,
        breakpoints: {
            0: {
                direction: 'horizontal',
            },
            600: {
                direction: 'vertical',
            },
            900: {
                direction: 'horizontal',
            },
            1100: {
                direction: 'vertical',
            }
        }
    });

    const sliderWithThumbsMain = new Swiper('.slider-with-thumbs__main', {
        slidesPerView: 1,
        spaceBetween: 16,
        mousewheel: true,
        grabCursor: true,
        thumbs: {
            swiper: sliderWithThumbsThumbs,
            autoScrollOffset: 1
        },
        breakpoints: {
            0: {
                direction: 'horizontal',
            },
            600: {
                direction: 'vertical',
            },
            900: {
                direction: 'horizontal',
            },
            1100: {
                direction: 'vertical',
            }
        }
    });

    Fancybox.bind('[data-fancybox="gallery"]', {});    

    const coverflowSlider = new Swiper('.coverflow-slider', {
        effect: 'coverflow',
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 4,
        grabCursor: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 50,
            depth: 150,
            modifier: 1.5,
            slideShadows : false,
        },
        navigation: {
            nextEl: '.coverflow-slider__btn_next',
            prevEl: '.coverflow-slider__btn_prev',
        }
    });
   
    createRouteSVG();
});

let tourPrograms = $('.tour-program');

$(window).resize(function() {
    $(".route-line path").attr('d', '')
    createRouteSVG();
});

function createRouteSVG() {
    let routeLineCoordinates = [];

    tourPrograms.each(function(index) {
        getRoutePoints($(this), index, routeLineCoordinates);
    });
    
    drawRouteLine(routeLineCoordinates);
}

function getRoutePoints(tourProgram, index, coordinates) {
    let topSvgContainer = $('.route-line').offset().top,
        blockHeight = $(tourProgram).height(),
        blockWidth = $(tourProgram).width(),
        elHeading = $(tourProgram).find('.tour-program__title'),
        x, y;

    if(index % 2 != 0) { //right blocks
        x = elHeading.offset().left + elHeading.width() - 16;
        y = elHeading.offset().top + (elHeading.height() / 2) - topSvgContainer;
        
        coordinates.push(
            { x: x, y: y - elHeading.outerHeight() - 20 }
        )
    } else { //left blocks
        x = elHeading.offset().left + 16;
        y = elHeading.offset().top + (elHeading.height() / 2) - topSvgContainer;

        if(index != 0) {
            coordinates.push(
                { x: x + 60, y: y - elHeading.height() - 60 }
            )
        }
    }

    coordinates.push(
        { x: x, y: y }
    )

    if(index % 2 == 0 && index < tourPrograms.length - 1) { //left blocks
        coordinates.push(
            { x: x - 100, y: y + 80 },
            { x: x - 120, y: y + blockHeight / 2 },
            { x: x - 40, y: y + blockHeight },
            { x: x + blockWidth / 4, y: y + blockHeight - 40 },
            { x: x + blockWidth / 2, y: y + blockHeight },
        )
    } else if (index % 2 != 0 && index != tourPrograms.length - 1) { //right blocks
        coordinates.push(
            { x: x + 120, y: y + blockHeight / 3 },
            { x: x + 40, y: y + blockHeight / 2 },
            { x: x + 40, y: y + blockHeight},
        )
    }
}

function drawRouteLine(coordinates) {
    let curveFunc = d3.line()
    .curve(d3.curveCardinal) //curveCardinal curveLinear
    .x(function(d) { return d.x })
    .y(function(d) { return d.y })

    d3.select(".route-line path")
       .attr('d', curveFunc(coordinates))
       .attr('stroke', '#333333')
       .attr('fill', 'none')
       .attr('stroke-width', '1')
       .attr('stroke-dasharray', '16 16');
}