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

        var defineObservable = function (obj, key, val) {
            var property = Object.getOwnPropertyDescriptor(obj, key);
            if (property && !property.configurable) {
                return;
            }

            var getter = property && property.get;
            var setter = property && property.set;

            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function () {
                    var result = getter ? getter.apply(obj) : val;
                    return result;
                },
                set: function (newVal) {
                    var value = getter ? getter.apply(obj) : val;
                    if (newVal === value || ((newVal !== newVal && value !== value))) {
                        return;
                    }
                    if (setter) {
                        setter.call(obj, newVal);
                    } else {
                        val = newVal;
                    }
                    setTimeout(function () {
                        (obj.__watchers[key] || []).map(function (watcher) {
                            watcher.apply(obj, [newVal, value]);
                        });
                    }, 0);

                }
            })
        }

        var observable = function (obj) {
            if (obj && obj.__observable) {
                return obj;
            }
            Object.defineProperty(obj, "__observable", {
                enumerable: false,
                configurable: false,
                value: true
            });
            Object.defineProperty(obj, "__watchers", {
                enumerable: false,
                configurable: false,
                value: {}
            });
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    defineObservable(obj, key, obj[key]);
                }
            }
            return obj;
        }

        var watch = function (obj, key, watcher) {
            if (!obj.__observable) {
                observable(obj);
            }
            if (!obj.__watchers[key]) {
                obj.__watchers[key] = [];
            }
            if (!obj.hasOwnProperty(key)) {
                defineObservable(obj, key);
            }
            obj.__watchers[key].push(watcher);
            return obj;
        }

        return {
            delegate: delegate,
            id: id,
            watch: watch,
            observable: observable,
        }
    })
}(this.unsafe));