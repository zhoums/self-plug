
$(function(){
    var checkPlugNode = document.createElement('div');
    checkPlugNode.id = 'my-chrome-extension-installed';
    checkPlugNode.style.display = 'none';
//    checkPlugNode.setAttribute('version', chrome.extension.getManifest().version); // 把版本号放到属性里
    checkPlugNode.innerText=JSON.stringify({key: 'value'}); // 把通信的data放到标签的html text里面
    document.body.appendChild(checkPlugNode);
    
    
    //登录成功后操作
    var sucLoginBtn = document.getElementById('suc-login-tb'),
        smartSetBtn = document.getElementById('smartSet'),
        rollBackDataBtn = document.getElementById('rollBackData');
    sucLoginBtn.addEventListener('eventByLogin', function() {
        $("#step-data").addClass("s-step-ed");
        $("#s-step-tip-1").hide();
        $("#s-step-tip-2").hide();
        $("#s-step-tip-3").show();
        //三分钟后关闭插件弹窗
        setTimeout(function(){
             $('.plug-step-win').fadeOut("fast");
         },1000*60*6);
        let darenId = $('#smartSet').attr("data-darenid")||10000,
        darenName = encodeURIComponent($('#smartSet').attr("data-darenname")||10000),
        tk = $('#smartSet').attr("data-token")||10000;

        chrome.runtime.sendMessage({greeting: "triggerConfig",head:"tk="+tk+"&darenId="+darenId+"&darenName="+darenName}, function(response) {
            setTimeout(function(){
                $("#rollBackData").trigger("click")
            },3000)
        });
    })
    //
    smartSetBtn.addEventListener('eventBySmartSet',function(){
        //从淘宝获取用户信息判断是否登录
        $.ajax({
            url:'https://sycm.taobao.com/custom/menu/getPersonalView.json',
            success:function(res){
                if(res.code==0){
                    $("#step-data").addClass("s-step-ed");
                    $("#s-step-tip-1").hide();
                    $("#s-step-tip-2").hide();
                    $("#s-step-tip-3").show();
                    //三分钟后关闭插件弹窗
                    setTimeout(function(){
                         $('.plug-step-win').fadeOut("fast");
                     },1000*60*3);
                    let darenId = $('#smartSet').attr("data-darenid")||10000,
                    darenName = encodeURIComponent($('#smartSet').attr("data-darenname")||10000),
                    tk = $('#smartSet').attr("data-token")||10000;

                    chrome.runtime.sendMessage({greeting: "triggerConfig",head:"tk="+tk+"&darenId="+darenId+"&darenName="+darenName}, function(response) {
                        console.log('数据回填开始。。。')
                        setTimeout(function(){
                            $("#rollBackData").trigger("click")
                        },3000)
                    });
                }
            }   
        })        
    });
    rollBackDataBtn.addEventListener('eventByRollBackData',function(){
        let darenId = $('#smartSet').attr("data-darenid")||10000,
        darenName = encodeURIComponent($('#smartSet').attr("data-darenname")||10000),
        tk = $('#smartSet').attr("data-token")||10000;
        let headObj={darenId:darenId,tk:tk,darenName:darenName};
        chrome.runtime.sendMessage({greeting: "fetchConfig"}, function(response) {
            if(!response){
                let darenId = $('#smartSet').attr("data-darenid")||10000,
                    darenName = encodeURIComponent($('#smartSet').attr("data-darenname")||10000),
                    tk = $('#smartSet').attr("data-token")||10000;

                chrome.runtime.sendMessage({greeting: "triggerConfig",head:"tk="+tk+"&darenId="+darenId+"&darenName="+darenName}, function(response) {
                    console.log('数据回填开始。。。')
                    setTimeout(function(){
                        $("#rollBackData").trigger("click")
                    },3000)
                });
            }else{
                //爬数据
                chrome.runtime.sendMessage({greeting:"spider",interFaceList:response.result,head:headObj});
                
            }
            
        });
    });
    
})
