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
  var mx = -1;
  var my = -1;
  if (! ev) { var ev = window.event; } // If event not passed in (more portable)
  if (ev.pageX || ev.pageY) {
    mx = ev.pageX;
    my = ev.pageY;
  }
  else if (ev.clientX || ev.clientY) {
    mx = ev.clientX + document.body.scrollLeft;
    my = ev.clientY + document.body.scrollTop;
  }
  return {x: mx, y: my}
}

function echoPosition() {
  var pos = getMouseXY();
  pXY.innerHTML = "Mouse x,y=("+pos.x+", "+pos.y+")";
}

document.addEventListener('mousemove', function() { echoPosition(); }, true);
