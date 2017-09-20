(function (unsafe) {
    unsafe.module("loader", function () {
        unsafe.ext("useAsync", function (unsafe) {
            return function () {
                unsafe.resetLoader(function (originalLoader) {
                    return originalLoader;
                });
            };
        });
    });
}(this.unsafe));