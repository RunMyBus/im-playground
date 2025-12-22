// Wait for jQuery to be available before executing
(function () {
  function initCustomScript() {
    // Check if jQuery is available
    if (typeof window === 'undefined' || typeof window.$ === 'undefined' || typeof window.$.fn === 'undefined') {
      // If jQuery not ready, wait and try again
      setTimeout(initCustomScript, 50);
      return;
    }

    var x = window.matchMedia("(max-width: 1151px)")

    $('.header-new-links-box > li').on('mouseover', function (e) {
      $(this).addClass('active');
      // console.log('mouseover', e);
    });

    $('.header-new-links-box > li').on('mouseout', function (e) {
      $(this).removeClass('active');
      //console.log('mouseout', e);
    });

    $('.menu-btn-box').on('click', function () {
      if (x.matches) {
        $('.side-header').css({'right': '0vw'})
      } else {
        $('.side-header').css({'right': '0vw'})
      }
    });
    $('.close-side-header').on('click', function () {
      if (x.matches) {
        $('.side-header').css({'right': '-110vw'})
      } else {
        $('.side-header').css({'right': '-110vw'})
      }
    });
    $('.main-links-box ul li span').on('click', function () {
      $('.main-links-box > ul > li > span i').not($(this).find('i')).removeClass('rotate');
      $('.main-links-box > ul > li > ul').not($(this).siblings('ul')).hide(100);
      $(this).find('i').toggleClass('rotate');
      $(this).siblings('ul').slideToggle();
    });


    //if(x.matches){

    window.onscroll = function () {
      scrollFunction2()
    };

    function scrollFunction2() {

      if (document.documentElement.scrollTop > 200) {
        $('.header-new').addClass('active');
        $('.quick-link1').css({'right': '0px'});
      } else {
        $('.header-new').removeClass('active');
        $('.quick-link1').css({'right': '-110px'});
      }
    }

// }
// else{

//   window.onscroll = function() {scrollFunction2()};
//   function scrollFunction2(){
//     //console.log(document.documentElement.scrollTop);
//   if (document.documentElement.scrollTop > 400){
//   $('.header1').addClass('active');
//   $('.right-fix-menu').css({'right':'0px'});
//   } else {
//   $('.header1').removeClass('active');
//   $('.right-fix-menu').css({'right':'-110px'});
//   }
//   }

    // }


    /**------gallery------ */
    $('.album-tab').on('click', function () {
      $('.gallery-tabs ul li').not(this).removeClass('active');
      $(this).addClass('active');
      $('.gallery-list ul').css({'display': 'none'});
      $('.album-box').css({'display': 'block'});
    })

    $('.image-tab').on('click', function () {
      $('.gallery-tabs ul li').not(this).removeClass('active');
      $(this).addClass('active');
      $('.gallery-list ul').css({'display': 'none'});
      $('.image-box').css({'display': 'block'});
    })

    $('.press-tab').on('click', function () {
      $('.gallery-tabs ul li').not(this).removeClass('active');
      $(this).addClass('active');
      $('.gallery-list ul').css({'display': 'none'});
      $('.press-box').css({'display': 'block'});
    })

    $('.video-tab').on('click', function () {
      $('.gallery-tabs ul li').not(this).removeClass('active');
      $(this).addClass('active');
      $('.gallery-list ul').css({'display': 'none'});
      $('.video-box').css({'display': 'block'});
    })

    $('.news-tab').on('click', function () {
      $('.gallery-tabs ul li').not(this).removeClass('active');
      $(this).addClass('active');
      $('.gallery-list ul').css({'display': 'none'});
      $('.news-box').css({'display': 'block'});
    })


    $('.gallery-box a').on('click', function (e) {
      e.preventDefault();
      let src = $(this).find('.gallery-img img').attr('src');
      $('.pop-cover').css({'display': 'flex'});
      $('.pop-cover .popbox img').attr('src', src);
    });

    $('.popclose').on('click', function () {
      $('.pop-cover').css({'display': 'none'});
    });
    /**------gallery------ */

    /** */
    $('.footer-slider-txt-btn').on('click', function () {
      $('.volunteer-form').css({'display': 'flex'})
    })
    $('.volunteer-form-close').on('click', function () {
      $('.volunteer-form').css({'display': 'none'})
    });

    $('.input-contact button').on('click', function () {
      setTimeout(function () {
        $('.volunteer-form').css({'display': 'none'})
      }, 2000)
    })
    /** */


    /** */
    $('.open-water-pledge').on('click', function () {
      $('.walk-for-water-popup').css({'display': 'flex'})
    })
    $('.walk-for-water-popup-close').on('click', function () {
      $('.walk-for-water-popup').css({'display': 'none'})
    });


    /** */
  }

  // Start initialization
  initCustomScript();
})();
