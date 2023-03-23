let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbarHeight = $('.header-container').outerHeight();

function hasScrolled() {
    let st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    if (st > lastScrollTop && st > navbarHeight){
        $('.header-container').addClass('header-container_top-hidden');
        $('.sticky-side').removeClass('sticky-side_header-visible');
    } else {
        if(st + $(window).height() < $(document).height()) {
            $('.header-container').removeClass('header-container_top-hidden');
            $('.sticky-side').addClass('sticky-side_header-visible');
        }
    }
    
    lastScrollTop = st;
}

$(function (){ 
    /* Hide header on scroll down */
    $(window).scroll(function() {
        didScroll = true;
    
        var y = $(this).scrollTop();
    });
    
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    /* Header navbar scripts */
    $('.burger-icon').click(function() {
        $(this).toggleClass('open');
		$('.header__navbar').toggleClass('header__navbar_open');
        $('body').toggleClass('prevent-scroll');
	});

    $('.navbar__item-with-submenu').click((function() {
        $('.navbar__item-with-submenu').not($(this)).removeClass('navbar__item-with-submenu_open');
        $(this).toggleClass('navbar__item-with-submenu_open');
    }));

    /* Filter show/hide */
    $('.filter-show-btn').click(function() {
        $('.filter').toggleClass('filter_open')
    })

    /* Text page */
    $('.text-page__navbar .navbar__navlink').click(function() {
        $(this).toggleClass('navbar__navlink_active');
        $('.text-page__navbar .navbar__navlink').not($(this)).removeClass('navbar__navlink_active');
    })
});