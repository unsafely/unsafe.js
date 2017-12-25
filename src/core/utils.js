(function (unsafe) {
    unsafe.module("utils", function () {
        
        var asA = function (arrayLike) {
            return Array.prototype.slice.apply(arrayLike);
        }

        return {
            asA: asA
        }
    })
}(this.unsafe));