!(function() {
    const agent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isAndroid = agent.indexOf('Binance TR') >= 0
    const isIos = agent.indexOf('Binance.TR') >= 0
    const isMiniApp = typeof window !== 'undefined' && window.__NEZHA_BRIDGE__ && !window.__NEZHA_BRIDGE__.postAction
    if(isMiniApp || isAndroid || isIos){
      return null
    }
    function getJSON(str) {
      try {
        return JSON.parse(str)
      } catch (e) {
        return {}
      }
    }
  
    var SDKStubInfoMap = getJSON(
      '{"src":"https://cdn.cookielaw.org/scripttemplates/otSDKStub.js","hash":"0192bff6-bb6b-756d-812b-e6bb7c47efc4"}'
    )
  
    function isString(str) {
      return str && typeof str === 'string'
    }
  
    var AutoBlockScript =
      'https://cdn.cookielaw.org/consent/0192bff6-bb6b-756d-812b-e6bb7c47efc4/OtAutoBlock.js'
  
    var SDKStubSrc = SDKStubInfoMap.src
    var SDKStubHash = SDKStubInfoMap.hash
  
    var injectAutoBlock = isString(AutoBlockScript)
    var injectSDKStub = isString(SDKStubSrc) && isString(SDKStubHash)
  
    if (injectAutoBlock) {
      var script = document.createElement('script')
      script.src = AutoBlockScript
      script.type = 'text/javascript'
      document.head.appendChild(script)
    }
  
    if (injectSDKStub) {
      var script = document.createElement('script')
      script.src = SDKStubSrc
      script.type = 'text/javascript'
      script.setAttribute('charSet', 'UTF-8')
      script.setAttribute('data-domain-script', SDKStubHash)
      document.head.appendChild(script)
  
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.innerHTML = 'function OptanonWrapper() {};'
      s.nonce = ''
      document.head.appendChild(s)
  
      var ss = document.createElement('script')
      ss.src =
        'https://www.binance.tr/static/cloud/cloud-tr/static/onetrust/onetrust-trigger.js'
      ss.type = 'text/javascript'
      ss.setAttribute('charSet', 'UTF-8')
      ss.setAttribute('data-domain-script', SDKStubHash)
      document.head.appendChild(ss)
    }
  })()
  