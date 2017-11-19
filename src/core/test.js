(function (unsafe) {

    /* TODO: Link test suite with test cases */
    var testSuite = []
    /* TODO: Add mock framework */
    var mockFacotry = {}

    unsafe.ext("test", function (unsafe) {
        return function (module, deps, fn) {
            unsafe.module(module, deps, fn);
            testSuite.push(unsafe.load(module));
        };
    });

    unsafe.module("test", function () {
        var testCases = [];

        var test = function (name, fn) {
            testCases.push({
                name: name,
                run: function () {
                    console.log("Running test case [" + name + "]");
                    fn.apply(null, fn);
                }
            });
        };

        test.run = function (name) {
            if (name === undefined) {
                console.log("Running test ==>");
                testCases.forEach(function (test) {
                    test.run();
                });
            }
            testCases.filter(function (test) {
                return test.name.indexOf(name) > -1;
            }).forEach(function (test) {
                console.log("Running test with filter ==> [" + name + "]");
                test.run();
            })
        };

        return test;
    });
}(this.unsafe));