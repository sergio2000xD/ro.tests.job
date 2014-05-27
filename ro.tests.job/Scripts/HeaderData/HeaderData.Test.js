test("header is built", 1, function () {
    expect(17);

    var mainDiv = $("#myHeader");
    var header = new CM.Header(mainDiv);    
    var classes = header.builder.getClasses();

    ok(classes.mainDiv.length > 0, "mainDiv classes set");
    ok(classes.wrapperDiv.length > 0, "wrapperDiv classes set");
    ok(classes.headersDiv.length > 0, "headersDiv classes set");
    ok(classes.buttonsDiv.length > 0, "buttonsDiv classes set");
    ok(classes.headersUl.length > 0, "headersUl classes set");
    ok(classes.buttonsUl.length > 0, "buttonsUl classes set");

    equal(mainDiv.attr("class"), classes.mainDiv, "main div has proper classes");

    var wrapperDiv = mainDiv.find("div:first");
    ok(wrapperDiv.length === 1, "wrapper div found");
    equal(wrapperDiv.attr("class"), classes.wrapperDiv, "wrapper div has proper classes");

    var headersDiv = wrapperDiv.find("div:first");
    ok(headersDiv.length === 1, "headers div found");
    equal(headersDiv.attr("class"), classes.headersDiv, "headers div has proper classes");

    var buttonsDiv = wrapperDiv.find("div:eq(1)");
    ok(buttonsDiv.length === 1, "buttonsDiv div found");
    equal(buttonsDiv.attr("class"), classes.buttonsDiv, "buttonsDiv div has proper classes");
    
    var headersUl = headersDiv.find("ul:first");
    ok(headersUl.length === 1, "headers ul found");
    equal(headersUl.attr("class"), classes.headersUl, "headers ul has proper classes");

    var buttonsUl = buttonsDiv.find("ul:first");
    ok(buttonsUl.length === 1, "buttons ul found");
    equal(buttonsUl.attr("class"), classes.buttonsUl, "buttons ul has proper classes");
});

test("add header", 1, function () {
    expect(10);

    var mainDiv = $("#myHeader");
    var header = new CM.Header(mainDiv);
    var classes = header.builder.getClasses();

    var title = "Environments";
    var subtitle = "The African Jungle";

    header.addHeader(title, subtitle);

    ok(classes.headerSpan.length > 0, "headerSpan classes set");
    ok(classes.subheaderSpan.length > 0, "subheaderSpan classes set");

    var headersUl = mainDiv.find("div > div:first > ul:first");
    ok(headersUl.length === 1, "headers ul found");
    equal(headersUl.attr("class"), classes.headersUl, "headers ul has proper classes");

    var li = headersUl.find("li");
    ok(li.length === 1, "li header found");

    var spanTitle = li.find("span:first");
    var spanSubtitle = li.find("span:eq(1)");

    ok(spanTitle.length === 1, "span title found");
    equal(spanTitle.attr("class"), classes.headerSpan, "span title has proper classes");

    ok(spanSubtitle.length === 1, "span subtitle found");
    equal(spanSubtitle.attr("class"), classes.subheaderSpan, "span subtitle  has proper classes");

    header.removeHeader(0);
    var li = headersUl.find("li");
    ok(li.length === 0, "li header removed");
});

test("add button", 1, function () {
    expect(11);

    var mainDiv = $("#myHeader");
    var header = new CM.Header(mainDiv);
    var classes = header.builder.getClasses();

    var text = "Edit";
    var attrHref = "#";
    var called = false;
    var onclickCallback = function ()
    {
        called = !called;
    }

    var buttonsUl = mainDiv.find("div > div:eq(1) > ul:first");
    ok(buttonsUl.length === 1, "buttons ul found");
    equal(buttonsUl.attr("class"), classes.buttonsUl, "buttons Ul has proper classes");

    var returnedLi = header.addButton(text, attrHref, onclickCallback);    

    var li = buttonsUl.find("li");
    ok(li.length === 1, "li button found");    

    var a = returnedLi.find("a");
    ok(a.length === 1, "a found");
    ok(a.attr("href") === attrHref, "href is ok");    
    equal(a.html(), '<I class=' + classes.linkI + '>' + classes.linkI + "</I>" + text, "a content is ok");
    equal(a.attr("class"), text.toLowerCase(), "a class is ok");

    deepEqual(called, false, "fasle before callback");
    a.trigger("click");
    deepEqual(called, true, "true after callback");

    header.removeButton(0);
    var li = buttonsUl.find("li");
    ok(li.length === 0, "li button removed");

    a.trigger("click");
    deepEqual(called, true, "callback successfully removed");
});


test("load data", 1, function () {
    expect(16);

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
    header.load(dataObj);

    var headersUl = header.builder.getHeaderUl();
    var buttonsUl = header.builder.getButtonUl();
    equal(headersUl.find("li").length, 4, "correct number of header li");
    equal(buttonsUl.find("li").length, 3, "correct number of button li");

    for (var i = 0; i < dataObj.headers.length; i++) {
        var li = header.builder.getHeaderLi(i);
        equal(li.find("span:eq(0)").html(), dataObj.headers[i].header, "header " + i + " text is correct");
        equal(li.find("span:eq(1)").html(), dataObj.headers[i].subheader, "subheader " + i + " text is correct");
    }

    var classes = header.builder.getClasses();
    for (var i = 0; i < dataObj.buttons.length; i++) {
        var li = header.builder.getButtonLi(i);
        equal(li.find("a").html(), '<I class=' + classes.linkI + '>' + classes.linkI + "</I>" + dataObj.buttons[i], "button " + i + " text is correct");
        equal(li.find("a").attr("href"), "#", "button " + i + " href is correct");        
    }
});


test("handle events", 1, function () {
    expect(6);

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
    header.load(dataObj);

    var clicked = false;
    var onClick = function () {
        clicked = !clicked;
    }

    var a = header.builder.getButtonLi(2).find("a");
    a.trigger("click");
    equal(clicked, false, "starting in false");

    header.on(2, "click", onClick);
    a.trigger("click");
    equal(clicked, true, "clicked becomes true");

    a.trigger("click");
    equal(clicked, false, "clicked becomes false");

    header.off(2);
    a.trigger("click");
    equal(clicked, false, "clicked remains false");

    header.on(2, "click", onClick);
    a.trigger("click");
    equal(clicked, true, "clicked becomes true");

    header.off(2, "click");
    a.trigger("click");
    equal(clicked, true, "clicked remains true");    
});