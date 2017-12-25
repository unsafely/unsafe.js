(function (unsafe) {
    unsafe.module("fn", ["utils"], function (utils) {
        
        var delegate = function (object, method) {
            return function () {
                return object[method].apply(object, utils.asA(arguments));
            }
        }

        return {
            delegate: delegate
        }
    })
}(this.unsafe));