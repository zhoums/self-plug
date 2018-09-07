
chrome.browserAction.onClicked.addListener(function(tab){  
  // var newURL = "your url";
  // chrome.tabs.create({ url: newURL });
  main();
});
//获取抓取v任务的达人id
function getAllVTaskDarenIds(page){
	var _page = page||1;
	return new Promise(function(resolve,reject){
		$.ajax({
			url:'http://spider.ittun.com/spider/tb/v/getAllVTaskDarenIds.wb?page='+_page+'&pageSize=20',
			beforeSend: function (XMLHttpRequest) {
	         		XMLHttpRequest.setRequestHeader("token", "KE923jddu#@(DFDJiw1dI$*FYHHHHH");
	             },
			success:function(res){
				resolve(res);
			}
		})
	})
}


//获取所有未抓取达人数据的文章列表
function getDarenArticleUrl(page){
	var _page = page||1;
	return new Promise(function(resolve,reject){
		$.ajax({
			url:'http://spider.ittun.com/spider/tb/front/getDarenArticleUrl.wb?page='+_page+'&pageSize=20',
			beforeSend: function (XMLHttpRequest) {
	         		XMLHttpRequest.setRequestHeader("token", "KE923jddu#@(DFDJiw1dI$*FYHHHHH");
	             },
			success:function(res){
				resolve(res);
			}
		})
	})
}

function sleep(numberMillis) {  
        var now = new Date();    
        var exitTime = now.getTime() + numberMillis;   
        while (true) { 
            now = new Date();       
            if (now.getTime() > exitTime) 
            return;    
        } 
    }

async function main(){
	var allArticle=[];
	var articleUrl = await getDarenArticleUrl();
	allArticle=allArticle.concat(articleUrl.result.list);
	//总页数大于1页做翻页处理
	if(articleUrl.result.maxPage>1){
		for(var i=2; i<=articleUrl.result.maxPage;i++){
			var pageData = await getDarenArticleUrl(i);
			allArticle=allArticle.concat(pageData.result.list);
		}
	}
	console.log('allArticle',allArticle,allArticle[0])
	return;
	//对每个URL做处理
	$.each(allArticle,function(ind,article){
		console.log(article);
		updateTab(article.url)
		/*chrome.tabs.getSelected(null, function(tab){
			 sleep(1000);
	        console.log(tab,tab.id,tab.url);
	        var _id=tab.id;
	        chrome.tabs.update(_id, {
				'url': article.url,
				'selected': true
			},function(result){
				console.log('update',result)
			});
	    });*/
	   sleep(500);
		/*chrome.tabs.getCurrent(function(tab){
			console.log(tab)
			chrome.tabs.update(tab.id, {
				'url': 'https://www.baidu.com',
				'selected': true
			});
		});*/
	})
	var darenIds = await getAllVTaskDarenIds();
	console.log('llll',articleUrl,darenIds);
}


function updateTab(url){
	chrome.tabs.getSelected(null, function(tab){
        var _id=tab.id;
        chrome.tabs.update(_id, {
			'url': url,
			'selected': true
		},function(result){
			console.log('update',result,_id)
			sleep(1000)
			chrome.tabs.sendRequest(_id, {greeting: "hello"}, function(response) {
			    console.log('adjslkf',response);
			});
		});
    });
}