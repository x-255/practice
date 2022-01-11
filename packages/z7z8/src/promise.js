// @ts-nocheck
var MyPromise = /** @class */ (function () {
    function MyPromise() {
    }
    return MyPromise;
}());
MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};
module.exports = MyPromise;
