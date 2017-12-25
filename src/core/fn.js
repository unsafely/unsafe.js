(function (unsafe) {
    unsafe.module("fn", ["utils"], function (utils) {
        
        var id = function (x) {
            return x;
        }

        var delegate = function (object, method) {
            var mtd = object[method] || id;
            return function () {
                return mtd.apply(object, utils.asA(arguments));
            }
        }

        return {
            delegate: delegate,
            id: id,
        }
    })
}(this.unsafe));