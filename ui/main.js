var button = document.getElementById('counter');
button.onclick = function()
{
   counter++;
   var span = document.getElementById('count');
   span.innerHTML = counter.toString();
};