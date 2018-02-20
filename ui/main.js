console.log('Loaded!');

var element = document.getElementById("main-text");
element.innerHTML = "This is a modification through javascript";
var img = document.getElementById("madi");
var marginLeft = 0;
function moveRight()
{
    marginLeft+=1;
    img.style.marginLeft = marginLeft + "px";
}
img.onclick = function(){
    var interval = setInterval(moveRight,20)
    img.style.marginLeft = '100px';
}