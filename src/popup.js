//var temp;

// 异步调用
function readHTML(new_url){
    var value;
    value = $.ajax({
    type: "GET",
    url: new_url,
    dataType:'JSON',
    error: function(data)
    {
        alert(data);
    },
    success : function(data)
    {
        // 异步，此处解析
        temp = data;
        parseHtml(temp);
    }
    });
    //return temp;
}

// 解析JSON，然后使用rate大小做判断
function parseHtml(html)
{
    var name = html.data.songList[0].songName;
    var author = html.data.songList[0].artistName;
    var link = html.data.songList[0].showLink;
    var size = html.data.songList[0].size/(1024*1024);
    var rate = html.data.songList[0].rate;
    var format = html.data.songList[0].format;
    if(rate < 320)
    {
        songName = document.getElementById("songName");
        songName.innerHTML = name;
        artistName = document.getElementById("artistName");
        artistName.innerHTML = author;
        document.getElementById("standard_t").innerHTML = '<input id="standard" type="radio" name="chooserate" value=""> </input>'+'<span id="rate_s" class="rate-title"></span>'+'<span id="format_s" class="c9"></span>';
        rate_s = document.getElementById("rate_s");
        rate_s.innerHTML = "标准品质";
        document.getElementById("standard").value = link;
        format_s = document.getElementById("format_s");
        format_s.innerHTML = size.toFixed(1)+"M"+" / "+rate+"kbps"+" / "+format;
    }
    else if(rate > 320)
    {
        // 添加标签时，我用转义字符没成功，于是用单引号把双引号括起来了
        document.getElementById("ultimate_t").innerHTML = '<input id="ultimate" type="radio" name="chooserate" value=""> </input>'+'<span id="rate_u" class="rate-title"></span>'+'<span id="format_u" class="c9"></span>';

        rate_u = document.getElementById("rate_u");
        rate_u.innerHTML = "无损品质";
        document.getElementById("ultimate").value = link;
        format_u = document.getElementById("format_u");
        format_u.innerHTML = size.toFixed(1)+"M"+" / "+rate+"kbps"+" / "+format;
    }
    else
    {
        document.getElementById("high_t").innerHTML = '<input id="high" type="radio" name="chooserate" value=""> </input>' + '<span id="rate_h" class="rate-title"></span>'+'<span id="format_h" class="c9"></span>';
        rate_h = document.getElementById("rate_h");
        rate_h.innerHTML = "超高品质";
        document.getElementById("high").value = link;
        format_h = document.getElementById("format_h");
        format_h.innerHTML = size.toFixed(1)+"M"+" / "+rate+"kbps"+" / "+format;
    }
}

function getMusicAddr(id)
{
    //最多三种类型（可能四种，但是如果即存在128kbps的，也存在192kbps的
    //此处取192kbps的为标准品质，但如果不存在192kbps的，此链接会自动取128kbps的
    //使用ajax异步得到标准、超高、无损品质的属性值
    url_standard = "http://music.baidu.com/data/music/fmlink?songIds="+id+"&type=mp3&rate=192"; 
    readHTML(url_standard);
    url_high = "http://music.baidu.com/data/music/fmlink?songIds="+id+"&type=mp3&rate=320";
    readHTML(url_high);
    url_ultimate = "http://music.baidu.com/data/music/fmlink?songIds="+id+"&type=flac";
    readHTML(url_ultimate);
}

function bdMusicDownload()
{
    //获得是插件的URL地址，为 chrome-extension://*.pupup.tml
    //var url = window.location.href;
    chrome.tabs.getSelected(null,function(thisTab){
        var patt=new RegExp("http://music.baidu.com\/song\/[0-9]+");
        var music_url = patt.exec(thisTab.url);
        //从控制台看数据，string存储在music_url[0]里
        var id = music_url[0].substr(28);
        getMusicAddr(id);
    });
        
}


function choice(my_form)
{
    choice_id = document.forms[0].chooserate
    //单选框个数大于1时，是个数组，但是当为1时比较特殊，是个标签值，所以当为1时，判断未定义
    //可单步调试，当走过此位置时，在控制台输入choice_id和choice_id.length查看属性值
    if(typeof(choice_id.length) == "undefined")
    {
        //window.open(choice_id.value);
        alert("Hello");
    }
    else
    {
        for(i = 0; i < choice_id.length; ++i)
        {
            if(choice_id[i].checked)
            {
                //window.open(choice_id[i].value)
                alert("World");
            }
        }
    }
}

// 入口
document.addEventListener('DOMContentLoaded', function () {
    bdMusicDownload();
});

// 监听下载按钮是不是被click
window.addEventListener("load", function(){
  document.getElementById("button_id")
          .addEventListener("click",choice,false);
},false);


