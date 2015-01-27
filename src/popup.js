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
    var rate = html.data.songList[0].rate;
    //alert(name);
    if(rate < 320)
    {
        standard = document.getElementById("name");
        standard.innerHTML = name;
        standard = document.getElementById("standard");
        standard.innerHTML = "标准品质"+link;
    }
    else if(rate > 320)
    {
        ultimate = document.getElementById("ultimate");
        ultimate.innerHTML = "无损品质"+link;
    }
    else
    {
        high = document.getElementById("high");
        high.innerHTML = "超高品质"+link;
    }
}

function getMusicAddr(id)
{
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
        //alert(music_url[0].substr(28));
        var id = music_url[0].substr(28);
        getMusicAddr(id);
    });
        
}

document.addEventListener('DOMContentLoaded', function () {
    bdMusicDownload();
});
