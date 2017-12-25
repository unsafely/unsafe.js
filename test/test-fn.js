unsafe.test("test-collection",
["test", "assert", "fn"],
function (test, assert, $) {

    function Duck(name) {
        this.feed = function () {
            return name + " get fed";
        }
    }

    var duck = {
        feed: function () {
            return "duck get fed";
        }
    }

    test("should delegate to bind method", function () {
        assert.eq($.delegate(new Duck("duck"), "feed")(), "duck get fed");
    });

    test("should delegate to unbind method", function () {
        assert.eq($.delegate(duck, "feed")(), "duck get fed");  
    });

});