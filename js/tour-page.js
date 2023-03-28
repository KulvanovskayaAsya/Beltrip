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
});

let svgContainer = $('.svg-container');
let topSvgContainer = $('.svg-container').offset().top;
let tourPrograms = $('.tour-program');

tourPrograms.each(function(index) {
    if(index == 0) {
        console.log("Номер итерации = ", index)
        drawRouteLine($(this), $(this).next());
    }
});

// $(window).resize(function() {
//     tourPrograms.each(function(index) {
//         if(index < tourPrograms.length - 1) {
//             drawRouteLine($(this), $(this).next());
//         }
//     });
// })

function drawRouteLine(startEl, endEl) {
    let blockHeight = startEl.height();
    let blockWidth = startEl.width();

    let startElHeading = startEl.find('.tour-program__title');
    let endElHeading = endEl.find('.tour-program__title');

    let x1 = startElHeading.offset().left + 16;
    let y1 = startElHeading.offset().top + (startElHeading.height()/2) - topSvgContainer;

    let x2 = endElHeading.offset().left + endElHeading.width() - 16;
    let y2 = endElHeading.offset().top + (endElHeading.height()/2) - topSvgContainer;

    console.log("y1 = ", y1, ". y2 = ", y2)

    let svgHeight = y2;

    var data = [
        {x: x1, y: y1},
        {x: x1 - 120, y: y1 + 80},
        {x: x1 - 120, y: y1 + blockHeight/2},
        {x: x1 - 40, y: y1 + blockHeight},
        {x: blockWidth/3, y: blockHeight + 40},
        {x: blockWidth/2, y: blockHeight + 120},
        {x: blockWidth/2 + 200, y: y2 - endElHeading.height() - 20},
        {x: x2 - 40, y: y2 - endElHeading.height() + 20},
        {x: x2, y: y2}
    ]
    var svg = d3.select(".svg-container").append("svg").attr('height', svgHeight);

    var curveFunc = d3.line()
    .curve(d3.curveCardinal)
    .x(function(d) { return d.x })
    .y(function(d) { return d.y })

    svg.append('path')
       .attr('d', curveFunc(data))
       .attr('stroke', '#333333')
       .attr('fill', 'none')
       .attr('stroke-width', '2')
       .attr('stroke-dasharray', '16 16');
}

// function drawSVGLTR(currentTourProgram, svg, startEl, endEl) {
//     // $("#mySVG").clone().addClass("clone").insertAfter(svg);
//     let tourProgramHeight = currentTourProgram.height();
//     let tourProgramWidth = currentTourProgram.width();

//     //From left to right
//     let x1 = startEl.offset().left + 16;
//     let y1 = startEl.offset().top + (startEl.height()/2) - topSvgContainer;

//     let x2 = endEl.offset().left + endEl.width() - 16;
//     let y2 = endEl.offset().top + (endEl.height()/2) - topSvgContainer;

//     let startPoint = x1 + "," + y1;

//     // let secondPoint = x1 + ", " + (tourProgramHeight + y1);
//     // let thirdPoint = (tourProgramWidth/2 - x1) + ", " + y2;

//     // let endPoint = x2 + ", " + y2;

//     // let temp = "M" + startPoint + " " + firstCurves + " " + secondCurves + " " + thirdCurves;

//     let firstCurves = "C" + (x1 - 200) + "," + y1 + " " + (x1 - 150) + "," + (tourProgramHeight + y1) + " " + x1 + ", " + (tourProgramHeight + y1);
//     let secondCurves = "S" + x1 + ", " + (tourProgramHeight + y1) + " " + (tourProgramWidth/4) + "," + (tourProgramHeight + y1 - 40) + " " + (tourProgramWidth/4 + 140) + "," + (tourProgramHeight + 230) + " " + (tourProgramWidth/2) + "," + y2;
//     let thirdCurves = (tourProgramWidth/2 + 20) + "," + (y2 + 10) + " " + (tourProgramWidth/2 + 280) + "," + (y2 - 100) + " " + (x2 + 100) + "," + (y2 - 120) + " " + x2 + "," + y2;

//     let temp = "M" + startPoint + " " + firstCurves + " " + secondCurves + " " + thirdCurves;
//     $(svg).find('path').attr("d", temp)
// }

// tourPrograms.each(function(index) {

    
//     if(index%2 == 0 && index < tourPrograms.length - 1) {
//         // drawSVGRTL($(this), $("#mySVG"), $(this).find('.tour-program__title'), $(this).next().find('.tour-program__title'));
//     } else if (index%2 != 0 && index < tourPrograms.length - 1) {
//         drawSVGLTR($(this), $("#mySVG"), $(this).find('.tour-program__title'), $(this).next().find('.tour-program__title'));
//     }
// })

// $(window).resize(function() {
//     tourPrograms.each(function(index) {
//         if(index < 1) {
//             drawSVG($(this), $("#mySVG"), $(this).find('.tour-program__title'), $(this).next().find('.tour-program__title'));
//         }
//     })
// })

    // let controlPoint1 = x1 + "," + y1;

    // let controlPoint2 = x1 + "," + (y1 + blockHeight);
    // let controlPoint3 = (blockWidth/2) + "," + y2;
    // let controlPoint4 = (x2 + 40) + "," + (y2 - 100);
    // let controlPoint5 = x2 + "," + y2;

        // let bezierCurve = "M" + controlPoint1 + " C" + (x1 - 200) + "," + y1 + " " + (x1 - 150) + "," + (blockHeight + y1) + " " + controlPoint2
    //     + " S" + controlPoint3 + " " + controlPoint4 + " " + controlPoint5;

    // $(svg).find('path').attr("d", bezierCurve)