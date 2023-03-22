const slidersWithThumbsThumbs = [];
const slidersWithThumbsMain = [];

$('.slider-with-thumbs__thumbs').each(function() {
    slidersWithThumbsThumbs.push(new Swiper(this, {
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
    }));
});

$('.slider-with-thumbs__main').each(function(index) {
    slidersWithThumbsMain.push(new Swiper(this, {
        slidesPerView: 1,
        spaceBetween: 16,
        mousewheel: true,
        grabCursor: true,
        thumbs: {
            swiper: slidersWithThumbsThumbs[index],
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
    }))
})