//https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions

test("abc letters consecutive", 1, function () {
	expect(2);
	var rogex = new RegExp("abc");
	equal(rogex.test("Hi, do you know your abc's?"), true, "Hi, do you know your abc's? matches /abc/");
	equal(rogex.test("hello world"), false, "hello world does not match /abc/");
});

test("ab*c a then zero or any amount of b and c", 1, function () {
	expect(1);
	
	var rogex = new RegExp("ab*c");
	equal(rogex.test("Hi, do you know your abbbbc's?"), true, "Hi, do you know your abbbbc's? matches /ab*c/");
});

test("\\ any word that starts or ends with ", 1, function () {
    expect(3);

    var rogex = new RegExp("\\b");
    equal(rogex.test("barcelona"), true, "barcelona matches b");
    equal(rogex.test("baobab"), true, "baobab matches b");

    rogex = new RegExp("\\lona");
    equal(rogex.test("barcelona"), true, "barcelona matches lona");
});

test("^ any taxt that starts with ", 1, function () {
    expect(3);

    var rogex = new RegExp("^bar");
    equal(rogex.test("barcelona"), true, "barcelona matches ^bar");
    equal(rogex.test("BARCELONA"), false, "BARCELONA does not match ^bar");

    rogex = new RegExp("^b");
    equal(rogex.test("b"), true, "b matches ^b");
});

test("$ any text that ends with", 1, function () {
    expect(2);

    var rogex = new RegExp("ción$");
    equal(rogex.test("loción"), true, "loción matches ^ción");
    equal(rogex.test("canción"), true, "canción matches ^ción");
});

test("* matches the preceding character 0 or more times equivalent to {0,}", 1, function () {
    expect(3);

    var rogex = new RegExp("o*");
    equal(rogex.test("cordinador"), true, "cordinador matches o*");
    equal(rogex.test("coooooooooordinadoooooooor"), true, "coooooooooordinadoooooooor matches o*");
    equal(rogex.test("crdinadr"), true, "crdinadr matches o*");
});

test("+ matches the preceding character 1 or more times equivalent to {1,}", 1, function () {
    expect(3);

    var rogex = new RegExp("o+");
    equal(rogex.test("cordinador"), true, "cordinador matches o+");
    equal(rogex.test("coooooooooordinadoooooooor"), true, "coooooooooordinadoooooooor matches o+");
    equal(rogex.test("crdinadr"), false, "crdinadr does not match o+");
});

test("? matches the preceding character 0 or 1 times equivalent to {0,1}", 1, function () {
    expect(6);

    var rogex = new RegExp("e?le?");
    equal(rogex.test("angel"), true, "angel matches e?le?");
    equal(rogex.test("angle"), true, "angle matches e?le?");
    equal(rogex.test("ernesto"), false, "ernesto does not match e?le?");
    equal(rogex.test("eleazar"), true, "eleazar matches e?le?");
    equal(rogex.test("lazaro"), true, "lazaro matches e?le?");
    equal(rogex.test("azar"), false, "azar does not match e?le?");
});

test(". matches any single character except the newline character", 1, function () {
    expect(3);

    var rogex = new RegExp("h.l..m.n.o");
    equal(rogex.test("hola mundo"), true, "hola mundo matches h.l..m.n.o");    
    equal(rogex.test("hol\nmundo"), false, "hol\nmundo does not match h.l..m.n.o");    
    equal(rogex.test("azar"), false, "azar does not match h.l..m.n.o");
});
