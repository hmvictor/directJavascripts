(function(){
  function getAppContext(){
      //missing
  }
  function isAbsolutUrl(url) {
      //missing
  }
  function startsWith(string, prefix){
      //missing
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
