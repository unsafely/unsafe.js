(function (unsafe) {
    unsafe.module("test", function () {
        var testSuite = [];

        var test = function (name, fn) {
            testSuite.push({
                name: name,
                run: function () {
                    fn.apply(null, fn);
                }
            });
        };

        test.run = function (name) {
            if (name === undefined) {
                testSuite.forEach(function (test) {
                    test.run();
                });
            }
            testSuite.filter(function (test) {
                return test.name.indexOf(name) > -1;
            }).forEach(function (test) {
                test.run();
            })
        };

        return test;
    });
}(this.unsafe));