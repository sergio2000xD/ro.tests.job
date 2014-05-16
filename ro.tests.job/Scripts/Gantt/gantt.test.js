
test("throws undefined table exception", 1, function () {
	expect(1);
	raises(function () {
			var gantt = new ro.Gantt();
	}, ro.GanttException, "undefined table");	
});

test("throws invalid start date exception", 1, function () {
	expect(1);
	raises(function () {
	    var gantt = new ro.Gantt($("table:first"));
	}, ro.GanttException, "invalid start date");
});

test("throws invalid end date exception", 1, function () {
	expect(1);
	raises(function () {
		var gantt = new ro.Gantt($("table:first"), new Date(2014, 1, 1));
	}, ro.GanttException, "invalid end date");
});

test("start and end dates", 1, function () {
    expect(3);
    var start = new Date(2014, 1, 1);
    var end = new Date(2014, 1, 2);
    var table = $("table:first");
    var gantt = new ro.GanttChart(table, start, end);
    var params = gantt.getParams();
    
    equal(params.start, start, "start dates are ok");
    equal(params.end, end, "end dates are ok");
    equal(params.table, table, "table is ok");
});

