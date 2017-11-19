(function (unsafe) {
    unsafe.module("assert", function () {
        var assertTrueOrError = function (assertion, message) {
            message = message || "Assertion Error";
            if (!assertion) {
                throw new Error(message);
            }
        };

        return {
            eq: function (left, right) { return assertTrueOrError(left === right); },
            isTrue: function (it) { return assertTrueOrError(it) }
        };
    });
}(this.unsafe));