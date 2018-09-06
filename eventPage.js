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
			url:'http://spider.ittun.com/spider/tb/front/getDarenArticleUrl.wb?page='+_page+'&pageSize=2',
			beforeSend: function (XMLHttpRequest) {
	         		XMLHttpRequest.setRequestHeader("token", "KE923jddu#@(DFDJiw1dI$*FYHHHHH");
	             },
			success:function(res){
				resolve(res);
			}
		})
	})
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
	//对每个URL做处理
	$.each(allArticle,function(ind,article){

	})
	var darenIds = await getAllVTaskDarenIds();
	console.log('llll',articleUrl,darenIds);
}