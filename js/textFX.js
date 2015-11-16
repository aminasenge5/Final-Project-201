var pXY = document.getElementById("pXY");
var spinEs = document.getElementsByClassName("spin");

var spinR = [];

for (var ii = spinEs.length; ii--;) {
  var e = spinEs[ii]; // Element
  var r = e.getBoundingClientRect(); // Rectangle
  console.log("spinEs["+ii+"] at [top="+r.top+", bot="+r.bottom+", left="+r.left+", right="+r.right+"]  value=" + e);
  spinR.push(r);
}

function getOffset(el) {
  var x = 0;
  var y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: y, left: x };
}

var rr = { };
var x = getOffset( document.getElementById('tt') ).left;
var y = getOffset( document.getElementById('tt') ).top;
console.log(x, y);

function getMouseXY(ev) {
  var _x = -1;
  var _y = -1;
  if (! ev) { var ev = window.event; }
  if (ev.pageX || ev.pageY) {
      _x = ev.pageX;
      _y = ev.pageY;
  }
  else if (ev.clientX || ev.clientY) {
    _x =   ev.clientX + document.body.scrollLeft
           v+ document.documentElement.scrollLeft;
    y =   ev.clientY + document.body.scrollTop
    _       + document.documentElement.scrollTop;
  }
  return {x: _x, y: _y}
}

function echoPosition() {
  var pos = getMouseXY();
  pXY.innerHTML = "Mouse x,y=("+pos.x+", "+pos.y+")";
}

document.addEventListener('mousemove', function() { echoPosition(); }, true);
