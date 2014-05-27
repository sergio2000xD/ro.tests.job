test("header is built", 1, function () {
    expect(17);

    var mainDiv = $("#myHeader");
    var header = new CM.Header(mainDiv);    
    var classes = header.getClasses();

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
    var classes = header.getClasses();

    var title = "Environments";
    var subtitle = "The African Jungle";

    header.addHeader(title, subtitle);

    ok(classes.titleSpan.length > 0, "subtitleSpan classes set");
    ok(classes.subtitleSpan.length > 0, "subtitleSpan classes set");

    var headersUl = mainDiv.find("div > div:first > ul:first");
    ok(headersUl.length === 1, "headers ul found");
    equal(headersUl.attr("class"), classes.headersUl, "headers ul has proper classes");

    var li = headersUl.find("li");
    ok(li.length === 1, "li header found");

    var spanTitle = li.find("span:first");
    var spanSubtitle = li.find("span:eq(1)");

    ok(spanTitle.length === 1, "span title found");
    equal(spanTitle.attr("class"), classes.titleSpan, "span title has proper classes");

    ok(spanSubtitle.length === 1, "span subtitle found");
    equal(spanSubtitle.attr("class"), classes.subtitleSpan, "span subtitle  has proper classes");

    header.removeHeader(0);
    var li = headersUl.find("li");
    ok(li.length === 0, "li header removed");
});

test("add button", 1, function () {
    expect(11);

    var mainDiv = $("#myHeader");
    var header = new CM.Header(mainDiv);
    var classes = header.getClasses();

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
    equal(a.html(), "<i></i>" + text, "a content is ok");
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