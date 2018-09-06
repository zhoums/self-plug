$(function(){
    /*var bg = chrome.extension.getBackgroundPage();
    bg.setBegin();*/
    $("#ck").on('click',function(){
    	console.log('you click me');
    	var bg = chrome.extension.getBackgroundPage();
		console.log(bg);
		bg.main();
    })

})