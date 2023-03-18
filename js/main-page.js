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
        swiper:  advantagesThumbsSlider
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

$('.advantages-slider__thumbs .advantages-slider__slide').on('mouseover', function() {
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

/* Form fields */
function createMultiSelect(name) {
    let select = $('.form__field' + name);
    let options = select.find('option');

    let div = $('<div />').addClass('selectMultiple selectMultiple' + name);
    let active = $('<div />');
    let list = $('<ul />');
    let placeholder = select.data('placeholder');

    let span = $('<span />').text(placeholder).appendTo(active);

    options.each(function() {
        let text = $(this).text();
        if($(this).is(':selected')) {
            active.append($('<a />').html('<em>' + text + '</em><i></i>'));
            span.addClass('hide');
        } else {
            list.append($('<li />').html(text));
        }
    });

    active.append($('<div />').addClass('arrow'));
    div.append(active).append(list);

    select.wrap(div);
}

$(document).ready(function() {
    $(function() {
        $('input[name="daterange"]').daterangepicker({
            opens: 'left',
            showDropdowns: true,
            autoUpdateInput: false,
            autoApply: true,
            locale: {
                format: 'DD.MM.YYYY',
                cancelLabel: 'Clear'
            }
        }, function(start, end, label) {
            console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });
    });

    $('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('DD.MM.YYYY') + ' - ' + picker.endDate.format('DD.MM.YYYY'));
    });

    let name = '_cities';
    createMultiSelect(name);
    name = '_types';
    createMultiSelect(name);

    $(document).on('click', '.selectMultiple ul li', function(e) {
        let select = $(this).parent().parent();
        let li = $(this);
        $('.selectMultiple').addClass('active');
        if(!select.hasClass('clicked')) {
            select.addClass('clicked');
            li.prev().addClass('beforeRemove');
            li.next().addClass('afterRemove');
            li.addClass('remove');
            let a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
            a.slideDown(100, function() {
                setTimeout(function() {
                    a.addClass('shown');
                    select.children('div').children('span').addClass('hide');
                    select.find('option:contains(' + li.text() + ')').prop('selected', true);
                }, 200);
            });
            setTimeout(function() {
                if(li.prev().is(':last-child')) {
                    li.prev().removeClass('beforeRemove');
                }
                if(li.next().is(':first-child')) {
                    li.next().removeClass('afterRemove');
                }
                setTimeout(function() {
                    li.prev().removeClass('beforeRemove');
                    li.next().removeClass('afterRemove');
                }, 200);

                li.slideUp(400, function() {
                    li.remove();
                    select.removeClass('clicked');
                });
            }, 600);
        }
    });

    $(document).on('click', '.selectMultiple > div a', function(e) {
        let select = $(this).parent().parent();
        let self = $(this);
        self.removeClass().addClass('remove');
        select.addClass('open');
        setTimeout(function() {
            self.addClass('disappear');
            setTimeout(function() {
                self.animate({
                    width: 0,
                    height: 0,
                    padding: 0,
                    margin: 0
                }, 100, function() {
                    let li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                    li.slideDown(400, function() {
                        li.addClass('show');
                        setTimeout(function() {
                            select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                            if(!select.find('option:selected').length) {
                                select.children('div').children('span').removeClass('hide');
                            }
                            li.removeClass();
                        }, 200);
                    });
                    self.remove();
                })
            }, 100);
        }, 200);
    });

    $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function(e) {
        $(this).parent().parent().toggleClass('open');
    });
});
