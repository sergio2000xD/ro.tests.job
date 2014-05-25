
function formatResult() {
    var value = $("#theInput").val();
    var pattern = $("#theRegex").val();
    var result = $("#theResult");
    var formattedResult = $("#theFormattedResult");
    
    result.html("");
    
    if (value && pattern) {
        try {
            var span = $("<span></span>")
        
            var matches = value.match(new RegExp(pattern, "g", "m"));        
            var array = value.match(pattern);
            if (!array && !matches) {
                span.html("No match found.");
            }
            else {
                span.html("Matches: " + matches.join(",") + "<br /> First index: " + array.index + "<br />Input: " + array.input + " <br />");
            
                var indexes = new Array();
                var lastPosition = 0;

                for (var i = 0; i < matches.length; i++) {
                    var tmpIndex = value.indexOf(matches[i], lastPosition);
                    indexes.push(tmpIndex);
                    lastPosition = tmpIndex + matches[i].length;
                }

                span.append("Indexes: " + indexes.join(","));

            }
            result.append(span);
            console.log(array);
        }catch(e) {
            alert("Regular expresion is not valid: ", e.message);
        }
    }
}
$(function () {

    $("#evaluate").on("click", function(){
        formatResult();
    });

})