/*
    Possible object to return from server:
    ======================================
    {
	    headers:[
            {
                header: "Product Name"
                subheader: "Aquos 70" 4K TV"
            },
            {
                header: "Product ID"
                subheader: "AQ-70-8321Z"
            },
            {
                header: "Product Description"
                subheader: "Television"
            },
            {
                header: "Customers"
                subheader: "Surveys"
            }
        ],
        buttons:["Customers", "Surveys", "Edit"]    
    }
*/


(function () {
    this.CM = this.CM || {};
    var ns = this.CM;

    ns.Header = (function () {
        function Header(div) {

            var _classes = {
                mainDiv: "row fringe-clear",
                wrapperDiv: "c12 bg-gradient header-data",
                headersDiv: "c8 buffer-clear",
                buttonsDiv: "c4 buffer-clear",
                headersUl: "header-list",
                buttonsUl: "tabs pull-right",
                titleSpan: "title",
                subtitleSpan: "subtitle",

            }

            var _mainDiv = div.addClass(_classes.mainDiv);
            var _wrapperDiv = $("<div></div>").addClass(_classes.wrapperDiv);
            var _headersDiv = $("<div></div>").addClass(_classes.headersDiv);
            var _buttonsDiv = $("<div></div>").addClass(_classes.buttonsDiv);
            var _headersUl = $("<ul></ul>").addClass(_classes.headersUl);
            var _buttonsUl = $("<ul></ul>").addClass(_classes.buttonsUl);
            var _titleSpan = $("<span></span>").addClass(_classes.titleSpan);
            var _subtitleSpan = $("<span></span>").addClass(_classes.subtitleSpan);

            _mainDiv.append(_wrapperDiv);
            _wrapperDiv.append(_headersDiv);
            _wrapperDiv.append(_buttonsDiv);
            _headersDiv.append(_headersUl);
            _buttonsDiv.append(_buttonsUl)

            var _that = this;
            _that.getMainDiv = function () {
                return _mainDiv;
            }

            _that.getClasses = function () {
                return _classes;
            }
        }

        Header.prototype.addHeader = function (title, subtitle) {
            var _div = this.getMainDiv();
            var _classes = this.getMainDiv();
            var _ul = _div.find("ul." + _classes.headersUl);
            var _li = $("<li></li>");
            var _title = $("<span></span>").addClass(_classes.titleSpan);
            var _subtitle = $("<span></span>").addClass(_classes.subtitleSpan);

            _title.html(title);
            _subtitle.html(subtitle);

            _li.append(title);
            _li.append(subtitle);

            _ul.append(_li);

            return _li;
        }

        Header.prototype.addButton = function (text, attrHref, onclickCallback) {
            var _div = this.getMainDiv();
            var _classes = this.getMainDiv();
            var _ul = _div.find("ul." + _classes.buttonsUl);
            var _li = $("<li></li>");
            var _a = $("<a><i></i></a>");

            _a.addClass(text).append(text);
            _a.attr("href", attrHref || "#");

            _li.append(_a);
            _ul.append(_li);

            if (onclickCallback || typeof onclickCallback === "function") {
                _a.on("click", onclickCallback);
            }

            return _li;
        }

        Header.prototype.removeHeader = function (index) {
            var _div = this.getMainDiv();
            var _classes = this.getMainDiv();
            var _ul = _div.find("ul." + _classes.headersUl);
            return _ul.find("li:eq(" + index + ")").remove();
        }

        Header.prototype.removeButton = function (index) {
            var _div = this.getMainDiv();
            var _classes = this.getMainDiv();
            var _ul = _div.find("ul." + _classes.buttonsUl);
            return _ul.find("li:eq(" + index + ")").remove();
        }

        return Header;
    })();

}());
