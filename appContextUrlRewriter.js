(function(){
  function getAppContext() {
      return document.body.dataset.appContext;
  }
  function isAbsolutUrl(url) {
      return startsWith(url, "http");
  }
  function startsWith(string, prefix) {
      return string.indexOf(prefix) === 0;
  }
  var proxied=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=function(method, u, user, password) {
    var url=u;
    var appContext=getAppContext();
    if(!isAbsolutUrl(url) && !startsWith(url, appContext)){
       url=appContext+url;
    }
    proxied.apply(this, [method, url, user, password]);
  };
})();
