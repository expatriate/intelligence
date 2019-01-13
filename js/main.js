var directionSlider, productSlider, newsSlider, maxOpened = 0, menuOpened = false, portfolioOpened = false;
var resizeTimer;


// Change this to get another twtr account
//var tweeterLink = 'WorldBcs';


/*function renderteamQuadsGrid() {
  var teamQuad = $('.section-team-quad');
  var teaQuadEls = $('.section-team-quad').find('.section-team-quad-el');

  var elWidth = teamQuad.width() / 5 - 4;
  var elHeight = (window.innerHeight - window.innerHeight / 100 * 30) / 3 - 4;

  if (window.innerWidth < 960 && window.innerWidth > 720) {
    elWidth = teamQuad.width() / 5 - 4;
    elHeight = (window.innerHeight - (window.innerHeight / 100) * 60) / 3 - 4;
  }
  if (window.innerWidth < 720) {
    var temp = teamQuad.find('.section__wrapper');
    elWidth = temp.width() - 50;
    elHeight = (window.innerHeight - (window.innerHeight / 100) * 35) / 3 - 4;
    var block = '';
    var count = 0;
    for(var i = 0; i < teaQuadEls.length / 3; i++) {
      block += '<div class="horizontal-scrolling">';
      for (var j = 0; j < 3; j++) {
        if ($(teaQuadEls[count]).hasClass('clear')) {
          block += '<div class="section-team-quad-el clear">' + $(teaQuadEls[count]).html() + '</div>';
        } else {
          block += '<div class="section-team-quad-el">' + $(teaQuadEls[count]).html() + '</div>';
        }
        count++;
      }
      block += '</div>';
    }
    teamQuad.find('.section__wrapper').empty().html(block);
    elWidth = '50%';
    teaQuadEls = $('.section-team-quad').find('.section-team-quad-el');
  }
  teaQuadEls.each(function(index, item) {
    $(item).css({'width': elWidth, 'height': elHeight})
  });
}*/


$(document).ready(function() {

  /*if (window.innerWidth < 720) {
    renderteamQuadsGrid();
  }*/

  $('#fullpage').fullpage({
    //menu: '#menu',
    keyboardScrolling: false,
    fixedElements: '#header, #footer, .mail, .share, .follower',
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors:['main', 'design', 'coding', 'digital', 'consulting', 'animation',],
    recordHistory: false,
    scrollHorizontally: false,
    //slideSelector: '.horizontal-scrolling',

    onLeave: function(origin, destination, direction) {

      var idx = Math.abs(origin - destination)*.1;
      $.fn.fullpage.setScrollingSpeed(idx*700);


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

      /*

      animateBlock(destination.item);


      if (destination.index == 1) {
        if (maxOpened < 1) {
          maxOpened = 1;
        }
      }

      // Tweets section
      if (destination.index == 2) {
        if (maxOpened < 2) {
          //newsSlider.autoplay.start();
          maxOpened = 2;
        }
      }

      // Product section
      if (destination.index == 3) {
        if (maxOpened < 3) {
          if (productSlider) {
            productSlider.autoplay.start();
          }
          maxOpened = 3;
        }
      }

      // Directions section
      if (destination.index == 4) {

        if (maxOpened < 4) {
          if (directionSlider) {
            directionSlider.autoplay.start();
          }
          maxOpened = 4;
        }
      }

      // Red/Grey section
      
      if (destination.index == 5) {
        if (maxOpened < 5) {
          startTeamAnimation();
          maxOpened = 5;
        }
      }

      // Team section
      
      if (destination.index == 6) {
        if (maxOpened < 6) {
          startTeamQuadAnimation();
          maxOpened = 6;
        }
      }


      // Disable scroll on last slide
      if (destination.isLast) {
        $.fn.fullpage.setAllowScrolling(false);
        $('.mouse').hide();
      }*/
    },
    afterRender: function(){
      /*if (window.innerWidth > 720) {
        //renderteamQuadsGrid();
      }*/
    }
  });

  // Disable default scrolling
  $.fn.fullpage.setMouseWheelScrolling(false);
  $.fn.fullpage.setAllowScrolling(false);

  /*var customHeight = $(window).height();
  var windowWidth = $(window).width();

  if (windowWidth < customHeight) {
    customHeight = windowWidth;
  }

  $('#stage').css({width: customHeight, height: customHeight});*/

  objectFit.polyfill({
    selector: 'video', // this can be any CSS selector
    fittype: 'cover', // either contain, cover, fill or none
    disableCrossDomain: 'true' // either 'true' or 'false' to not parse external CSS files.
  });

  /*var configList = {
    "profile": {"screenName": tweeterLink},
    "domId": 'section-news__slider',
    "maxTweets": 10,
    "enableLinks": true,
    "showInteraction": false,
    "showUser": true,
    "showTime": true,
    "showImages": true,
    "lang": 'en'
  };
  twitterFetcher.fetch(configList);
  
  $('#section-news__slider').on('twitterparsed', function() {
    newsSlider = new Swiper('#section-news__slider', {
        speed: 400,
        spaceBetween: 100,
        slidesPerView: 3,
        grabCursor: false,
        allowTouchMove: true,
        navigation: {
          nextEl: '.swiper-button-next_news',
          prevEl: '.swiper-button-prev_news',
        },
        breakpoints: {
          1200: {
            spaceBetween: 40
          },
          1400: {
            spaceBetween: 40
          },
          720: {
            slidesPerView: 1,
          }
        },
        on: {
          init: function() {
            for(var i = 0; i < 3; i++) {
              if (this.slides[i]) {
                $(this.slides[i]).find('.news-slide__user').addClass('js-animate-show not-animated');
                $(this.slides[i]).find('.news-slide__tweet').addClass('js-animate-show not-animated');
                $(this.slides[i]).find('.news-slide__media').addClass('not-animated-opacity');
              }
            }
            var self = this;
            $('#section-news__slider').one('news-animation', function() {
              self.allowTouchMove = false;
              self.allowSlideNext = false;
              self.unsetGrabCursor();
              
              setTimeout(function() {
                self.allowTouchMove = true;
                self.allowSlideNext = true;
                self.setGrabCursor();
              }, 4000);
            });

            if (this.slides.length <= 3) {
              $('.section-news__nav-wrapper').hide();
            }
          }
        }
    });

    newsSlider.autoplay.stop();
  });*/

  /*productSlider = new Swiper('#section-product__slider', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 3,
      grabCursor: false,
      allowTouchMove: true,
      navigation: {
        nextEl: '.swiper-button-next_product',
        prevEl: '.swiper-button-prev_product',
      },
      autoplay: {
        delay: 10000,
        stopOnLastSlide: true
      },
      breakpoints: {
        1200: {
          spaceBetween: 40
        },
        1400: {
          spaceBetween: 40
        },
        720: {
          slidesPerView: 1,
        }
      },
      on: {
        init: function() {
          for(var i = 0; i < 3; i++) {
            if (this.slides[i]) {
              $(this.slides[i]).find('.product-slide__text').addClass('js-animate-show not-animated');
              $(this.slides[i]).find('.product-slide__title').addClass('js-animate-show not-animated');
              $(this.slides[i]).find('.product-slide__image').addClass('not-animated-opacity');
            }
          }
          var self = this;
          $('#section-product__slider').one('product-animation', function() {
            self.allowTouchMove = false;
            self.allowSlideNext = false;
            self.unsetGrabCursor();
            
            setTimeout(function() {
              self.allowTouchMove = true;
              self.allowSlideNext = true;
              self.setGrabCursor();
            }, 4000);
          });
          if (this.slides.length <= 3) {
            $('.section-product__nav-wrapper').hide();
          }
        }
      }
  });

  productSlider.autoplay.stop();

  directionSlider = new Swiper('#section-direction__slider', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 1,
      grabCursor: false,
      autoplay: {
        delay: 10000,
        stopOnLastSlide: true
      },
      on: {
        init: function () {
          var paginationContainer = $('#section-direction__slider').find('.swiper-pagination');
          paginationContainer.append('<div class="swiper-pagination-line"></div><div class="swiper-pagination-underline"></div>');
          var pc = 100 / (this.slides.length - 1);
          for(var i = 0; i < this.slides.length; i++) {
            var percent = i * pc;
            percent = percent < 100 ? percent : 99.5;
            paginationContainer.append('<div class="pagination-point" data-slide="' + i + '" style="left:' + percent + '%"></div>')
          }
          $('.pagination-point').on('click', function() {
            disableAutoplay();
            directionSlider.slideTo($(this).data('slide'));
          });
          for(var i = 0; i < 3; i++) {
            if (this.slides[i]) {
              $(this.slides[i]).find('.direction-slide__text').addClass('js-animate-show not-animated');
              $(this.slides[i]).find('.direction-slide__title').addClass('js-animate-show not-animated');
              $(this.slides[i]).find('.direction-slide__image').addClass('not-animated-opacity');
            }
          }
          var self = this;
          $('#section-direction__slider').one('direction-animation', function() {
            self.allowTouchMove = false;
            self.allowSlideNext = false;
            self.unsetGrabCursor();
            
            setTimeout(function() {
              self.allowTouchMove = true;
              self.allowSlideNext = true;
              self.setGrabCursor();
            }, 3000);
          });
        },
        autoplay: function () {
          var pc = 100 / (this.slides.length -1);
          var percent = (this.activeIndex + 1) * pc;
          percent = percent > 100 ? 100 : percent;
          var line = $('#section-direction__slider').find('.swiper-pagination-line');
          line.animate({width: percent + '%'}, 10000);
        },
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'custom',
      }
  });

  function disableAutoplay() {
    var line1 = $('#section-direction__slider').find('.swiper-pagination-line');
    line1.finish();
    directionSlider.off('sliderMove');

    directionSlider.off('slideChange').on('slideChange', function() {
      var pc = 100 / (this.slides.length -1);
      var percent = this.activeIndex * pc;
      percent = percent > 100 ? 100 : percent;
      var line = $('#section-direction__slider').find('.swiper-pagination-line');
      line.animate({width: percent + '%'}, 200);
    });
    directionSlider.autoplay.stop();
  }

  directionSlider.autoplay.stop();

  directionSlider.on('autoplayStart', function() {
    var pc = 100 / (this.slides.length -1);
    var percent = (this.activeIndex + 1) * pc + '%';
    var line = $('#section-direction__slider').find('.swiper-pagination-line');
    line.animate({width: percent}, 10000);
  });

  directionSlider.on('sliderMove', function() {
    disableAutoplay();
  });*/


  $('.mail').on('click', function() {
    $('.mail-hidden').css({display:'block'}).animate({opacity: 1}, 200);
    $.fn.fullpage.setAllowScrolling(false);
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
    }
  });

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

  $('.menu-hidden__items').on('click', function() {
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

  /*function startTeamAnimation() {
    if (!$('#section-team-red').hasClass('animation-finished')) {
      $('#section-team-red').animate({ opacity: 1}, 1500, 
        function() {
          $('#section-team-red').find('[style]').each(function(index, item) {
            $(item).animate({opacity:1}, 800 * (index + 1) + 500);
          });

          $('#section-team-black').delay(2000).animate({opacity: 1}, 1500, function() {
            $('#section-team-black').find('[style]').each(function(index1, item1) {
              $(item1).animate({opacity:1}, 800 * (index1 + 1) + 500);
            });
          });
          $('#section-team-red').addClass('animation-finished');
        }
      )
    }
  }

  function startTeamQuadAnimation() {

  }*/

  function startMenuAnimation() {
    $('#header').css({opacity: 0.4, 'pointer-events': 'none'});
    $('#footer').css({opacity: 0.4, 'pointer-events': 'none'});
  }

  function restoreMenuAnimation() {
    $('#header').removeAttr('style');
    $('#footer').removeAttr('style');

    if ($.fn.fullpage.getActiveSection().index !== 7) {
      $.fn.fullpage.setAllowScrolling(true);
    }
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

    if ($.fn.fullpage.getActiveSection().index !== 7) {
      $.fn.fullpage.setAllowScrolling(true);
    }

    $('#menu').show(200);
  }


  $(document).on('click', 'a', function(e) {
    if ($(e.target).hasClass('menu-link') && !$(e.target).hasClass('menu-link__contacts')) {

      /*setTimeout(function() {
        if ($.fn.fullpage.getActiveSection().index !== 7) {
          $.fn.fullpage.setAllowScrolling(true);
          $('.mouse').show();
        }
      }, 500)*/
    }

    if ($(e.target).parent().hasClass('go-to-main')) {
      $.fn.fullpage.setAllowScrolling(true);
      $('.mouse').show();
    }
  });
  
  if ($(window).width() > 1024) {
    //stickyElements('.menu-hidden__close, .mail-hidden__close, .menu, .mail, .share', {stickiness: 5});
    $('.js-animate-show, .twitter-link__container').addClass('not-animated');
    $('.section-title__image:not(.no-a)').addClass('not-animated-opacity');

    /*$(window).on('mouseover', mouseOver);
    $(window).on('mouseout', mouseOut);
    $(window).on('mousemove', moveCursor);*/
  }

  //init();

  //methods
  //$.fn.fullpage.setAllowScrolling(false);
});

/*var $cursor = $('.follower');
var isEdEgde = Swiper.browser.isIE || Swiper.browser.isEdge ? true : false;
if (isEdEgde) {
  $('html').addClass('is-ie is-edge');
}
var topoffset;
function moveCursor(e) {
  TweenLite.to($cursor, 0.23, {
    left: e.pageX,
    top: e.pageY,
    ease: Power4.easOut
  });
}
function mouseOver(e) {
  if ($(e.target).hasClass('hoverable')) {
    $cursor.addClass('is-hidden');
  }
}
function mouseOut(e) {
  if ($(e.target).hasClass('hoverable')) {
    if (!$(e.target).parents('svg').length && !$(e.relatedTarget).parents('svg').length) {
      $cursor.removeClass('is-hidden');
    }
  }
}*/


/*
function onMouseMove( event ) {
  mouse.x = ( ( event.clientX - webGLRenderer.domElement.offsetLeft ) / webGLRenderer.domElement.width ) * 2 - 1;
  mouse.y = - ( ( event.clientY - webGLRenderer.domElement.offsetTop ) / webGLRenderer.domElement.height ) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  intersects = raycaster.intersectObject( mesh );

  raycaster.setFromCamera( mouse, camera );
  if ( intersects.length > 0 ) {
    intersectionPt.vertices[0] = intersects[0].point;
    intersectionPt.verticesNeedUpdate = true;
    
  }
}

function onMouseDown( event ) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;   

}
function onWindowResize() {
}*/