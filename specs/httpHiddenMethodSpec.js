describe("Http Hidden Method Spec", function () {
    afterAll(function () {
        //install is made before loading script
        jasmine.Ajax.uninstall();
    });

    it("Should be called with GET", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://example.com/");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("http://example.com/");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("GET");
    });
    it("Should be called with POST", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://example.com/");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("http://example.com/");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
    });
    it("Should Be Called with PUT", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://example.com/");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("http://example.com/?_method=PUT");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
    });
    it("Should be called with DELETE", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://example.com/");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("http://example.com/?_method=DELETE");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
    });
    it("Should be called with two parameters", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://example.com/?a=b");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("http://example.com/?a=b&_method=DELETE");
        expect(jasmine.Ajax.requests.mostRecent().method).toBe("POST");
    });
});