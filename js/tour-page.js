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

let tourPrograms = $('.tour-program');
let topSvgContainer = $('.svg-container').offset().top;

tourPrograms.each(function(index) {
    if(index < 1) {
        drawSVG($("#mySVG"), $(this).find('.tour-program__title'), $(this).next().find('.tour-program__title'));
    }
})

function drawSVG(target, startEl, endEl) {
    // $("#mySVG").clone().addClass("clone").insertAfter(target);
    let blockHeight = startEl.height();

    var x1 = startEl.offset().left + 16;
    var y1 = startEl.offset().top + (startEl.height()/2) - topSvgContainer;

    var x2 = endEl.offset().left + endEl.width() - 16;
    var y2 = endEl.offset().top + (endEl.height()/2) - topSvgContainer;

    let startPoint = "M" + x1 + "," + y1 + " ";
    
    
    let temp = startPoint + "C" + (x1 - 200) + "," + (y1 + blockHeight) + " " + (x1 + 100) + "," + (blockHeight + 200) + " " + x1 + ", " + (blockHeight + 100);
    console.log(temp)
    // let temp2 = "M" + x1 + "," + y1 + " C" + (x1 - 300) + "," + (y1 + 300) + " " + (x1 + 100) + "," + (y1 + 200) + " " + x2 + ", " + y2;
    // console.log(temp2)
    $(target).find('path').attr("d", temp)
}



$(window).resize(function() {
    drawSVG($("#mySVG"), $(tourProgramsTitles[0]), $(tourProgramsTitles[1]));
})