(function () {
    this.ro = this.ro || {};
    var ns = this.ro;
   
    ns.GanttException = (function (message) { 
        this.message = message;
        this.name = "GanttException";
    })();    

    ns.GanttChart = (function () {
        function Gantt(table, start, end, ganttParams, ganttClasses) {
            var _classes = {                            // (optional) Defaults:
                headers: {
                    mont: "gantt-mont",
                    day: "gantt-day"
                }
            }

            var _params = {                                     // (optional) Defaults:
                skipDays: ["saturday", "sunday"],               // string array lowercase items
                days: ["S", "M", "T", "W", "T", "F", "S"],      // string array 
                columns: ["ID", "Task", "Duration"],            // string array 
                table: undefined,                               // jQuery table
                caption: "Gantt Chart",                         // string
                subheader: "Activities",                        // string
                start: undefined,                               // js Date object
                end: undefined                                  // js Date object
            }

            var _that = this;
            var _params = ganttParams || _params;            
            var _classes = ganttClasses || _classes;

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

            _that.setStartDate(start);
            _that.setEndDate(end);
            _that.setTable(table);
        }

        Gantt.prototype.millisecondsToDays = function (milliseconds) {
            var dayInMilliseconds = 24 * 60 * 60 * 1000;
            var days = Math.floor(milliseconds / dayInMilliseconds);
            return days;
        }

        Gantt.prototype.getWeek = function (start) {
            var week = {
                start: start,                
                letters: []
            }

            var params = this.getParams();
            for (var i = start.getDay() ; i < params.days.length; i++) {
                week.letters.push(params.days[i]);                
            }

            return week;
        }

        Gantt.prototype.getWeeks = function () {
            var params = this.getParams();
            // elapsed time in milliseconds
            var elapsed = params.end - params.start;
            var days = this.millisecondsToDays(elapsed);
            var weeks = new Array();

            var current = params.start;

            for (var i = 0; i < days;) {
                var week = this.getWeek(new Date(current.getTime())); //clone/copy date
                weeks.push(week);
                var daysToAdd = week.letters.length;
                i += daysToAdd;
                current.setDate(current.getDate() + daysToAdd);
            }

            return weeks;
        }

        Gantt.prototype.init = function () {
            var params = this.getParams();
            var caption = $("<caption>" + params.caption + "</caption>");
            params.table.append(caption);
            var thead = $("<thead></thead>");
            params.table.append(thead);

            var subHeader = $("<tr rowSpan='" + params.columns.length + "'>" + params.subheader + "</tr>");
            thead.append(subHeader);

            var headerRow = $("<tr></tr>");
            thead.append(headerRow);

            for (var i = 0; i < params.columns.length; i++) {
                headerRow.append("<th>" + params.columns[i] + "</th>");
            }
        }

        return Gantt;
    })();

}());
