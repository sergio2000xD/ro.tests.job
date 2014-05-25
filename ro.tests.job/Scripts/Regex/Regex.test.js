//https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions

test("abc letters consecutive", 1, function () {
	expect(2);
	var rogex = new RegExp("abc");
	var marray = "Hi, do you know your abc's?".match("abc");
	var array = rogex.exec("Hi, do you know your abc's?");
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

test("(x) matches x and remembers the match", 1, function () {
    expect(5);
    var newText = "foo bar foo bar".replace(/(foo) (bar) \1 \2/, "$1 $1 $1 $2");    
    equal(newText, "foo foo foo bar", "'foo bar foo bar'.replace(/(foo) (bar) \1 \2/, '$1 $1 $1 $2');");

    newText = "uno dos uno dos".replace(/(uno) (dos) \1 \2/, "$1");
    equal(newText, "uno", "'uno dos uno dos'.replace(/(uno) (dos) \1 \2/, '$1');");
    
    newText = "uno dos tres cuatro".replace(/(uno) (dos) (tres) (cuatro)/, "$4 $3 $2 $1");
    equal(newText, "cuatro tres dos uno", "'uno dos tres cuatro'.replace(/(uno) (dos) (tres) (cuatro)/, '$4 $3 $2 $1');");

    newText = "uno dos tres cuatro".replace(/(uno) (dos) (tres) (cuatro)/, "$3 $4 $1 $2");
    equal(newText, "tres cuatro uno dos", "'uno dos tres cuatro'.replace(/(uno) (dos) (tres) (cuatro)/, '$3 $4 $1 $2');");

    newText = "uno dos tres cuatro".replace(/(uno) (dos) (tres) (cuatro)/, "$1 $1 $2 $2 $3 $3 $4 $4");
    equal(newText, "uno uno dos dos tres tres cuatro cuatro", "'uno dos tres cuatro'.replace(/(uno) (dos) (tres) (cuatro)/, '$1 $1 $2 $2 $3 $3 $4 $4');");
});

test("(?:x) matches x but does not remembers the match", 1, function () {

/*
    You can use capturing groups to organize and parse an expression. 
    A non-capturing group has the first benefit, but doesn't have the overhead of the second. 
    You can still say a non-capturing group is optional, for example.

    Say you want to match numeric text, but some numbers could be written as 1st, 2nd, 3rd, 4th,... 
    If you want to capture the numeric part, but not the (optional) suffix you can use a non-capturing group.

    ([0-9]+)(?:st|nd|rd|th)?

    That will match numbers in the form 1, 2, 3... or in the form 1st, 2nd, 3rd,... but it will only capture the numeric part.
*/

    expect(3);
    var rogex = new RegExp("([0-9]+)(?:st|nd|rd|th)?");
    equal(rogex.test("1st"), true, "1st matches /([0-9]+)(?:st|nd|rd|th)?/");    
    equal(rogex.test("3"), true, "3 matches /([0-9]+)(?:st|nd|rd|th)?/");
    equal(rogex.test("2nd"), true, "2nd matches /([0-9]+)(?:st|nd|rd|th)?/");
});

test("x(?=y) matches 'x' only if 'x' is followed by 'y'", 1, function () {
    
    expect(3);
    var rogex = new RegExp("Rodrigo (?=Damian)");
    equal(rogex.test("Rodrigo Damian"), true, "Rodrigo Damian matches /Rodrigo(?=Damian)/");
    equal(rogex.test("Rodrigo Jimenez"), false, "Rodrigo Jimenez matches /Rodrigo(?=Damian)/");
    equal(rogex.test("Jimenez Garcia"), false, "Jimenez Garcia does not match /Rodrigo(?=Damian)/");
});

test("x(?!y) matches 'x' only if 'x' is not followed by 'y'", 1, function () {

    expect(3);
    var rogex = new RegExp("Rodrigo (?!Damian)");
    equal(rogex.test("Rodrigo Damian"), false, "Rodrigo Damian does not match /Rodrigo(?!Damian)/");
    equal(rogex.test("Rodrigo Jimenez"), true, "Rodrigo Jimenez matches /Rodrigo(?!Damian)/");
    equal(rogex.test("Jimenez Garcia"), false, "Jimenez Garcia does not match /Rodrigo(?!Damian)/");
});

test("x|y matches either 'x' or 'y'", 1, function () {

    expect(3);
    var rogex = new RegExp("Rodrigo|Damian");
    equal(rogex.test("Jimenez Garcia"), false, "Jimenez Garcia does not match /Rodrigo|Damian)/");
    equal(rogex.test("Rodrigo Jimenez"), true, "Rodrigo Jimenez matches /Rodrigo|Damian/");
    equal(rogex.test("Damian Jimenez"), true, "Damian Jimenez matches /Rodrigo|Damian/");
});

test("{n} matches exactly n consecutive occurrences of the preceding character. N must be a positive integer", 1, function () {

    expect(3);
    var rogex = new RegExp("o{2}");
    equal(rogex.test("Jimenez"), false, "Jimenez does not match /o{2}/");
    equal(rogex.test("Rodrigoo"), true, "Rodrigoo matches /o{2}/");
    equal(rogex.test("only"), false, "only does not match /o{2}/");
});

test("{n,m} with n and m positive integers. Matches at least n and at most m occurrences of the preceding character. When m is zero, it can be ommited.", 1, function () {

    expect(4);
    var rogex = new RegExp("a{2,3}");
    equal(rogex.test("a"), false, "a{2,3} does not match a");
    equal(rogex.test("aa"), true, "a{2,3} matches aa");
    equal(rogex.test("aaa"), true, "a{2,3} matches aaa");
    equal(rogex.test("aaaa"), true, "a{2,3} matches aaaa but only takes 3 a's");
    
});

test("[xyz] Charachter set. Matches any one of the characters in the brackets.", 1, function () {

    expect(5);
    var rogex = new RegExp("[aeiou]");
    equal(rogex.test("murcielago"), true, "murcielago matches [aeiou]");
    equal(rogex.test("universidad"), true, "universidad matches [aeiou]");
    equal(rogex.test("bmw"), false, "bmw does not match [aeiou]");

    rogex = new RegExp("[a-z.]"); // a-z series of letters and .
    equal(rogex.test("t.e.s.t.i.n.g"), true, "t.e.s.t.i.n.g matches [a-z.]");

    rogex = new RegExp("[\w.]"); // \w. series of letters and .
    equal(rogex.test("t.e.s.t.i.n.g"), true, "t.e.s.t.i.n.g matches [\\w.]");
});
