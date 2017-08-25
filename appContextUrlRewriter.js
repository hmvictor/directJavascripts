(function(){
  function getAppContext() {
      return document.getUserData("appContext");
  }
  function isAbsolutUrl(url) {
      return startsWith(url, "http");
  }
  function startsWith(string, prefix) {
      return string.indexOf(prefix) === 0;
  }
  var proxied=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=function(method, url, user, password) {
    var u=url;
    var appContext=getAppContext();
    if(!isAbsolutUrl(url) && !startsWith(appContext)){
       u=appContext+u;
    }
    proxied.apply(this, [method, u, user, password]);
  };
})();
