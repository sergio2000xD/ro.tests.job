
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


test("convert milliseconds to days", 1, function () {
    expect(3);
    
    var start = new Date(2014, 1, 1);
    var end = new Date(2015, 1, 1);

    var table = $("table:first");

    var gantt = new ro.GanttChart(table,
        new Date(start.getFullYear(), start.getMonth(), start.getDay()),
        new Date(end.getFullYear(), end.getMonth(), end.getDay()));

    var span1 = new Date(start.getFullYear(), start.getMonth(), start.getDay()).setDate(start.getDay() + 1) - gantt.getParams().start;
    var span32 = new Date(start.getFullYear(), start.getMonth(), start.getDay()).setDate(start.getDay() + 32) - gantt.getParams().start;
    var span365 = new Date(start.getFullYear(), start.getMonth(), start.getDay()).setDate(start.getDay() + 365) - gantt.getParams().start;

    

    equal(gantt.millisecondsToDays(span1), 1, "one day");
    equal(gantt.millisecondsToDays(span32), 32, "one month");
    equal(gantt.millisecondsToDays(span365), 365, "one year");
});

