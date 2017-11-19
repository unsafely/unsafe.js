(function (unsafe) {
    unsafe.module("loader", function () {
        unsafe.ext("useAsync", function (unsafe) {
            /* TODO: implement the aync loader */
            return function () {
                unsafe.resetLoader(function (originalLoader) {
                    return originalLoader;
                });
            };
        });
    });
}(this.unsafe));