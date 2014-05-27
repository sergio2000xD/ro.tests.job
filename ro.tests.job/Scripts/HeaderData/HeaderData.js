/*
    Possible object to return from server:
    ======================================
    var dataObj = {
                headers: [
                    {
                        header: "Product Name",
                        subheader: 'Aquos 70" 4K TV'
                    },
                    {
                        header: "Product ID",
                        subheader: "AQ-70-8321Z"
                    },
                    {
                        header: "Product Description",
                        subheader: "Television"
                    },
                    {
                        header: "Customers",
                        subheader: "Surveys"
                    }
                ],
                buttons: ["Customers", "Surveys", "Edit"]
            };

    var mainDiv = $("#myHeader");
    var header = new CM.Header(mainDiv);
    var li1 = header.addButton("Edit", "#", function(e){ e.preventDefault(); alert('Edit clicked'); });
    var li2 = header.addHeader("Conflict Minerals", "Components");
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
                headerSpan: "title",
                subheaderSpan: "subtitle"                
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
            _that.builder = {
                getMainDiv: function () {
                    return _mainDiv;
                },
                getClasses: function () {
                    return _classes;
                },
                getButtonUl: function () {
                    var _ul = _mainDiv.find("ul[class='" + _classes.buttonsUl + "']");
                    return _ul;
                },
                getHeaderUl: function () {
                    var _ul = _mainDiv.find("ul[class='" + _classes.headersUl + "']");
                    return _ul;
                },
                getButtonLi: function (index) {
                    var _ul = _that.builder.getButtonUl();
                    var _li = _ul.find("li:eq(" + index + ")");
                    return _li;
                },
                getHeaderLi: function (index) {
                    var _ul = _that.builder.getHeaderUl();
                    return _ul.find("li:eq(" + index + ")");
                },
                createButtonLi: function (icon) {                    
                    var _ul = _that.builder.getButtonUl();
                    var _li = $("<li></li>");
                    var _i = $("<i></i>");                                        
                    var _a = $("<a></a>");
                    _a.append(_i);
                    _li.append(_a);
                    _ul.append(_li);

                    _that.setIcon(_li.index(), icon);

                    return _li;
                },
                createHeaderLi: function () {
                    var _ul = _that.builder.getHeaderUl();
                    var _li = $("<li></li>");
                    var _title = $("<span></span>").addClass(_classes.headerSpan);
                    var _subtitle = $("<span></span>").addClass(_classes.subheaderSpan);

                    _li.append(_title);
                    _li.append(_subtitle);
                    _ul.append(_li);

                    return _li;
                }
            }
        }

        Header.prototype.addHeader = function (header, subheader) {
            var _that = this;
            var _li = _that.builder.createHeaderLi();
            var _title = _li.find("span:eq(0)");
            var _subtitle = _li.find("span:eq(1)");

            _title.html(header);
            _subtitle.html(subheader);

            return _li;
        }

        Header.prototype.addButton = function (text, attrHref, icon, onClickCallback) {
            var _that = this;
            var _li = _that.builder.createButtonLi(icon);
            var _a = _li.find("a:first");

            _a.addClass(text.toLowerCase()).append(text);
            _a.attr("href", attrHref || "#");

            if (onClickCallback && typeof onClickCallback === "function") {
                _a.on("click", onClickCallback);
            }

            return _li;
        }

        Header.prototype.removeHeader = function (index) {
            var _li = this.builder.getHeaderLi(index).remove();
            return _li;
        }

        Header.prototype.removeButton = function (index) {
            var _li = this.builder.getButtonLi(index);
            this.off(index); // remove handlers
            _li.remove();
            return _li;
        }

        Header.prototype.load = function (dataObj) {
            var that = this;

            $.each(dataObj.headers, function (i, item) {
                that.addHeader(item.header, item.subheader);
            });

            $.each(dataObj.buttons, function (i, item) {
                that.addButton(item);
            });
        }

        Header.prototype.on = function (index, eventName, callback) {
            var _li = this.builder.getButtonLi(index);
            var _a = _li.find("a");

            if (_a.length > 0 && callback && typeof callback === "function") {
                _a.on(eventName, callback);
            }
            return _a;
        }

        Header.prototype.off = function (index, events) {
            var _li = this.builder.getButtonLi(index);
            var _a = _li.find("a");

            if (_li.length > 0 && index >= 0 && _a.length > 0) {
                if (events) {
                    _a.off(events);
                }
                else {
                    _a.off();
                }
            }

            return _li;
        }

        Header.prototype.setIcon = function (index, icon) {
            var _li = this.builder.getButtonLi(index);
            var _i = _li.find("a > i");
            
            _i.addClass(icon);
            _i.html(icon);

            return _i;
        }

        Header.prototype.removeIcon = function (index) {
            var _li = this.builder.getButtonLi(index);
            var _i = _li.find("a > i");

            _i.removeClass();
            _i.empty();

            return _i;
        }

        return Header;
    })();

}());
