(function (global) {

    var basicModuleLoaderCreator = function (modules) {
        return function (name, module) {
            if (module !== undefined)
                modules[name] = module;
            return modules[name];
        };
    };

    var Unsafe = function (global) {
        var loader = basicModuleLoaderCreator({});
        var unsafe = this;
        var instantiate = function (module) {
            if (module["instance"] === undefined) {
                module["instance"] = module.constructor.apply({}, module.dependencies.map((function (dependency) {
                    return instantiate(loader(dependency))
                })))
            }
            return module["instance"];
        };
        unsafe.module = function (name, dependencies, fn) {
            if (arguments.length >= 2) {
                if (fn === undefined) {
                    fn = dependencies;
                    dependencies = [];
                }
                loader(name, { constructor: fn, dependencies: dependencies });
            }

            return loader(name);
        };

        unsafe.instance = function (module) {
            return instantiate(unsafe.module(module));
        }

        unsafe.ext = function (name, fn) {
            unsafe[name] = fn.apply(null, [unsafe, unsafe[name]]);
        }

        unsafe.resetLoader = function (loaderCreator) {
            loader = loaderCreator(loader);
        };

        unsafe.fork = function (fn) {
            var child = new Unsafe(global);
            var parent = this;
            child.resetLoader(function (loader) {
                modules = {};

                return function (name, module) {
                    if (module !== undefined) {
                        modules[name] = module;
                    }
                    if (parent.module(name) !== undefined) {
                        modules[name] = parent.module(name);
                    }
                    return modules[name];
                }
            })

            return fn.apply(parent, child);
        }
    };

    var unsafe = new Unsafe(global);

    global.unsafe = unsafe;
    return unsafe;
}(this));