(function(){
  var params  = new URLSearchParams(location.search)
  var pid     = params.get('pid')
  var doPrint = params.get('print') === '1'

  function applyTexts(texts) {
    if (!texts || !window.DECKS || !window.DECKS.ojo) return
    var slides = window.DECKS.ojo.slides
    Object.keys(texts).forEach(function(slideId) {
      var fields = texts[slideId]
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].id === slideId) {
          Object.assign(slides[i], fields)
          break
        }
      }
    })
  }

  function loadEngine() {
    var s = document.createElement('script')
    s.src = 'js/engine.js'
    document.head.appendChild(s)
  }

  function setupPrint() {
    if (!doPrint) return
    window.addEventListener('load', function() {
      setTimeout(function() { window.print() }, 2000)
    })
  }

  if (!pid) {
    setupPrint()
    loadEngine()
    return
  }

  var SB_URL  = 'https://znlglyeaceenywgkfhid.supabase.co'
  var SB_ANON = 'sb_publishable_QO1RQqlZpVjriLlLzl55iA_jbFO5XSN'

  fetch(SB_URL + '/rest/v1/presentations?id=eq.' + encodeURIComponent(pid) + '&select=slide_texts', {
    headers: { 'apikey': SB_ANON, 'Content-Type': 'application/json' }
  })
  .then(function(r) { return r.json() })
  .then(function(rows) {
    if (rows && rows[0] && rows[0].slide_texts) {
      applyTexts(rows[0].slide_texts)
    }
  })
  .catch(function() {})
  .finally(function() {
    setupPrint()
    loadEngine()
  })
})()
