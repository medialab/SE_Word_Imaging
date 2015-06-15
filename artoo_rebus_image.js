
artoo.$("body").append('<div id="artoo_ui" style="position:absolute;top:50px;right:50px;z-index:9999;background:#EEEEEE;"></div>');

var ui=new artoo.ui({mountNode:artoo.$("#artoo_ui")[0]});
ui.$().append('<textarea id="text_to_scrape" on style="width:500px;height:100px">We(500)|are(500)|the(500)|World(2000)|We(500)|are(500)|the(500)|people(2000)</textarea>');
ui.$().append('<input type="button" value="go" onclick="javascript:scrape()">');
ui.$("textarea").on('keydown', function whatever(evt) {
	 evt.stopPropagation();
    });

function scrape(){
	var text=ui.$("#text_to_scrape").val().replace("\n","");
	console.log(text);


console.log("let's scrape !")

var words=text.split("|");

var words_only=words.map(function(w){
	var _word=w.split("(")[0];
	return _word;
})

var words_length=words.map(function(w){
	var truc={}
	truc.word=w.split("(")[0];
	truc.l=w.split("(")[1].split(")")[0];
	return truc;
})
var pace=2000;



index_word=0
function get_images()
{
	var word = words_only.shift();

	artoo.$(".gsfi").simulate("keyup")
	artoo.$(".gsfi")[0].value='"'+word+'"';
	
	artoo.$(".lsb").simulate("click");
	setTimeout(function(){
		var img_url=decodeURIComponent(decodeURIComponent(artoo.$(".rg_di.rg_el a")[0].href.split("=")[1].split("&")[0]))
		console.log(img_url)
		words_length[index_word].img_url=img_url;
		img_url.split()
		// var a = artoo.saveResource(img_url,{
  // 		filename: index_word
		// });
		index_word+=1
		if(words_only.length)
		{	
			//artoo.beep();
			setTimeout(get_images,pace)
		}else{
			console.log("done !",words_length)
			artoo.saveJson(words_length,{pretty: true})
		}}
		,
		pace);
}
get_images();
}
// wishlit
// srt input format