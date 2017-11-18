(function (unsafe) {

    var testSuite = []
    var mockFacotry = {}

    unsafe.ext("test", function (unsafe) {
        return function (module, deps, fn) {
            unsafe.module(module, deps, fn);
            testSuite.push(unsafe.instance(module));
        };
    });

    unsafe.module("test", function () {
        var testCases = [];

        var test = function (name, fn) {
            testCases.push({
                name: name,
                run: function () {
                    console.log("Running test [" + name + "]");
                    fn.apply(null, fn);
                }
            });
        };

        test.run = function (name) {
            if (name === undefined) {
                testCases.forEach(function (test) {
                    test.run();
                });
            }
            testCases.filter(function (test) {
                return test.name.indexOf(name) > -1;
            }).forEach(function (test) {
                test.run();
            })
        };

        return test;
    });
}(this.unsafe));