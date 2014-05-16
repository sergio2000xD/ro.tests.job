(function () {
    this.ro = this.ro || {};
    var ns = this.ro;

    ns.GantParams = {
        skipDays: ["saturday", "sunday"],
        table: undefined,
        start: undefined,
        end: undefined
    };

    ns.GantException = (function (message) { 
        this.message = message;
        this.name = "GantException";
    })();

    ns.Gant = (function () {
        function Gant(table, start, end, gantParams) {
            var _that = this;
            var _params = gantParams || ns.GantParams();

            _that.setTable = function (table) {
                if (!table) {
                    throw new ns.GantException("undefined table");
                }
                _params.table = table;
            }

            _that.setEndDate = function (end) {
                if (!end || !end instanceof Date) {
                    throw new ns.GantException("invalid end date");
                }
                _params.end = end;
            }

            _that.setStartDate = function (start) {
                if (!start || !start instanceof Date) {
                    throw new ns.GantException("invalid start date");
                }
                _params.start = start;
            }

            _that.getParams = function () {
                return _params;
            };

            _that.setStartDate(start);
            _that.setEndDate(end);                        
        }

        Gant.prototype.init = function () {
            
        }

        return Gant;
    })();

}());
