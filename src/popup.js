
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
        value = data;
        parseHtml(value);
    }
    });
    
}


function parseHtml(html)
{
    var name = html.data.songList[0].songName;
    var author = html.data.songList[0].artistName;
    var link = html.data.songList[0].showLink;
    x = document.getElementById("name");
    x.innerHTML = name;
    y = document.getElementById("author");
    y.innerHTML = author;
    z = document.getElementById("down");
    z.innerHTML = link; 
}

function getMusicAddr(id)
{
    


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
