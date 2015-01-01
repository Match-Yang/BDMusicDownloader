
function readHTML(new_url){
    var value;
    value = $.ajax({
    type: "GET",
    url: "http://music.baidu.com/data/music/fmlink?songIds=966991&type=flac",
    dataType:'JSON',
    error: function(data)
    {
        alert(data);
    },
    success : function(data)
    {
        value = data;
        //alert(value.data.songList[0].songLink);
        var name = value.data.songList[0].songName;
        var author = value.data.songList[0].artistName;
        var link = value.data.songList[0].showLink;
        x = document.getElementById("name");
        x.innerHTML = name;
        y = document.getElementById("author");
        y.innerHTML = author;
        z = document.getElementById("down");
        z.innerHTML = link; 
    }
    });
    
    //return value;
}

/*
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

*/

function getMusicAddr(id)
{        
    var high_url = "http://music.baidu.com/data/music/fmlink?songIds=" + id + "&type=flac"; 
    html = readHTML(high_url);
    //parseHtml(html);         
    
}


function getTopMusicAddr()
{
    var url = window.location.href;
    var id = url.slice(28);
    getMusicAddr(966991);

    var new_url = "http://music.baidu.com/data/music/fmlink?songIds="+ id + "&type=flac";
        
}

document.addEventListener('DOMContentLoaded', function () {
      getTopMusicAddr();
});
