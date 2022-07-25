$(document).ready(function(){

    //phone masked
    $('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
    $('input[type="tel"]').on('click', function() {
        $(this).setCursorPosition(4);
    })
    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };


    //popup block
    $('.js-popup-wrap .js-btn-toggle').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('body').removeClass('menu-show');
        } else {
            $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
            $(this).addClass('active');
            if ($(this).parent().hasClass('main-menu-wrap')) {
                $('body').addClass('menu-show');
            }
        }
        return false;
    })
    $('.js-popup-wrap .js-btn-close').on('click', function() {
        $(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
        $('body').removeClass('menu-show');
        return false;
    })
    $(document).click(function(event) {
        if ($(event.target).closest(".js-popup-block").length) return;
        $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('body').removeClass('menu-show');
        event.stopPropagation();
    });
    $('.js-popup-wrap').each(function() {
        if ($(this).hasClass('js-popup-select')) {
            // alert(1)
            if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
                $(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
            }
            var currentSelect = $(this).find('.js-popup-block').find('.active').html();
            $(this).find('.js-btn-toggle').html(currentSelect);
        }
    })
    $('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
        if ($(this).hasClass('active')) {} else {
            $(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
            $(this).addClass('active');
        }
        $('.js-popup-wrap').each(function() {
            if ($(this).hasClass('js-popup-select')) {
                if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
                    $(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
                }
                var currentSelect = $(this).find('.js-popup-block').find('.active').html();
                $(this).find('.js-btn-toggle').html(currentSelect);
            }
        })
        $(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
        return false;
    })


    //toggle view 
    $('.js-view-content').addClass($('.js-view-buttons .js-view-button.active').attr('data-view'));
    $('.js-view-buttons .js-view-button').on('click', function() {
        $('.js-view-content').removeClass('view-main');
        $('.js-view-content').removeClass('view-small');
        $('.js-view-buttons .js-view-button.active').removeClass('active');
        $(this).addClass('active');
        $('.js-view-content').addClass($('.js-view-buttons .js-view-button.active').attr('data-view'));
        return false;
    })



    //file input 
    $('.js-field-file .js-file-button').on('click', function () {
        $(this).parent().find('input').click();
        return false;
    })
    $('input[type=file]').on('change', function () {
        var fileName = ('' + $(this).val()).replace(/^.*[\ \/]/, '');
        //if (fileName.length > 15) {
        //fileName = fileName.substring(0, 15) + '...';
        //}
        if (fileName == "") {
            fileName = $(this).parent().find('.js-file-button').attr('data-title');
        }
        $(this).parent().find('.js-file-button').html(fileName);
    });


    //wrap more toggle
    $('.item-wrap.wrap-more a').on('click', function() {
        $(this).parents('.items-wrap').toggleClass('show-all');
        $(this).toggleClass('active');
        return false;
    })

    //tabs
    $('.js-tabs-nav').each(function() {
        $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
    })
    $('.js-tab-title').each(function() {
        if ($(this).hasClass('active')) {
            $(this).next('.js-tab-content').show(0);
        }
    })
    $('.js-tabs-nav li a').on('click', function() {
        if ($(this).hasClass('active')) {} else {
            $('.js-tab-block').removeClass('active');
            $(this).parents('.js-tabs-nav').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.js-tabs-nav').each(function() {
                $('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
            })
        }
        return false;
    })
    $('.js-tab-title').on('click' , function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next('.js-tab-content').slideUp(200);
        } else {
            $(this).addClass('active').next('.js-tab-content').slideDown(200);
        }
    })


    //item-video
    $('.js-btn-video').on('click', function () {
        let videoURL = $(this).parent('.item-video').attr('data-video');
        $(this).parents('.item-video').addClass('active');
        $(this).parents('.item-video').append('<iframe width="100%" height="100%" src="' + videoURL + '" frameborder="0" allowfullscreen></iframe>')
        return false;
    })

    //main-slider-box
    function playClip(media) {
        media.play();
        console.log('play')
    }
    function stopClip(media) {
        media.pause();
        console.log('stop')
    }
    if (!!$('.main-slider-box').offset()) {
        $('.main-slider-box .slider').on('init', function (event, slick, currentSlide, nextSlide) {
            $('.main-slider-box .js-video-wrap').each(function() {
                let myVideoStop = $(this).get(0);
                stopClip(myVideoStop);
            })
            let myVideoPlay = $('.main-slider-box .slick-slide.slick-active .js-video-wrap').get(0);
            playClip(myVideoPlay);
        })
        $('.main-slider-box .slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        prevArrow: false,
                        nextArrow: false,
                        dots: true
                    }
                },
            ]
        });
        $('.main-slider-box .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $('.main-slider-box .slider-counters .sl-dot').removeClass('active');
            $('.main-slider-box .slider-counters .sl-dot[data-slide="' + currentSlide + '"]').addClass('active');
            $('.main-slider-box .js-video-wrap').each(function() {
                let myVideoStop = $(this).get(0);
                stopClip(myVideoStop);
            })
            let myVideoPlay = $('.main-slider-box .slick-slide.slick-active .js-video-wrap').get(0);
            playClip(myVideoPlay);
        })
        $('.main-slider-box .js-video-wrap').on('click', function() {
            playClip($(this));
        })
    }

    //main productions tabs
    if (!!$('.main-productions-box').offset())  {
        $('.main-productions-box .tags-wrap a:not(.active)').on('click', function() {
            $('.main-productions-box .tags-wrap a.active').removeClass('active');
            $(this).addClass('active');
        })
    }


    
    //main productions tabs
    if (!!$('.main-productions-box').offset())  {
        $('.main-productions-box .tags-wrap a:not(.active)').on('click', function() {
            $('.main-productions-box .tags-wrap a.active').removeClass('active');
            $(this).addClass('active');
        })
    }


    //main-articles-box
    if (!!$('.main-articles-box').offset()) {
        $('.main-articles-box .slider').slick({
            dots: false,
            slidesToShow: 3,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        dots: true
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        dots: true
                    }
                },
            ]
        });
    }


    //gallery-box
    if (!!$('.gallery-box').offset()) {
        $('.gallery-box .slider').slick({
            dots: false,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        dots: true
                    }
                },
            ]
        });
    }


    $('.slider-outer-box .slider-title-box .ico-arrow-prev').on('click', function () {
        $(this).parents('.slider-outer-box').find('.slider-wrap').find('.ico-arrow-prev').click();
        return false;
    })
    $('.slider-outer-box .slider-title-box .ico-arrow-next').on('click', function () {
        $(this).parents('.slider-outer-box').find('.slider-wrap').find('.ico-arrow-next').click();
        return false;
    })
    $('.slider-outer-box .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        if ($(this).parents('.slider-outer-box').find('.slider-wrap').find('.ico-arrow-prev').hasClass('slick-disabled')) {
            $(this).parents('.slider-outer-box').find('.slider-title-box').find('.ico-arrow-prev').addClass('slick-disabled');
        } else {
            $(this).parents('.slider-outer-box').find('.slider-title-box').find('.ico-arrow-prev').removeClass('slick-disabled');
        }
        if ($(this).parents('.slider-outer-box').find('.slider-wrap').find('.ico-arrow-next').hasClass('slick-disabled')) {
            $(this).parents('.slider-outer-box').find('.slider-title-box').find('.ico-arrow-next').addClass('slick-disabled');
        } else {
            $(this).parents('.slider-outer-box').find('.slider-title-box').find('.ico-arrow-next').removeClass('slick-disabled');
        }
    })
    

});

$(window).on('load', function () {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false,
        'albumLabel': false
    })
    
    $('select.form-input').select2();
    
});