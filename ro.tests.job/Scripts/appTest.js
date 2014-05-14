test("A hello world test", 1, function () {
    expect(1);
    var expected = "Hello ro!"
    equal(myApp.sayHello("ro"), expected, "Expected greeting");
});

test("A private variable test", 1, function () {
    expect(1);
    notEqual(myApp.createdOn().length, 0, "length greather tha zero");    
});

test("A class Vehicle test", 1, function () {
    expect(1);
    var myCar = new Vehicle(2013, "Jeep", "Wrangler Unlimited Sport")
    var expected = "2013 Jeep Wrangler Unlimited Sport";
    equal(myCar.getInfo(), expected, "get info on my car");
});