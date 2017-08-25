(function(){
  var proxied=XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open=function(method, url, user, password) {
    var m=method;
    var u=url;
    if(m === "DELETE" || m === "PUT") {
        m="POST";
        if(u.indexOf("?") === -1){
           u+="?_method="+method;
        }else{
           u+="&_method="+method;          
        }
    }
    proxied.apply(this, [m, u, user, password]);
  };
})();
