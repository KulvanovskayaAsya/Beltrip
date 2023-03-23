$(function() {
    /* Main page sliders */
    let mainSlider = new Swiper(".main-slider", {
        pagination: {
            el: ".swiper-pagination",
            type: 'bullets',
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 5
        },
        loop: true,
        slidesPerView: 1,
        grabCursor: true,
    });

    /* Advantages slider */
    let advantagesThumbsSlider = new Swiper(".advantages-slider__thumbs", {
        direction: 'vertical',
        slidesPerView: 3,
        spaceBetween: 24,
        breakpoints: {
            0: {
                direction: "horizontal",
                centeredSlides: true,
                slidesPerView: "auto"
            },
            1000: {
                direction: 'vertical',
                slidesPerView: 4
            }
        }
    });

    let advantagesMainSlider = new Swiper(".advantages-slider__main", {
        direction: 'vertical',
        effect: 'fade',
        slidesPerView: 1,
        grabCursor: true,
        thumbs: {
            swiper: advantagesThumbsSlider
        },
        breakpoints: {
            0: {
                direction: "horizontal"
            },
            1000: {
                direction: 'vertical'
            }
        }
    });

    $('.advantages-slider__thumbs .advantages-slider__slide').on('mouseover', function () {
        advantagesMainSlider.slideTo($(this).index());
    })

    /* Why Belarus Slider */
    const whyBelarusThumbsSlider = new Swiper('.why-belarus-slider__thumbs .swiper-container', {
        slidesPerView: 3,
        spaceBetween: 16,
        freeMode: true,
        breakpoints: {
            0: {
                direction: 'horizontal',
            },
            1200: {
                direction: 'vertical',
            }
        }

    });

    const whyBelarusMainSlider = new Swiper('.why-belarus-slider__main .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 16,
        mousewheel: true,
        grabCursor: true,
        thumbs: {
            swiper: whyBelarusThumbsSlider,
            autoScrollOffset: 1
        },
        breakpoints: {
            0: {
                direction: 'horizontal',
            },
            1200: {
                direction: 'vertical',
            }
        }
    });

    /* Recalls slider */
    let recallsSlider = new Swiper(".recalls-slider", {
        navigation: {
            nextEl: '.recalls-slider__btn_next',
            prevEl: '.recalls-slider__btn_prev',
        },
        direction: 'horizontal',
        centeredSlides: true,
        loop: true,
        grabCursor: true,
        effect: 'coverflow',
        breakpoints: {
            0: {
                coverflowEffect: {
                    rotate: 0,
                    slideShadows: false
                },
                spaceBetween: 32,
                slidesPerView: 1,
            },
            768: {
                coverflowEffect: {
                    rotate: -40,
                    slideShadows: false
                },
                slidesPerView: 2.75,
            }
        }
    });
});