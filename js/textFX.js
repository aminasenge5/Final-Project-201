var pXY = document.getElementById("pXY");
var spinEs = document.getElementsByClassName("spin");

var spinR = [];

for (var ii = spinEs.length; ii--;) {
  var e = spinEs[ii]; // Element
  var r = e.getBoundingClientRect(); // Rectangle
  console.log("spinEs["+ii+"] at [top="+r.top+", bot="+r.bottom+", left="+r.left+", right="+r.right+"]  value=" + e);
  spinR.push(r);
}

/*function getOffset(el) {
  var x = 0;
  var y = 0;
  while ( el && (! isNaN(el.offsetLeft)) && (! isNaN(el.offsetTop)) ) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop  - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: y, left: x };
}

var x = getOffset( document.getElementById('tt') ).left;
var y = getOffset( document.getElementById('tt') ).top;
console.log(x, y);*/

/* Check to see which elements' bounding boxes contain the point x,y.
   Used for "hit detection" in the animation.

   IN   E    Array of DOM elements
        x,y  Query point's coords

   OUT  List of elements that contain the query point
*/
function elementsAtPos(E, x, y) {
  var Ehits = []; // List of elements that contain P
//console.log("here. E.length = "+E.length);
  for (var ii = 0; ii < E.length; ii++) {
    var e = E[ii]; // Get one element
    var r = e.getBoundingClientRect(); // Bounding rectangle of element

    if ((x > r.left) && (x < r.right) && (y > r.top) && (y < r.bottom)) {
      console.log("x,y="+x+","+y + " L,R/T,B="+r.left+","+r.right+ "/"+r.top+","+r.bottom);
      Ehits.push(e);
    }
    else { e.style.color = "black"; }
  }

  return Ehits;
}

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

var H = [];

function echoPosition() {
  var pos = getMouseXY();
  H = elementsAtPos(spinEs, pos.x, pos.y);
  for (var ii=0; ii < H.length; ii++) {
    console.log(H[ii]);
    H[ii].style.color = "red";
  }

  pXY.innerHTML = "Mouse x,y=("+pos.x+", "+pos.y+")";
}

document.addEventListener('mousemove', function() { echoPosition(); }, true);
