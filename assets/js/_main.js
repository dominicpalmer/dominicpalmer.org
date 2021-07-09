/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(function () {
  var $btn = $("nav.greedy-nav .greedy-nav__toggle");
  var $vlinks = $("nav.greedy-nav .visible-links");
  var $hlinks = $("nav.greedy-nav .hidden-links");
  var $logoImg = $("nav.greedy-nav .site-logo img");

  function updateNav() {
    var winWidth = $(window).width();

    if (winWidth <= 654) {
      $vlinks.children().prependTo($hlinks);
      $btn.removeClass("hidden");
    } else {
      $hlinks.children().appendTo($vlinks);
      $btn.addClass("hidden");
      $hlinks.addClass("hidden");
    }

    var navHandle = document.getElementsByClassName("greedy-nav__toggle")[0];
    if (navHandle.classList.contains("close")) {
      $hlinks.removeClass("hidden");
    }
  }

  if ($logoImg.length !== 0) {
    if (!($logoImg[0].complete || $logoImg[0].naturalWidth !== 0)) {
      $logoImg.one("load error", updateNav);
    } else updateNav();
  } else updateNav();

  $(window).resize(function () {
    updateNav();
  });

  var timer;
  $btn.on("click", function (ev) {
    $hlinks.toggleClass("hidden");
    $(this).toggleClass("close");
    clearTimeout(timer);

    // Prevent propagation to the site wide dropdown close click event
    ev.stopPropagation();
  });
});

$(document).ready(function () {
  // FitVids init
  $("#main").fitVids();

  // Sticky sidebar
  var stickySideBar = function () {
    var show =
      $(".author__urls-wrapper button").length === 0
        ? $(window).width() > 1024 // width should match $large Sass variable
        : !$(".author__urls-wrapper button").is(":visible");
    if (show) {
      // fix
      $(".sidebar").addClass("sticky");
      $(".author__urls").removeClass("is--visible");
      $(".author__urls-wrapper button").removeClass("open");
    } else {
      // unfix
      $(".sidebar").removeClass("sticky");
    }
  };

  stickySideBar();

  $(window).resize(function () {
    stickySideBar();
  });

  // Profile menu dropdown
  $(".author__urls-wrapper button").on("click", function (ev) {
    // Prevent propagation to the site wide dropdown close click event
    ev.stopPropagation();

    // Toggle the dropdown status
    $(".author__urls").toggleClass("is--visible");
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Close search screen with Esc key
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      if ($(".initial-content").hasClass("is--hidden")) {
        $(".search-content").toggleClass("is--visible");
        $(".initial-content").toggleClass("is--hidden");
      }
    }
  });

  // Search toggle
  $(".search__toggle").on("click", function () {
    $(".search-content").toggleClass("is--visible");
    $(".initial-content").toggleClass("is--hidden");
    // set focus on input
    setTimeout(function () {
      $(".search-content input").focus();
    }, 400);
  });

  // Smooth scrolling
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 20,
    speed: 400,
    speedAsDuration: true,
    durationMax: 500,
  });

  // Gumshoe scroll spy init
  if ($("nav.toc").length > 0) {
    var spy = new Gumshoe("nav.toc a", {
      // Active classes
      navClass: "active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "active", // applied to the parent items

      // Offset & reflow
      offset: 20, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true, // if true, emit custom events
    });
  }

  // add lightbox class to all image links
  $(
    "a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.webp']"
  ).addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    // disableOn: function() {
    //   if( $(window).width() < 500 ) {
    //     return false;
    //   }
    //   return true;
    // },
    type: "image",
    tLoading: "Loading image #%curr%...",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 500, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: "mfp-zoom-in",
    callbacks: {
      beforeOpen: function () {
        // just a hack that adds mfp-anim class to markup
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure mfp-with-anim"
        );
      },
    },
    closeOnContentClick: true,
    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });

  // Add anchors for headings
  $(".page__content")
    .find("h1, h2, h3, h4, h5, h6")
    .each(function () {
      var id = $(this).attr("id");
      if (id) {
        var anchor = document.createElement("a");
        anchor.className = "header-link";
        anchor.href = "#" + id;
        anchor.innerHTML =
          '<span class="sr-only">Permalink</span><i class="fas fa-link"></i>';
        anchor.title = "Permalink";
        $(this).append(anchor);
      }
    });

  // Close all open dropdowns when clicking elsewhere on the page
  $(".js").on("click", function (ev) {
    // Prevent propagation to existing button click events
    ev.stopPropagation();

    // Nav dropdown close
    var $navButton = $("nav.greedy-nav .greedy-nav__toggle");
    var $navDropdown = $("nav.greedy-nav .hidden-links");
    var navHandle = document.getElementsByClassName("greedy-nav__toggle")[0];
    if (navHandle.classList.contains("close")) {
      $navButton.removeClass("close");
      $navDropdown.addClass("hidden");
    }

    // Profile dropdown close
    var $profileButton = $(".btn--inverse");
    var $profileDropdown = $(".author__urls");
    var profileHandle = document.getElementsByClassName("btn--inverse")[0];
    if (profileHandle.classList.contains("open")) {
      $profileButton.removeClass("open");
      $profileButton.attr("style", "border-color: none;");
      $profileDropdown.removeClass("is--visible");
    }
  });
});

function toggleTheme() {
  if (light_theme.getAttribute("rel") == "stylesheet") {
    dark_theme.setAttribute("rel", "stylesheet");
    light_theme.setAttribute("rel", "stylesheet alternate");
    localStorage.setItem("theme", "dark");
  } else {
    dark_theme.setAttribute("rel", "stylesheet");
    light_theme.setAttribute("rel", "stylesheet");
    dark_theme.setAttribute("rel", "stylesheet alternate");
    localStorage.setItem("theme", "light");
  }

  return false;
}
