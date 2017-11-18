(function (unsafe) {
    unsafe.module("browser-config", function () {
        function Browser(global) {
            var self = this;
            self.browser = global;
        }
        return new Browser(unsafe.global);
    });
}(this.unsafe));