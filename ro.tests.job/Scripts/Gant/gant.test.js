
test("throws undefined table exception", 1, function () {
	expect(1);
	raises(function () {
			var gant = new ro.Gant();
	}, ro.GantException, "undefined table");	
});

test("throws invalid start date exception", 1, function () {
	expect(1);
	raises(function () {
		var gant = new ro.Gant($("table:first"));
	}, ro.GantException, "invalid start date");
});

test("throws invalid end date exception", 1, function () {
	expect(1);
	raises(function () {
		var gant = new ro.Gant($("table:first"), new Date(2014, 1, 1));
	}, ro.GantException, "invalid end date");
});

