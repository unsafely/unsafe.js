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
        unsafe.module = function (name, dependencies, fn) {
            var module = {};
            if (arguments.length >= 2) {
                if (fn === undefined) {
                    fn = dependencies;
                    dependencies = [];
                }
                loader(name, fn.apply(module, dependencies.map(function (dependency) {
                    return loader(dependency);
                })));
            }

            return loader(name);
        };

        unsafe.ext = function (name, fn) {
            unsafe[name] = fn.apply(null, [unsafe, unsafe[name]]);
        }

        unsafe.resetLoader = function (loaderCreator) {
            loader = loaderCreator(loader);
        };
    };

    var unsafe = new Unsafe(global);

    global.unsafe = unsafe;
    return unsafe;
}(this));