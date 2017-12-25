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

    test("should return id when delegate unknown method", function () {
        assert.eq($.delegate(duck, "unknown")("duck"), "duck");
    });

    test("should watch a object", function () {
        var a = {
            x: 1
        };

        var executed = false;

        $.watch(a, "x", function (x) {
            assert.eq(x, 2);
            executed = true;
        });

        a.x = 2;

        setTimeout(function () {
            assert.isTrue(executed);
        }, 10);

    });
});