(function (unsafe) {
    unsafe.module("browser-config", function () {
        function Config(global) {
            var self = this;
            self.browser = global;
        }
        return new Config(unsafe.global);
    });
}(this.unsafe));