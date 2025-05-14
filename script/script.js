var audioPlaying        = false;
var currentMediaSource  = null;
var currentMediaHolder  = null;
var currentPlayingTitle = "";
var currentIsVideo      = false;
var headerLoaded        = false;
var bgImageLoaded       = false;

function setVisibleBlock(item, visible) {
  if (visible) {
    item.removeClass('tab-hidden');
    item.addClass('tab-visible-block');
  }
  else {
    item.removeClass('tab-visible-block');
    item.addClass('tab-hidden');
  }
}

function setVisible(item, visible) {
  if (visible) {
    item.removeClass('tab-hidden');
    item.addClass('tab-visible');
  }
  else {
    item.removeClass('tab-visible');
    item.addClass('tab-hidden');
  }
}

function setHomeView() {
  setPageHash("home");
  setVisible($('.contact-main'), false);
  setVisible($('.bio-main'), false);
  setVisible($('.multimedia-main'), false);
  setVisibleBlock($('.players-wrapper-main'), false);
  setVisible($('.performances-main'), false);
  setVisible($('.home-main'), true);
  ShowFooter();
}

function setContactView() {
  setPageHash("contact");
  // setVisible($('.home-main'), false);
  setVisible($('.bio-main'), false);
  setVisible($('.multimedia-main'), false);
  setVisibleBlock($('.players-wrapper-main'), false);
  setVisible($('.performances-main'), false);
  setVisible($('.contact-main'), true);
  ShowFooter();
}

function SetBioView() {
  setPageHash("bio");
  // setVisible($('.home-main'), false);
  setVisible($('.multimedia-main'), false);
  setVisibleBlock($('.players-wrapper-main'), false);
  setVisible($('.contact-main'), false);
  setVisible($('.performances-main'), false);
  setVisible($('.bio-main'), true);
  $('.footer').hide();
}

function setAudioView() {
  setPageHash("audio");
  setVisible($('.bio-main'), false);
  setVisible($('.multimedia-main'), false);
  setVisible($('.contact-main'), false);
  setVisible($('.performances-main'), false);
  setVisibleBlock($('.players-wrapper-main'), true);
  $('.footer').hide();
}

function setMultimediaView() {
  setPageHash("multimedia");
  setVisible($('.bio-main'), false);
  setVisible($('.contact-main'), false);
  setVisibleBlock($('.players-wrapper-main'), false);
  setVisible($('.performances-main'), false);
  setVisible($('.multimedia-main'), true);
  $('.footer').hide();
}

function setPerformancesView() {
  setPageHash("performances");
  setVisible($('.bio-main'), false);
  setVisible($('.multimedia-main'), false);
  setVisible($('.contact-main'), false);
  setVisibleBlock($('.players-wrapper-main'), false);
  setVisible($('.performances-main'), true);
  $('.footer').hide();
}

function closeSideNav() {
  var overlay = $('.header-overlay-buttons');
  if (overlay.hasClass('menu-hidden')) { return; }
  var ham = $('.header-ham-wrap');
  overlay.removeClass('menu-visible');
  overlay.addClass('menu-hidden');
  ham.removeClass('ham-open');
  ham.addClass('ham-closed');
}

$('.home-btn, .mobile-home-btn').on('click', function(){
  closeSideNav();
  setHomeView();
});

$('.contact-btn, .mobile-contact-btn').on('click', function(){
  closeSideNav();
  setContactView();
});

$('.bio-btn, .mobile-bio-btn').on('click', function(){
  closeSideNav();
  SetBioView();
});

$('.audio-btn, .mobile-audio-btn').on('click', function() {
  closeSideNav();
  setAudioView();
});

$('.performances-btn, .mobile-performances-btn').on('click', function() {
  closeSideNav();
  setPerformancesView();
});

$('.multimedia-btn, .mobile-multimedia-btn').on('click', function(){
  closeSideNav();
  setMultimediaView();
  reSizeVideoControls();
});

$('.left-author').on('click', function(){
  setHomeView();
});

$('.left-author.sub-author').on('click', function(){
  setHomeView();
});

function ShowFooter() {
  if (currentMediaSource == null) {
    return;
  }
  $('.footer').show();
}


function playMedia(source, play, title) {
  audioPlaying = play;
  SetCurrentlyPlaying(source, play, title)
  if (play) {
    try {
      source.play();
    }
    catch (err) {
      console.log("Failed to play: " + err.message);
    }
  } else {
    try {
      source.pause();
    }
    catch (err) {
      console.log("Failed to pause: " + err.message);
    }
  }
}

function SetCurrentlyPlaying(source, play, title) {
  currentPlayingTitle = title;

  var footerTitle = $('.footer').find('#footer-title')[0];
  var footerPlayBtn = $('.footer').find('.footer-play-btn')[0];

  footerTitle.innerHTML = title;
}


$('.multimedia-main video').on('click', function() {
  var buttons = $(this).siblings('.v-controls').find('.v-buttons');
  buttons.trigger('click');
  // ToggleVideoPlay(buttons);
  //
  // var video = $(this)[0];
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
});

$('.v-player-main').find('.v-fullscreen-btn').on('click', function() {
  var controls = $(this).parent();
  // var controls = info.parent();
  var source = controls.siblings().get(0);
  if (source.requestFullscreen) {
      source.requestFullscreen();
  } else if (source.mozRequestFullScreen) {
    source.mozRequestFullScreen();
  } else if (source.webkitRequestFullscreen) {
    source.webkitRequestFullscreen();
  } else if (source.msRequestFullscreen) {
    source.msRequestFullscreen();
  }
});

function ToggleVideoPlay(sourceElem) {
  // var buttons = $('.v-player-main').find('.v-buttons');
  var controls = sourceElem.parent();
  var source = controls.siblings().get(0);
  var title = controls.find('#v-info-title')[0].innerHTML;
  // console.log(title);
  if($(sourceElem).hasClass('v-buttons-playing')) {
    $(sourceElem).removeClass('v-buttons-playing');
    $(sourceElem).addClass('v-buttons-paused');
    SetFooterPlay(false);
    playMedia(source, false, title);
  }
  else
  {
    PauseCurrentMedia();
    $(sourceElem).removeClass('v-buttons-paused');
    $(sourceElem).addClass('v-buttons-playing');
    if (source.currentTime <= 0) {
      source.currentTime = 0.05;
    }
    currentMediaSource = source;
    currentMediaHolder = sourceElem;
    SetFooterPlay(true);
    playMedia(source, true, title);
    currentIsVideo = true;
  }
};

$('.v-player-main').find('.v-buttons').on('click', function() {
  // console.log('play');
  // console.log(this);
  ToggleVideoPlay($(this));
  // var controls = $(this).parent();
  // var source = controls.siblings().get(0);
  // var title = controls.find('#v-info-title')[0].innerHTML;
  // console.log(title);
  // if($(this).hasClass('v-buttons-playing')) {
  //   $(this).removeClass('v-buttons-playing');
  //   $(this).addClass('v-buttons-paused');
  //   SetFooterPlay(false);
  //   playMedia(source, false, title);
  // }
  // else
  // {
  //   PauseCurrentMedia();
  //   $(this).removeClass('v-buttons-paused');
  //   $(this).addClass('v-buttons-playing');
  //   if (source.currentTime <= 0) {
  //     source.currentTime = 0.05;
  //   }
  //   currentMediaSource = source;
  //   currentMediaHolder = $(this);
  //   SetFooterPlay(true);
  //   playMedia(source, true, title);
  //   currentIsVideo = true;
  // }
});

$('.footer').find('.play-btn-area').on('click', function() {
  if ($(this).hasClass('footer-play-btn-playing')) {
    SetFooterPlay(false);
  }
  else {
    SetFooterPlay(true);
  }
})

$('.footer').find('.text-area').on('click', function() {
  if (currentIsVideo) {
    setMultimediaView();
  }
  else {
    setAudioView();
  }
})

function SetFooterPlay(play) {
  var playBtn = $('.footer').find('.play-btn-area')[0];
  if (play) {
    $(playBtn).removeClass('footer-play-btn-paused');
    $(playBtn).addClass('footer-play-btn-playing');
    PlayCurrentMedia();
  }
  else {
    $(playBtn).removeClass('footer-play-btn-playing');
    $(playBtn).addClass('footer-play-btn-paused');
    PauseCurrentMedia();
  }
}

function PauseCurrentMedia() {
  if (currentMediaHolder == null) {
    return;
  }
  var className = 'play-btn';
  if (currentIsVideo) {
    className = 'v-buttons';
  }
  currentMediaHolder.removeClass(className + '-playing');
  currentMediaHolder.addClass(className + '-paused');
  playMedia(currentMediaSource, false, currentPlayingTitle);
}

function PlayCurrentMedia() {
  if (currentMediaHolder == null) {
    return;
  }
  var className = 'play-btn';
  if (currentIsVideo) {
    className = 'v-buttons';
  }
  currentMediaHolder.removeClass(className + '-paused');
  currentMediaHolder.addClass(className + '-playing');
  playMedia(currentMediaSource, true, currentPlayingTitle);
}

$('.player-main').find('.audio-wrapper').on('click', function() {
  var source = $(this).find('audio').get(0);
  var title = $(this).siblings('.info-section').find('#info-title')[0].innerHTML;
  // if($(this).hasClass('play-btn-loading')) {
  //   source.currentTime = 0;
  // }
  var parsedTitle = title.replace(/\s+/g, '-').toLowerCase();
  // parsedTitle = parsedTitle.replace(/[^\x00-\x7F]/g, "");
  parsedTitle = parsedTitle.replace(/,/g , '');
  parsedTitle = parsedTitle.replace(/\./g,'')
  parsedTitle = parsedTitle.replace(/ä/g , 'a');
  parsedTitle = parsedTitle.replace(/õ/g , 'o');
  parsedTitle = parsedTitle.replace(/ö/g , 'o');
  parsedTitle = parsedTitle.replace(/ü/g , 'u');
  location.hash = "audio/" + parsedTitle;

  if($(this).hasClass('play-btn-playing')) {
    $(this).removeClass('play-btn-playing');
    $(this).addClass('play-btn-paused');
    SetFooterPlay(false);
    playMedia(source, false, title);
  }
  else if($(this).hasClass('play-btn-paused'))
  {
    PauseCurrentMedia();
    $(this).removeClass('play-btn-paused');
    $(this).addClass('play-btn-playing');
    if (source.currentTime <= 0) {
      source.currentTime = 0.05;
    }
    currentMediaSource = source;
    currentMediaHolder = $(this);
    SetFooterPlay(true);
    playMedia(source, true, title);
    currentIsVideo = false;
  }
});

function setPlayPosition(relX, width, source) {
  var percent = clickPosToPercent(relX, width);
  var duration = source.duration;
  source.currentTime = percent / 100 * duration;
}

function setVideoPlayPosition(relX, width, source) {
  var percent = clickPosToPercent(relX, width);
  // percent = 98
  var duration = source.duration;
  source.currentTime = percent / 100 * duration;
  // source.currentTime = 0.98 * duration;
  var controls = $(source).siblings('.v-controls');
  var distance = controls.find('.v-distance-indicator');
  var fullWidthElem = controls.find('.v-distance-full');
  // console.log(duration, source.currentTime)
  var maxWidth = fullWidthElem.width();
  distance.css('width', percent / 100 * maxWidth);
}

$('.player-main').find('.info-section').on('click', function(e) {
  var width = $(this).width();
  var relX = e.pageX - $(this).offset().left;
  var audio = $(this).siblings().find('audio').get(0);
  setPlayPosition(relX, width, audio);
});

$('.player-main').find('.distance-indicator').on('click', function(e) {
  var info = $(this).siblings('.info-section');
  var audio = $(this).siblings().find('audio').get(0);
  var width = info.width();
  var relX = e.pageX - info.offset().left;
  setPlayPosition(relX, width, audio);
});

$('.player-main').find('.buffer-indicator').on('click', function(e) {
  var info = $(this).siblings('.info-section');
  var audio = $(this).siblings().find('audio').get(0);
  var width = info.width();
  var relX = e.pageX - info.offset().left;
  setPlayPosition(relX, width, audio);
});

$('.v-player-main').find('.v-info-section').on('click', function(e) {
  var width = $(this).width();
  var relX = e.pageX - $(this).offset().left;
  var video = $(this).parent().siblings('video').get(0);
  setVideoPlayPosition(relX, width, video);
});

function timeConvert(inputTime) {
  var convertedTime = "";
  if (inputTime < 60) {
    convertedTime = "00:";
    if (inputTime < 10) { convertedTime += "0"; }
    convertedTime += inputTime;
  } else {
    var minutes = Math.floor(inputTime / 60);
    var seconds = (inputTime - minutes * 60);

    if (minutes < 10) { convertedTime += "0"; }
    convertedTime += minutes + ":";

    if (seconds < 10) { convertedTime += "0" }
    convertedTime += seconds;
  }
  return convertedTime
}

function timeToPercent(current, end) {
  return current / end * 100;
}

function clickPosToPercent(current, end) {
  return current / end * 100;
}

function removeLoading(source) {
  if (source.hasClass('play-btn-loading')) {
    source.removeClass('play-btn-loading');
    source.addClass('play-btn-paused');
  }
}

function addTimeSpans(source) {
  source.html('<p> <span>--:--</span><span> / </span><span>--:--</span> </p>')
}

function checkIE() {
  // IE <= 10
  var ieVersion = (function() { if (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) { return parseFloat( RegExp.$1 ); } else { return false; } })();
  // IE 11
  var isIE = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
  return (ieVersion || isIE) ? true : false;
}

// function loadDescription(textDiv, title) {
  // $.ajax({
  //     url : "text/" + title + ".txt",
  //     dataType: "text",
  //     success : function (result) {
  //       textDiv.innerHTML = "<p>" + result + "</p>";
  //     }
  // });
// }

// $(window).on('load', function () {
//   // $('.status').fadeOut(); // will first fade out the loading animation
//   $('.preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
// })

// window.addEventListener('resize', function(event) {
//   //reSizeVideoControls();
// });

var bgVideo = $('.home-video').find('video');

// window.addEventListener('mousemove', function(event) {
//   var midpointX = $(window).width() - 250 - event.pageX;
//   var midpointY = event.pageY - 40;
//   var elems = $('.header-nav').find('.ghost-nav');
//   setTimeout(function() {
//
//     elems.each(function() {
//       // $(this).animate({
//       //   left: midpointX*0.01 + 5
//       // }, 100);
//       // setTimeout(function() {
//       //   $(this).css('left', midpointX*0.01 + 5)
//       // }, 1);
//       $(this).css('left', midpointX*0.01 + 5)
//       $(this).css('top', 10 - midpointY*0.015 - 2)
//     });
//   }, 100);
// });

function reSizeVideoControls() {
  $('video').each(function() {
    var source = $(this).get(0);
    var controls = $(this).siblings('.v-controls');
    if ($(this).width() > 0) {
      if ($(this).width() > $(window).width()) {
          controls.width($(window).width());
      } else {
        controls.width($(this).width());
      }
    };
  });
}

// function parseAddress() {
//   var url = window.location.href;
//   if (!url.includes("#")) {
//     return;
//   }
//   var sub = url.split('#')[1];
//   if (sub.length < 2) {
//     return;
//   }
//
//   switch (sub) {
//     case "audio":
//       setAudioView();
//       break;
//     default:
//       console.log('def');
//       break;
//   }
//   console.log(url, sub);
// }
function parseAddress() {
  var hash = location.hash;

  // console.log(hash);

  if (hash == '') {
    return;
  }

  switch (hash) {
    case "#home":
      setHomeView();
      break;
    case "#bio":
      SetBioView();
      break;
    case "#audio":
      setAudioView();
      break;
    case "#multimedia":
      setMultimediaView();
      break;
    case "#performances":
      setPerformancesView();
      break;
    case "#contact":
      setContactView();
      break;
    default:
      if (~hash.indexOf("#audio") && ~hash.indexOf("/")) {
        var songName = hash.split("/")[1];
        setAudioOpacity(0.2, songName);
        setSongPlaying(songName);
      }
      break;
  }
}

function setSongPlaying(song) {
  setAudioView();
  $('.players-wrapper-main').scrollTop(0).scrollTop($('#' + song).position().top);
}

function setAudioOpacity(value, exception) {
  var wrapper = $('.players-wrapper-main');
  if (exception != 'none') {
    wrapper.addClass('transparent');
  }
  var sections = wrapper.find('.player-section');
  sections.each(function() {
    var section = $(this);
    var id = section.get(0).id;
    if (id != exception && !section.hasClass('linked')) {
      section.fadeTo( "slow" , value, function() {
    // Animation complete.
      });
      // section.css('opacity', value);
    } else {
      section.addClass('linked');
    }
  });
}

$('.players-wrapper-main').find('.player-section').on('click', function(event) {
  event.stopPropagation();

  var wrapper = $('.players-wrapper-main');
  if (!wrapper.hasClass('transparent')){
    return;
  }

  if ($(this).hasClass('linked')) {
    $(this).css('opacity', 1);
    return;
  }

  setAudioOpacity(1, 'none');
})

$('.players-wrapper-main').on('click', function(event) {
  if ($(this).hasClass('transparent')) {
    setAudioOpacity(1, 'none');
    $(this).removeClass('transparent');
  }
})

// $('.player-main').find('.audio-wrapper').on('click', function() {
//   var source = $(this).find('audio').get(0);
//   var title = $(this).siblings('.info-section').find('#info-title')[0].innerHTML;
//
//   if($(this).hasClass('play-btn-playing')) {
//     $(this).removeClass('play-btn-playing');
//     $(this).addClass('play-btn-paused');
//     SetFooterPlay(false);
//     playMedia(source, false, title);
//   }

// var wavesurfer = WaveSurfer.create({
//   container: '#waveform',
//   waveColor: 'violet',
//   progressColor: 'purple'
// });

//set up hash detection
// $(window).bind( 'hashchange', function(e) {
//  parseAddress(e)
// });
//
// $(window).trigger( 'hashchange' );

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setPageHash(hash) {
  var subTitle = capitalizeFirstLetter(hash);
  location.hash = "#" + hash;
  if (hash == "home") {
    document.title = "Johanna Kivimägi";
  } else {
    document.title = "Johanna Kivimägi | " + subTitle;
  }
}


$(document).ready(function(){
  parseAddress();

  $('.footer').hide();

  var isIE = checkIE();

  var homeVideo = $('.home-video video').get(0);
  homeVideo.playbackRate = 0.9;
  $('.preloader').delay(350).fadeOut('slow');

  $('.multimedia-main video').each(function() {
    var source = $(this).get(0);
    var controls = $(this).siblings('.v-controls');
    var section = $(this).parent().parent();
    var endDuration = 0.0;
    var fullWidthElem = controls.find('.v-distance-full');
    var distance = controls.find('.v-distance-indicator');
    var buttons = $('.v-player-main').find('.v-buttons');

    // var info = parent.siblings('.info-section');
    var infoTime = controls.find('.v-info-time');
    addTimeSpans(infoTime);
    var time = infoTime.find('p').children();


    function setVideoMetaData() {
      var dur = source.duration;
      var endTime = timeConvert(Math.round(source.duration));
      endDuration = dur;

      time.eq(0).html("00:00");
      time.eq(2).html(endTime);
    }

    source.addEventListener('loadedmetadata', function() {
      setVideoMetaData();
    });

    if (source.readyState >= 2) {
      setVideoMetaData();
    }

    source.addEventListener("timeupdate",function(){
      var current = source.currentTime;
      var roundTime = Math.round(current);
      var convertedTime = timeConvert(roundTime);
      time.eq(0).html(convertedTime);

      // console.log(convertedTime);



      if (endDuration > 0) {
        var percent = timeToPercent(current, endDuration);
        // console.log(fullWidthElem.width());

        // console.log(percent);
        var maxWidth = fullWidthElem.width()
        distance.css('width', percent / 100 * maxWidth);
      }

      if (current >= endDuration) {
        source.currentTime = 0;
        buttons.trigger('click');
      }
    });
  });

  // var counter = 1;

  $('audio').each(function() {
    var sourceElement = $(this);
    var source = sourceElement.get(0);
    var parent = sourceElement.parent();
    var info = parent.siblings('.info-section');
    var distance = parent.siblings('.distance-indicator');
    var bufferIndicator = parent.siblings('.buffer-indicator');
    var infoTime = info.children('.info-time');
    addTimeSpans(infoTime);
    var time = infoTime.find('p').children();
    var text = parent.parent().siblings('.player-text');
    var endDuration = 0.0;

    // if (isIE) {
    //   // text.hide();
    // } else {
    // }


    function setMetaData() {
      var dur = source.duration;
      var endTime = timeConvert(Math.round(source.duration));
      endDuration = dur;
      time.eq(0).html("00:00");
      time.eq(2).html(endTime);
    }

    function setBufferDistance() {
      var buffer = source.buffered;
      var bufferEnd = buffer.end(buffer.length-1);
      var percentEnd = timeToPercent(bufferEnd, endDuration);
      var maxWidth = info.width();
      bufferIndicator.css('width', percentEnd / 100 * maxWidth);
    }

    source.addEventListener("timeupdate",function(){
      var current = source.currentTime;
      var roundTime = Math.round(current);
      var convertedTime = timeConvert(roundTime);
      time.eq(0).html(convertedTime);

      if (endDuration > 0) {
        var percent = timeToPercent(current, endDuration);
        var maxWidth = info.width()
        distance.css('width', percent / 100 * maxWidth);
      }

      if (current >= endDuration) {
        source.currentTime = 0;
        parent.trigger('click');
      }

      setBufferDistance();
    });

    source.addEventListener('progress', function() {
      var buffer = source.buffered;
      if (buffer.length > 0) {
        setBufferDistance();
      }
    });

    source.addEventListener('loadedmetadata', function() {
      setMetaData();
      removeLoading(parent);
    });

    // source.addEventListener('canplay', function() {
    //   setMetaData();
    //   removeLoading(parent);
    // });

    if (source.readyState >= 2) {
      setMetaData();
      removeLoading(parent);
    }

    // loadDescription(text, "track_" + counter);
    // counter++;
  });
});

$('.header-ham-wrap').on('click', function() {
  var overlay = $('.header-overlay-buttons');
  // var overlayButtons = $('.header-overlay-buttons');
  if (overlay.hasClass('menu-hidden')) {
    overlay.removeClass('menu-hidden');
    // overlayButtons.removeClass('menu-hidden');
    overlay.addClass('menu-visible');
    // overlayButtons.addClass('menu-visible');
    $(this).removeClass('ham-closed');
    $(this).addClass('ham-open');
    // $('body').css('overflow','hidden');
  } else {
    overlay.removeClass('menu-visible');
    // overlayButtons.removeClass('menu-visible');
    overlay.addClass('menu-hidden');
    // overlayButtons.addClass('menu-hidden');
    $(this).removeClass('ham-open');
    $(this).addClass('ham-closed');
    // $('body').css('overflow','scroll');
  }
});

var homeVideo = $('.home-video video').get(0);
var vidPlaceholder = $('.home-main').find('.video-placeholder');


homeVideo.addEventListener('play', function() {
  // $('.home-main').find('.video-placeholder').eq(0).hide();
  vidPlaceholder.delay(100).fadeOut(2000);
});

homeVideo.addEventListener('canplay', function() {
  vidPlaceholder.delay(100).fadeOut(2000);
});

homeVideo.addEventListener('canplaythrough', function() {
  vidPlaceholder.delay(100).fadeOut(2000);
});

// .home-main
//   .home-video
//     .video-placeholder
//     video(playsinline autoplay muted loop)


// loadstart
// durationchange
// loadedmetadata
// loadeddata
// progress
// canplay
// canplaythrough

// var vid = $('.home-main').find('video').get(0);
//
// vid.addEventListener('canplay', function() {
//   $('.home-main').find('.video-placeholder').eq(0).hide();
// })
//
// vid.addEventListener('canplaythrough', function() {
//   $('.home-main').find('.video-placeholder').eq(0).hide();
// })
//
// vid.addEventListener('play', function() {
//   $('.home-main').find('.video-placeholder').eq(0).hide();
// })

// var source = $(this).get(0);
// var controls = $(this).siblings('.v-controls');
// var section = $(this).parent().parent();
// console.log(section.width());

// source.addEventListener('resize', function(event) {
//   if ($(this).width() > $(window).width()) {
//       controls.width($(window).width());
//   } else {
//     controls.width(section.width());
//   }
//   // controls.width($(this).width());
// });
