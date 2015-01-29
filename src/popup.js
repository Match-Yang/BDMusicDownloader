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
    var size = html.data.songList[0].size/(1024*1024)
    var rate = html.data.songList[0].rate;
    var format = html.data.songList[0].format;
    if(rate < 320)
    {
        songName = document.getElementById("songName");
        songName.innerHTML = name;
        artistName = document.getElementById("artistName");
        artistName.innerHTML = author;
        document.getElementById("standard").value = link;
        format_s = document.getElementById("format_s");
        format_s.innerHTML = size.toFixed(1)+"M"+" / "+rate+"kbps"+" / "+format;
    }
    else if(rate > 320)
    {
        //var txt1 = '<input id="ultimate" class="down-radio" type="radio" name="chooserate" value=""';
        //$("ultimate_t").append(txt1);
        document.getElementById("ultimate_t").innerHTML = '<input id="ultimate" class="down-radio" type="radio" name="chooserate" value="">'+'<span id="rate_u" class="rate-title"></span>'+'<span id="format_u" class="c9"></span>';

        //"<input id=\"ultimate\" class=\"down-radio\" type=\"radio\" name=\"chooserate\" value=\"\">"
        rate_u = document.getElementById("rate_u");
        rate_u.innerHTML = "无损品质";
        document.getElementById("ultimate").value = link;
        format_u = document.getElementById("format_u");
        format_u.innerHTML = size.toFixed(1)+"M"+" / "+rate+"kbps"+" / "+format;
    }
    else
    {
        document.getElementById("high_t").innerHTML = '<input id="high" class="down-radio" type="radio" name="chooserate" value="">' + '<span id="rate_h" class="rate-title"></span>'+'<span id="format_h" class="c9"></span>';
        rate_h = document.getElementById("rate_h");
        rate_h.innerHTML = "超高品质";
        document.getElementById("high").value = link;
        format_h = document.getElementById("format_h");
        format_h.innerHTML = size.toFixed(1)+"M"+" / "+rate+"kbps"+" / "+format;
        //high.innerHTML = "超高品质"+link;
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
