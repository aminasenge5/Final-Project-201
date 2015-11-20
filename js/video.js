var pXY = document.getElementById("pXY");
var toSplit = document.getElementById("toSplit");
var vidBungee = document.getElementById("vidBungee");

var btnFlyAway = document.getElementById("btnFlyAway");

var imgFace = document.getElementById("imgFace");

var SA = []; // Elements after splitting text inside div into words.
var nSpan = 0; // Max number of spans to animate (SA's length)
var atRest = []; // Indicator array for SA's elements "at rest" (not being animated)

var HS = []; // Elements of SA whose bounding boxes contain a specific pt., to be animated

/* Split element E's contents into individual <span> elements ("words").
   Output: Array of span elements corresponding to each word inside E
*/
function makeSpans(E) {
  // Later: Recurse thru sub-tree and get all innerHTML's, to allow <h1> and so
  // on be inside the E, so that all visual elements can be animated ("crashed
  // through" by the moving icon).
  var strSpans = E.textContent.split(' '); // Array of strings, each a (text) "word"
  nSpan = strSpans.length; // Cache global var

  // Replace with spans
  E.innerHTML = '';
  for (var ii=0; ii < nSpan; ii++) {
    s = document.createElement('span');
    s.id = 'spin'+ii;
    s.className="atRest";
    s.innerHTML = strSpans[ii]+'&nbsp;';
    s.idNum = ii; // Custom property - just the number portion of the CSS id
    E.appendChild(s);
    SA.push(s);
    atRest.push(true); // Initial statue: element is at rest
  }
  return SA;
}

/* Find elements whose bounding boxes contain point x, y
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

function randInt(min, max) {
  r = Math.random();
  return min + Math.round(r*(max - min + 1));
}

// Text animation code
function crash(x, y) {
  HS = elementsAtPos(S, x, y);
  for (var ii=0; ii < HS.length; ii++) {
    var idNum = HS[ii].idNum;
    if (atRest[idNum]) { // Span is at rest
      var ri = randInt(0, 3);
      HS[ii].className = "se"+ri;
      atRest[idNum] = false;
    }
  }
  var SA = []; // Indicator array: spans being animated
}

var S = makeSpans(toSplit);

var xImg = 0;
var yImg = 0;
var dx = 2.6;
var dy = 3;
var yLimit = 750; // Hard-coded y-loc of face in initial video frame. Given more time, code this to be determined from element positions.
var anim_start_delay = 2000; // Wait __ seconds before animating
var anim_frame_time = 40;    // Time gap between "crasher" position updates

function moveFace() {
  var r = imgFace.getBoundingClientRect();
  if (r.bottom < yLimit) {
    xImg += dx;
    yImg += dy;
    imgFace.style.top  = yImg+"px";
    imgFace.style.left = xImg+"px";
    imgFace.style.opacity = 1 - (r.bottom / yLimit);
    setTimeout(moveFace, anim_frame_time);
    var ir = imgFace.getBoundingClientRect();
    crash(ir.right, ir.top);
    crash(ir.right, ir.bottom);
    crash(ir.left,  ir.bottom);
  } else {
      vidBungee.play();
   //console.log("img right,bottom = "+r.right + ", "+r.bottom);
  }
}

// Timer code to animate face image
setTimeout(moveFace, anim_start_delay);

