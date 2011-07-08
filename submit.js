function submit(e) {
  if (clickOpenURL(e, 'http://reddit.com/submit/?resubmit=true'+
                      '&url='+window.location.hash.substr(1)+
                      '&title='+encodeURIComponent($('#title-input').val()))) {
    // If the page is going away, show a working indicator.
    $('#submit span').css('background-image', 'url(images/working0.png)')
    $('#submit').css('opacity', .5).unbind()
  }

  // Pause for a moment, then zip away.
  window.setTimeout(function() {
    msgJSON({action:'close'})
  }, 500)
}

function update() {
  $('#title-input').attr('placeholder', function(i, val) {
    var adjs = ['a clever', 'a snarky', 'a nifty', 'an exciting', 'an alluring', 'a juicy', 'an engaging', 'a concise']
    var ends = ['Be witty!', 'Be silly!', 'Be nice!', 'Huzzah!', 'Have fun!', 'Good luck!']
    return 'Enter '+randomChoice(adjs)+' title to share this page with reddit. '+randomChoice(ends)
  })
  
  window.setTimeout(function() {
    msgJSON({action:'size', width:$('#bar').outerWidth(), height:$('#bar').outerHeight()})
  }, 10)
}

$(document).ready(function() {
  $(window).resize(function() {
    update()
  })

  $('#submit').click(submit)
  $('#title-input').keypress(function(e) {
    if (e.which == 13) {
      submit(e)
    }
  })
  
  $('#close').click(function() {
    msgJSON({action:'close'})
  })

  update()
}
