
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

    var gantt = new ro.GanttChart(table, start, end);


    var startPlusOneDay = new Date(2014, 1, 2);
    var startPlusOneMonth = new Date(2014, 2, 1);
    var startPlusOneYear = new Date(2015, 1, 1);

    var span1 = startPlusOneDay - start;
    var span28 = startPlusOneMonth - start;
    var span365 = startPlusOneYear - start;
    
    equal(gantt.millisecondsToDays(span1), 1, "one day");
    equal(gantt.millisecondsToDays(span28), 28, "one month");
    equal(gantt.millisecondsToDays(span365), 365, "one year");
});

test("get week", 1, function () {
    expect(6);

    var start = new Date(2014, 0, 1);
    var end = new Date(2014, 1, 31);
    var table = $("table:first");

    var gantt = new ro.GanttChart(table, start, end);
    var week = gantt.getWeek(start, new Date(2014, 0, 5));
    
    equal(week.start, start, "half week");
    deepEqual(week.letters, ["W", "T", "F", "S"], "half week");

    start = new Date(2014, 4, 18);
    week = gantt.getWeek(start, new Date(2014, 25, 5));
    equal(week.start, start, "full week");
    deepEqual(week.letters, ["S", "M", "T", "W", "T", "F", "S"], "full week");

    start = new Date(2014, 4, 3);
    week = gantt.getWeek(start, new Date(2014, 4, 5));
    equal(week.start, start, "one day week");
    deepEqual(week.letters, ["S"], "one day week");
});

test("get weeks", 1, function () {
    expect(6);

    var start = new Date(2014, 0, 1);
    var end = new Date(2014, 0, 31);
    var table = $("table:first");

    var gantt = new ro.GanttChart(table, start, end);
    var weeks = gantt.getWeeks();

    equal(weeks.length, 5, "5 weeks");    
    deepEqual(weeks[0].start, new Date(2014, 0, 1), "start week 1");
    deepEqual(weeks[1].start, new Date(2014, 0, 5), "start week 2");
    deepEqual(weeks[2].start, new Date(2014, 0, 12), "start week 3");
    deepEqual(weeks[3].start, new Date(2014, 0, 19), "start week 4");
    deepEqual(weeks[4].start, new Date(2014, 0, 26), "start week 5");
});


test("init headers", 1, function () {
    expect(7);

    var start = new Date(2014, 0, 1);
    var end = new Date(2014, 0, 31);
    var table = $("table:first");
    var caption = "Gantt Chart";
    var subheader = "Activities";    

    var gantt = new ro.GanttChart(table, start, end);

    var weeks = gantt.getWeeks();
    var classes = gantt.getClasses();

    equal(weeks.length, 5, "5 weeks");
    equal(table.find("caption").html(), caption, "same caption");
    equal(table.find("thead tr").length, 2, "two row headers");
    equal(table.find("thead tr:first th." + classes.header.subheader).html(), subheader, "subheader");
    equal(table.find("thead tr:first th." + classes.header.week).length, 5, "five weeks");
    equal(table.find("thead tr:nth-child(2) th." + classes.header.usercolumn).length, 3, "3 user columns");
    equal(table.find("thead tr:nth-child(2) th." + classes.header.day).length, 31, "31 days");
});

test("get promise", 1, function () {
    expect(1);
    var start = new Date(2014, 0, 1);
    var end = new Date(2014, 0, 31);
    var table = $("table:first");

    var gantt = new ro.GanttChart(table, start, end);
    var promise = gantt.load("GetRows");
    notEqual(promise, null, "promise received");
});

test("load", 1, function () {
    expect(1);
    var start = new Date(2014, 0, 1);
    var end = new Date(2014, 0, 31);
    var table = $("table:first");

    var gantt = new ro.GanttChart(table, start, end);
    var promise = gantt.load("GetRows");
    
});
