(function () {
    this.myApp = this.myApp || {};
    var ns = this.myApp;

    var createdOn = Date.now();

    ns.sayHello = function (name) {
        return "Hello " + name + "!";
    }

    ns.createdOn = function () {
        return createdOn;
    };

}());




var Vehicle = (function () {
    function Vehicle(year, make, model) {
        this.year = year;
        this.make = make;
        this.model = model;
    }

    Vehicle.prototype.getInfo = function () {
        return this.year + ' ' + this.make + ' ' + this.model;
    }

    return Vehicle;
})();