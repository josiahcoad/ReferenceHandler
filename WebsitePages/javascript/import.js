paper = {"rating": 3.0, 
         "title" : "Cardiovascular safety of new drugs for diabetes: Getting the balance right?", 
         "abstract" : "BACKGROUND: ", 
         "decision" : "Include"}

window.onload = function() {
    var fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
      var file = fileInput.files[0];
      var textType = /text.*/;

      if (file.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
          documentFile = reader.result;
          sendToServer(documentFile);
        }

        reader.readAsText(file);  
      } else {
        alert("File not supported!")
      }
    });
}

function sendToServer(data){
    $.post( "http://localhost:5000/upload", 
            input = JSON.stringify(data), 
            success=function( response ) {
              parsed_document = JSON.parse(response)
              // console.log(parsed_document.length + " papers parsed.")
              $("#global").text(response)
              var allpapers = display_papers(parsed_document)
            }); 
}


function display_papers(allpapers){
    var i;
    for (i in allpapers) {
        var markup = "<tr class='unselected' data-toggle='collapse' data-target='#abstract" + String(i) + "'><td id ='table-rating'>" + Math.round(parseFloat(allpapers[i]['rating']) * 10) / 10 + "</td><td><h5>" + allpapers[i]['title'] + "</h5><div id='abstract" + String(i) + "' class='collapse'>" + allpapers[i]['abstract'] + "</div></td><td>" + allpapers[i]['decision'] + "</td></tr>"
        $("table tbody").append(markup);
    }
    $("tr").click(function(e){
        $("tbody").children().removeClass('selected');
        $(this).addClass('selected');
    });

}