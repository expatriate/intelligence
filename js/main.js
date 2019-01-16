'use strict'

var directionSlider, productSlider, newsSlider, maxOpened = 0, menuOpened = false, portfolioOpened = false;
var resizeTimer;

function loadSwiperImages() {
  var images = ['designImages', 'consultingImages', 'digitalImages', 'codingImages', 'animationImages'];

  images.forEach(function(item) {

    var name = item.replace('Images', '');
    var container = $('.' + name + 'portfolio').find('.swiper-wrapper');

    if (window[item] && window[item].length) {

      var big = true, smallCounter = 0;
      var content = '', tempcontent = '';
      for (var i = 0; i < window[item].length; i++) {

        // Add big slide
        if (big) {
          content += '<div class="swiper-slide">' +
                        '<div class="swiper-slide__big">' +
                            '<img src="img/' + name + '/' + window[item][i] + '">' +
                          '</div>' +
                      '</div>';
          big = false;
        } else {
          // Add 4 small slides
          tempcontent += '<div class="swiper-grid__item">' +
                            '<img src="img/' + name + '/' + window[item][i] + '">' +
                          '</div>';
          smallCounter ++;
          if (smallCounter == 4) {
            content += '<div class="swiper-slide">' +
                              '<div class="swiper-grid">' +
                                tempcontent + 
                              '</div>' +
                            '</div>';
            smallCounter = 0;
            tempcontent = '';
            big = true;
          }
        }
      }
      container.html(content);
    }
  });
}

function loadVideos() {
  var video0 = $('#video_0'),
      video1 = $('#video_1'),
      video2 = $('#video_2'),
      video3 = $('#video_3'),
      video4 = $('#video_4'),
      video5 = $('#video_5');

  var playPromise = video0[0].play();

  if (playPromise !== undefined) {
      playPromise.then(function (_) {
          //video.pause();
          video0[0].currentTime = 0;
          video0[0].play();
      }).catch(function (error) {});
  }

  var video1 = $('#video_1');

  var playPromise = video1[0].play();

  if (playPromise !== undefined) {
      playPromise.then(function (_) {
          //video.pause();
          video1[0].currentTime = 0;
          video1[0].play();
      }).catch(function (error) {});
  }

  var playPromise = video2[0].play();

  if (playPromise !== undefined) {
      playPromise.then(function (_) {
          //video.pause();
          video2[0].currentTime = 0;
          video2[0].play();
      }).catch(function (error) {});
  }

  var playPromise = video3[0].play();

  if (playPromise !== undefined) {
      playPromise.then(function (_) {
          //video.pause();
          video3[0].currentTime = 0;
          video3[0].play();
      }).catch(function (error) {});
  }

  var playPromise = video4[0].play();

  if (playPromise !== undefined) {
      playPromise.then(function (_) {
          //video.pause();
          video4[0].currentTime = 0;
          video4[0].play();
      }).catch(function (error) {});
  }

  var playPromise = video5[0].play();

  if (playPromise !== undefined) {
      playPromise.then(function (_) {
          //video.pause();
          video5[0].currentTime = 0;
          video5[0].play();
      }).catch(function (error) {});
  }

}

$(document).ready(function() {


  $('#fullpage').fullpage({
    //menu: '#menu',
    //css3: false,
    //keyboardScrolling: false,
    fixedElements: '#header, #footer, .mail, .share, .follower, #startoverlay',
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors:['main', 'design', 'coding', 'digital', 'consulting', 'animation',],
    recordHistory: false,
    animateAnchor: false,
    //scrollHorizontally: false,
    //slideSelector: '.horizontal-scrolling',

    onLeave: function(origin, destination, direction) {

      if (!destination.isFirst) {
        $('.go-to-main-image').hide();
        if (!$('.go-to-main-text').is(':visible')) {
          $('.go-to-main-text').css({display: 'block', opacity: 0}).animate({opacity: 1}, 500);
          $('#menu').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 500).removeAttr('style');
        }
      } else {
        $('#menu').css({'visibility': 'hidden'});
        $('.go-to-main-text').hide();
        if (!$('.go-to-main-image').is(':visible')) {
          $('.go-to-main-image').css({display: 'block', opacity: 0}).animate({opacity: 1}, 500);
        }
      }

      var portfolioOpened = $('body').find('.portfolio-hidden:visible');
      if (portfolioOpened.length) {
        portfolioOpened.find('.section-portfolio__close').click();
      }
      
    },
    afterRender: function() {
      setTimeout(function() {
        $('#startoverlay').animate({opacity: 0}, 200, function() {
          $('#startoverlay').css({display: 'none'});
        });

      }, 300)
    }
  });

  // Disable default scrolling
  $.fn.fullpage.setMouseWheelScrolling(false);
  $.fn.fullpage.setAllowScrolling(false);
  $.fn.fullpage.setScrollingSpeed(0);

  // Loading videos
  loadVideos();

  // Loading images
  loadSwiperImages();

  $('.mail').on('click', function() {
    $('.mail-hidden').css({display:'block'}).animate({opacity: 1}, 200);
    $('.thankyou_message').css({'display': 'none'});
    $('.form-elements').css({'display': 'block'});
    
    $('.mouse').hide();
    startWritetousAnimation();
  });

  $('.mail-hidden__close').on('click', function() {
    $('.mail-hidden').animate({opacity: 0}, 200, function() {
      $('.mail-hidden').css({display:'none'})
    });
    if ($.fn.fullpage.getActiveSection().index !== 7) {
      $('.mouse').show();
    }
    restoreWritetousAnimation();
  });

  $('#menu').on('click', function() {
    if (!menuOpened) {
      $('.menu-hidden').css({display:'block'}).animate({opacity: 1}, 200);
      startMenuAnimation();
      menuOpened = true;

      $('.menu').addClass('opened');
    } else {

      $('.menu-hidden').animate({opacity: 0}, 200, function() {
        $('.menu-hidden').css({display:'none'})
      });
      restoreMenuAnimation();
      menuOpened = false;

      $('.menu').removeClass('opened');
    }
  });

  $('.section-portfolio__link').on('click', function() {
    if (!portfolioOpened) {
      var el = $(this).data('href');
      $('#'+el).css({display:'block'}).animate({opacity: 1}, 200);
      portfolioOpened = true;

      startSwiper(el);
    }
  });

  function startSwiper(el) {
    var mySwiper = document.querySelector('.'+el).swiper;
    if (!mySwiper) {
      var swiper = new Swiper('.'+el, {
        slidesPerView: 2,
        spaceBetween: 5,
        mousewheel: {
          invert: true,
        },
        scrollbar: {
          el: '.'+el+'__scrollbar',
          hide: false,
          draggable: true,
        },
        breakpoints: {
          720: {
            slidesPerView: 1,
          }
        },
      });
    }
  }

  $('.section-portfolio__close').on('click', function() {
    var el = $(this).data('href');
    $('#'+el).animate({opacity: 0}, 200, function() {
      $('#'+el).css({display:'none'})
    });
    
    portfolioOpened = false;
  });

  $('.menu-hidden__close').on('click', function() {
    $('.menu-hidden').animate({opacity: 0}, 200, function() {
      $('.menu-hidden').css({display:'none'})
    });
    restoreMenuAnimation();
    menuOpened = false;

    $('.menu').removeClass('opened');
  });

  $('.menu-link').on('click', function() {
    $('#menu').click();
  });

  var canSend = true;
  $('.js-animate-show-submit').on('click', function(e) {
    $('.form-elements').find('input').each(function(index, item) {
      if ($(item).val() == '') {
        $(item).parent().addClass('invalid');
        e.preventDefault();
      }
    });
    if (!$('.form-elements').find('.input-holder.invalid').length) {
      if (canSend) {
        $(this).addClass('sending');
        canSend = false;
      } else {
        e.preventDefault();
      }
    }
  });

  $('.form-elements').find('input').on('focusin', function(e) {
    $(e.target).parent().removeClass('invalid');
  });


  function startMenuAnimation() {
    $('#header').css({opacity: 0.4, 'pointer-events': 'none'});
    $('#footer').css({opacity: 0.4, 'pointer-events': 'none'});
  }

  function restoreMenuAnimation() {
    $('#header').removeAttr('style');
    $('#footer').removeAttr('style');

  }

  function animateBlock(block) {
    var els = $(block).find('.not-animated, .not-animated-opacity');

    if ($(block).hasClass('section-news')) {
      $('#section-news__slider').trigger('news-animation');
    }
    if ($(block).hasClass('section-product')) {
      $('#section-product__slider').trigger('product-animation');
    }
    if ($(block).hasClass('section-direction')) {
      $('#section-direction__slider').trigger('direction-animation');
    }
    if ($(block).hasClass('section-direction')) {
      startTeamAnimation();
    }

    els.each(function(index, item) {
      setTimeout(function() {
        if ($(item).hasClass('not-animated-opacity')) {
          $(item).addClass('animated-opacity');
        } else {
          $(item).addClass('animated');
        }
      }, 200 * (index + 1) * 2 );
    });
  }

  function startWritetousAnimation() {
    var els = $('#write-to-us').find('.js-animate-show-input');
    var inputs = $('#write-to-us').find('.js-animate-show-input input');
    inputs.css({bottom: '-50px'});
    els.find('.input-holder-line').css({width: 0});
    canSend = true;
    $('.sending').removeClass('sending');

    els.each(function(index, item) {
      $(item).find('input').animate({bottom: 0}, 200 * (index + 1)*2);
      $(item).find('.input-holder-line').animate({width: '100%'}, 200 * (index + 1)*2);
    });

    var textarea = $('#write-to-us').find('.js-animate-show-textarea');
    var submit = $('#write-to-us').find('.js-animate-show-submit');
    textarea.removeClass('animated-top');
    setTimeout(function() {
      submit.removeClass('animated-top');
    }, 200);
    $('#menu').hide(200);
  }

  function restoreWritetousAnimation() {
    var textarea = $('#write-to-us').find('.js-animate-show-textarea');
    var submit = $('#write-to-us').find('.js-animate-show-submit');

    setTimeout(function() {
      textarea.addClass('animated-top');
      submit.addClass('animated-top');
    }, 500);


    $('#menu').show(200);
  }


  $(document).on('click', 'a', function(e) {
    if ($(e.target).hasClass('menu-link') && !$(e.target).hasClass('menu-link__contacts')) {
    }
  });
  
  if ($(window).width() > 1024) {
    $('.js-animate-show, .twitter-link__container').addClass('not-animated');
    $('.section-title__image:not(.no-a)').addClass('not-animated-opacity');
  }

  $('.menu-link').on('mouseenter', function() {
    
    var $prev = $('.inactive');
    

    var $el = $('#' + $(this).data('img'));
    $el.css({top: 50, opacity: 0, display: 'block'}).animate({top: 0, opacity: 1}, 300).addClass('active');
  });
  $('.menu-link').on('mouseout', function() {
    
    var $el = $('#' + $(this).data('img')).addClass('inactive').removeClass('active');
    $el.animate({top: -50, opacity: 0}, 200, function() {$(this).removeAttr('style').removeClass('inactive');})
  });
});