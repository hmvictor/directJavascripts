(function(){
  function createRequestEvent(eventName, request) {
    var event=new Event("Event");
    event.init(eventName, true, true);
    return event;
  }
  function fireEvent(event) {
    document.dispatchEvent(event);
  }
  var proxied=XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send=function() {
    var request=this;
    function finishedEventHandler() {
      fireEvent(createRequestEvent("requestFinished", request));
    }
    request.addEventListener("load", finishedEventHandler);
    request.addEventListener("error", finishedEventHandler);
    fireEvent(createRequestEvent(request, "requestStarted"));
    return proxied.apply(request, arguments);
  };
})();
