(function () {
    this.ro = this.ro || {};
    var ns = this.ro;
   
    ns.GanttException = (function (message) { 
        this.message = message;
        this.name = "GanttException";
    })();    

    ns.GanttChart = (function () {
        function Gantt(table, start, end, ganttParams, ganttClasses) {
            var _initialized = false;
            var _classes = {                            // (optional) Defaults:
                header: {
                    week: "gantt-week",                    
                    subheader: "gantt-subheader",                    
                    usercolumn: "gantt-husercolumn",
                    day: "gantt-day",
                },

                days: {
                    active: "gantt-active",
                    cell: "gantt-cell",
                    dayoff: "gantt-dayoff"
                },

                usercolumns: {
                    usercolumn: "gantt-usercolumn"
                }
            }

            var _params = {                                     // (optional) Defaults:
                skipDays: [0, 6],                               // index based [0-6]
                days: ["S", "M", "T", "W", "T", "F", "S"],      // string array 
                columns: ["ID", "Task", "Duration"],            // string array 
                table: undefined,                               // jQuery table
                caption: "Gantt Chart",                         // string
                subheader: "Activities",                        // string
                start: undefined,                               // js Date object
                end: undefined                                  // js Date object
            }

            var _that = this;            
            if (ganttParams) {
                if ("skipDays" in ganttParams)
                    _params.skipDays = ganttParams.skipDays;
                if ("days" in ganttParams)
                    _params.days = ganttParams.days;
                if ("columns" in ganttParams)
                    _params.columns = ganttParams.columns;
                if ("caption" in ganttParams)
                    _params.caption = ganttParams.caption;
                if ("subheader" in ganttParams)
                    _params.subheader = ganttParams.subheader;
            }
            if (ganttClasses)
            {
                if ("header" in ganttClasses)
                {
                    if ("week" in ganttClasses.header) {
                        _classes.header.week = ganttClasses.header.week;
                    }
                    if ("subheader" in ganttClasses.header) {
                        _classes.header.subheader = ganttClasses.header.subheader;
                    }
                    if ("usercolumn" in ganttClasses.header) {
                        _classes.header.usercolumn = ganttClasses.header.usercolumn;
                    }
                    if ("day" in ganttClasses.header) {
                        _classes.header.day = ganttClasses.header.day;
                    }
                }
                if ("days" in ganttClasses) {
                    if ("active" in ganttClasses.days) {
                        _classes.days.active = ganttClasses.days.active;
                    }
                    if ("cell" in ganttClasses.days) {
                        _classes.days.cell = ganttClasses.days.cell;
                    }
                    if ("dayoff" in ganttClasses.days) {
                        _classes.days.dayoff = ganttClasses.days.dayoff;
                    }
                }
                if ("usercolumns" in ganttClasses) {
                    if ("usercolumn" in ganttClasses.usercolumns) {
                        _classes.usercolumns.usercolumn = ganttClasses.usercolumns.usercolumn;
                    }
                }                
            }

            _that.setTable = function (table) {
                if (!table) {
                    throw new ns.GanttException("undefined table");
                }
                _params.table = table;
            }

            _that.setEndDate = function (end) {
                if (!end || !end instanceof Date) {
                    throw new ns.GanttException("invalid end date");
                }
                _params.end = end;
            }

            _that.setStartDate = function (start) {
                if (!start || !start instanceof Date) {
                    throw new ns.GanttException("invalid start date");
                }
                _params.start = start;
            }

            _that.getParams = function () {
                return _params;
            };

            _that.getClasses = function () {
                return _classes;
            };

            _that.isInitialized = function () {
                return _initialized;
            };

            _that.setStartDate(start);
            _that.setEndDate(end);
            _that.setTable(table);

            // lastly call init
            _that.init();
            _initialized = true;
        }

        Gantt.prototype.millisecondsToDays = function (milliseconds) {
            var dayInMilliseconds = 24 * 60 * 60 * 1000;
            var days = Math.floor(milliseconds / dayInMilliseconds);
            return days;
        }

        Gantt.prototype.getWeek = function (start, end) {
            var week = {
                start: start,                
                letters: []
            }

            var params = this.getParams();
            var current = new Date(start);//clone/copy date

            for (var i = start.getDay() ; i < params.days.length; i++) {
                if (current <= end) {                
                    week.letters.push(params.days[i]);
                    current.setDate(current.getDate() + 1);
                }
            }

            return week;
        }

        Gantt.prototype.getWeeks = function () {
            var params = this.getParams();
            // elapsed time in milliseconds
            var elapsed = params.end - params.start;
            var days = this.millisecondsToDays(elapsed);
            var weeks = new Array();

            var current = new Date(params.start.getTime());//clone/copy date

            for (var i = 0; i < days;) {
                var week = this.getWeek(new Date(current.getTime()), params.end); 
                weeks.push(week);
                var daysToAdd = week.letters.length;
                i += daysToAdd;
                current.setDate(current.getDate() + daysToAdd);
            }

            return weeks;
        }

        Gantt.prototype.populateJson = function (d) {
            var that = this;
            var params = that.getParams();
            var classes = that.getClasses();
            var body = $("<tbody></tbody>");

            params.table.find("tbody").remove();

            params.table.append(body);

            var days = params.table.find("thead tr:nth-child(2) th." + classes.header.day).length;

            $.each(d, function (i, item) {
                var tr = $("<tr></tr>");
                body.append(tr);
                
                $.each(item.columns, function (j, col) {
                    var td = $("<td></td>");
                    td.addClass(classes.usercolumns.usercolumn);
                    td.html(col);
                    tr.append(td);
                });


                // skip days
                var start = new Date(parseInt(item.start.substr(6)));//clone/copy date                
                var end = new Date(parseInt(item.end.substr(6)));//clone/copy date
                
                var current = new Date(params.start);//clone/copy date

                for (var j = 0; j < days; j++)
                {
                    var td = $("<td></td>");
                    td.addClass(classes.days.cell);
                    tr.append(td);

                    if (params.skipDays.indexOf(current.getDay()) == -1) {
                        if (current >= start && current <= end) {
                            td.css("background-color", item.color);
                            td.addClass(classes.days.active);
                        }
                    } else {
                        td.addClass(classes.days.dayoff);
                    }

                    current.setDate(current.getDate() + 1);
                }
            });

        }

        Gantt.prototype.loadJson = function (url, data) {
            var that = this;
            if (!url)
                return null;

            data = data || null;            

            //return promise
            return $.ajax({
                url: url,
                data: data,
                success: function (d) {
                    that.populateJson(d);
                },
                dataType: "json"
            });
        }

        Gantt.prototype.init = function () {
            if (this.isInitialized()) return;

            var params = this.getParams();
            var classes = this.getClasses();
            var weeks = this.getWeeks();

            //clean
            params.table.html("");

            var caption = $("<caption>" + params.caption + "</caption>");            
            params.table.append(caption);
            var thead = $("<thead></thead>");
            params.table.append(thead);

            //first row
            var firstRow = $("<tr></tr>");            
            firstRow.append("<th colspan='" + params.columns.length + "' class='" + classes.header.subheader + "'>" + params.subheader + "</th>");
            //week
            for (var i = 0; i < weeks.length; i++) {
                firstRow.append("<th colspan='" + weeks[i].letters.length + "' class='" + classes.header.week + "'>" + weeks[i].start.toDateString() + "</th>");
            }
            thead.append(firstRow);

            //second row
            var secondRow = $("<tr></tr>");
            thead.append(secondRow);

            //user columns
            for (var i = 0; i < params.columns.length; i++) {
                secondRow.append("<th class='" + classes.header.usercolumn + "'>" + params.columns[i] + "</th>");
            }

            //week days            
            for (var i = 0; i < weeks.length; i++) {
                for (var j = 0; j < weeks[i].letters.length; j++) {
                    secondRow.append("<th class='" + classes.header.day + "'>" + weeks[i].letters[j] + "</th>");
                }                
            }                        
        }

        return Gantt;
    })();

}());
