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

function drawSVG(currentTourProgram, svg, startEl, endEl) {
    // $("#mySVG").clone().addClass("clone").insertAfter(svg);
    let tourProgramHeight = currentTourProgram.height();
    let tourProgramWidth = currentTourProgram.width();

    //From left to right
    let x1 = startEl.offset().left + 16;
    let y1 = startEl.offset().top + (startEl.height()/2) - topSvgContainer;

    let x2 = endEl.offset().left + endEl.width() - 16;
    let y2 = endEl.offset().top + (endEl.height()/2) - topSvgContainer;

    let startPoint = "M" + x1 + "," + y1;
    let endPoint = x2 + ", " + y2;
    let firstCurves = "C" + (x1 - 200) + "," + y1 + " " + (x1 - 150) + "," + (tourProgramHeight + y1) + " " + x1 + ", " + (tourProgramHeight + y1);
    let secondCurves = "S" + x1 + ", " + (tourProgramHeight + y1) + " " + (tourProgramWidth/4) + "," + (tourProgramHeight + y1 - 40) + " " + (tourProgramWidth/4 + 140) + "," + (tourProgramHeight + 230) + " " + (tourProgramWidth/2) + "," + y2;
    let thirdCurves = (tourProgramWidth/2 + 20) + "," + (y2 + 10) + " " + (tourProgramWidth/2 + 280) + "," + (y2 - 100) + " " + (x2 + 100) + "," + (y2 - 120) + " " + x2 + "," + y2;

    let temp = startPoint + " " + firstCurves + " " + secondCurves + " " + thirdCurves;
    $(svg).find('path').attr("d", temp)
}

let tourPrograms = $('.tour-program');
let topSvgContainer = $('.svg-container').offset().top;

tourPrograms.each(function(index) {
    if(index < 1) {
        drawSVG($(this), $("#mySVG"), $(this).find('.tour-program__title'), $(this).next().find('.tour-program__title'));
    }
})

$(window).resize(function() {
    tourPrograms.each(function(index) {
        if(index < 1) {
            drawSVG($(this), $("#mySVG"), $(this).find('.tour-program__title'), $(this).next().find('.tour-program__title'));
        }
    })
})