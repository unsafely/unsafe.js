unsafe.test("test-unsafe", ["test"], function (test) {
    test("hello world", function () {
        console.log("hello world");
    });

    test("unsafe test", function () {
        console.log("unsafe test");
    });
});