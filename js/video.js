var SS = document.styleSheets[0];
var nOrigRules = SS.cssRules.length;  // Number of rules in default stylesheet (from .css file)
var nCurrRules = nOrigRules; // Number of rules in current stylesheet object

var pXY     = document.getElementById("pXY");
var spinEs  = document.getElementsByClassName("spin");
var toSplit = document.getElementById("toSplit");

var btnFlyAway  = document.getElementById("btnFlyAway");
var btnResetCSS = document.getElementById("btnResetCSS");

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

function addRule(sheet, selector, rules, index) {
  if ("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", index);
    nCurrRules++;
  }
  else if ("addRule" in sheet) {
    sheet.addRule(selector, rules, index);
    nCurrRules++;
  }
}

function randInt(min, max) {
  r = Math.random();
  return min + Math.round(r*(max - min + 1));
}

function echoPosition() {
  // Debug: Show mouse coords in paragraph
  var pos = getMouseXY();
  pXY.textContent = "Mouse x,y=("+pos.x+", "+pos.y+")";

  // Debug: Hit boxes for static test paragraph
  H = elementsAtPos(spinEs, pos.x, pos.y);
  for (var ii=0; ii < H.length; ii++) {
    H[ii].style.color = "red";
  }

  // Draft animation code
  // . Debug: Highlight span on mouseover and start animating span
  HS = elementsAtPos(S, pos.x, pos.y);
  for (var ii=0; ii < HS.length; ii++) {
    var idNum = HS[ii].idNum;
console.log("atRest[idNum="+idNum+"]="+atRest[idNum]);
    rules = "@-webkit-keyframes mymove { from {top:0px;} to {top:200px; -webkit-transform: rotate(146deg); -moz-transform: rotate(146deg); -o-transform: rotate(146deg); writing-mode: lr-tb;} }";
    rules = "";
    if (atRest[idNum]) { // Span is at rest
      var ri = randInt(0, 3);
      HS[ii].className = "se"+ri;
    //addRule(SS, "#"+HS[ii].id, rules, nCurrRules);
    //nCurrRules++;
      atRest[idNum] = false;
    }
  }
  var SA = []; // Indicator array: spans being animated
}

function resetCSSrules() {
  var extraRules = nCurrRules - nOrigRules;
  while (nCurrRules > nOrigRules) {
    nCurrRules--;
    SS.deleteRule(nCurrRules);
  }
  for (var ii; ii < atRest.length; ii++) {
    atRest[ii] = true; // Initial statue: element is at rest
  }
  for (var ii; ii < atRest.length; ii++) {
    HS[ii].className = "atRest";
  }
}

var S = makeSpans(toSplit);

// Debug: Treat mouse cursor as the "crasher" animated/flying image
btnResetCSS.addEventListener('click', function() { resetCSSrules(); }, true);
document.addEventListener('mousemove', function() { echoPosition(); }, true);

// Debug: Test timer code to animate head
