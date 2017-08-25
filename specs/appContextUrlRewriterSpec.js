describe("App Context Url Rewriter", function () {
    afterAll(function () {
        //install is made before loading script
        jasmine.Ajax.uninstall();
    });
    it("Should add Context", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/path/page.html");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("/context/path/page.html");
    });
    it("Should not add context for absolute url", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://example.com/");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("http://example.com/");
    });
    it("Should not add context if already present", function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/context/path/page.html");
        xhr.send();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe("/context/path/page.html");
    });
});