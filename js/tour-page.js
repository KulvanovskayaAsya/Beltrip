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