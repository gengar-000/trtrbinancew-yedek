document.addEventListener('mouseup', function(e) {
  const dropdowns = document.querySelectorAll('.dropdown-box')
  dropdowns.forEach((dom) => {
    if (!(dom === e.target || dom.contains(e.target))) {
      dom.style.display = 'none'
    }
  })
})

// fingerprint id
const fingerprintId = window.localStorage.getItem('bc.fingerprint.id')
const fingerprintOptions = {}
if (!fingerprintId) {
  if (window.requestIdleCallback) {
    requestIdleCallback(function() {
      window.Fingerprint2 &&
        window.Fingerprint2.getV18(fingerprintOptions, function(result) {
          window.localStorage.setItem('bc.fingerprint.id', result)
        })
    })
  } else {
    setTimeout(function() {
      window.Fingerprint2 &&
        window.Fingerprint2.getV18(fingerprintOptions, function(result) {
          window.localStorage.setItem('bc.fingerprint.id', result)
        })
    }, 500)
  }
}
