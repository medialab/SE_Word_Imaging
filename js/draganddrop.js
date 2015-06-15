(function(global){
    "use strict";

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

    document.body.addEventListener('drop', function(e) {

        document.getElementById("loader").setAttribute("style","display:inline");
        e.stopPropagation();
        e.preventDefault();

        var files = e.dataTransfer.files; // FileList object
        var file = files[0]; // only consider the first file for now.

        var reader = new FileReader();

        reader.addEventListener('load', function(e){
            
            global.data=JSON.parse(e.target.result);
            preloadimages(data.map(function(e){return e.img_url})).done(function(imgs){
                //document.getElementById("loader").style.display="none";
                var p = document.body.querySelector('p')
                p.parentNode.removeChild(p);
                read(imgs);
            });
            
        });
        reader.readAsText(file);
    });

    document.body.addEventListener('dragover', function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    });

})(this);
