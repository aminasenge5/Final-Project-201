var pXY     = document.getElementById("pXY");
var spinEs  = document.getElementsByClassName("spin");
var toSplit = document.getElementById("toSplit");

/*
var spinR = [];

for (var ii = spinEs.length; ii--;) {
  var e = spinEs[ii]; // Element
  var r = e.getBoundingClientRect(); // Rectangle
  console.log("spinEs["+ii+"] at [top="+r.top+", bot="+r.bottom+", left="+r.left+", right="+r.right+"]  value=" + e);
  spinR.push(r);
}*/

var nSpan = 0; // Number of spans to animate (at most)

/* Check to see which elements' bounding boxes contain the point x,y.
   Used for "hit detection" in the animation.
   IN   E   Element to "split" text contents into individual <span> elements, one element per "word"
   OUT  Array of span elements that correspond to each word inside the input element
*/
function splitSpans(E) {
  var S = []; // Array containing span elements after splitting el
  // Later: Recurse thru sub-tree and get all innerHTML's, to allow <h1> and so
  // on be inside the E, so that all visual elements can be animated ("crashed
  // through" by the moving icon).
  var strSpans = E.textContent.split(' '); // Array of strings, each string is a (text) word or symbol
  nSpans = strSpans.length; // Cache global var

  // Replace el sub-tree with spans
  E.innerHTML = '';
  for (var ii=0; ii < nSpans; ii++) {
    s = document.createElement('span');
    s.class = 'spanAnim';
    s.textContent = strSpans[ii]+' ';
    E.appendChild(s);
    S.push(s);
  }
  return S;
}

var S = splitSpans(toSplit);


/* Check to see which elements' bounding boxes contain the point x,y.
   Used for "hit detection" in the animation.
   IN   E    Array of DOM elements
        x,y  Query point's coords
   OUT  Array of elements that contain the query point
*/
function elementsAtPos(E, x, y) {
  var Ehits = []; // List of elements that contain P
  for (var ii = 0; ii < E.length; ii++) {
    var e = E[ii]; // Get one element
    // Bounding rectangle of element (do this each time -- user may resize the window during animation
    var r = e.getBoundingClientRect();
    if ((x > r.left) && (x < r.right) && (y > r.top) && (y < r.bottom)) {
      Ehits.push(e);
    //console.log("x,y="+x+","+y + " L,R/T,B="+r.left+","+r.right+ "/"+r.top+","+r.bottom);
    }
    else { e.style.color = "black"; } // Revert color once mouse is outside hitbox
  }
  return Ehits;
}

// Test input. May keep as an additional effect, but for, simulates "Gliding Andrew" which is to be coded
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

var H = []; // List of elements whose bounding box contains a specific point (coords)

function echoPosition() {
  var pos = getMouseXY();
  H = elementsAtPos(spinEs, pos.x, pos.y);
  for (var ii=0; ii < H.length; ii++) {
    H[ii].style.color = "red";
  }

  pXY.innerHTML = "Mouse x,y=("+pos.x+", "+pos.y+")";
}

document.addEventListener('mousemove', function() { echoPosition(); }, true);