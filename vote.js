function mylog(v) { divStats.innerHTML += (v + "<br>"); }

function resetImgs() {
  idxSelect = -99;
  voteAllowed = true;
  imgLeftE.className  = "imgNormal";
  imgRightE.className = "imgNormal";
}

function resetPool() { // Once all images have been shown, start over
  resetImgs();
   // Slice() forces copy by value (doesn't just create a reference)
  fnPool  = img_fn.slice();
  idxPool = img_idx.slice();
  if (myChartObj) { delete myChartObj; }
}

function global_init() {
  // Don't use "var" in this function; we need to init global vars

  img_fn = ["fish1.jpg", "fish2.jpg", "fish3.jpg", "fish4.jpg", "fish5.jpg", "k1.jpg", "k2.jpg", "k3.jpg", "k4.jpg", "k5.jpg", "nk1.jpg", "nk2.jpg", "nk3.jpg", "nk4.jpg", "nk5.jpg", "nk6.jpg", "nk7.jpg", "nk8.jpg", "nk9.jpg", "nk10.jpg"];
  
  // Only 10 images here. Add at least 10 more images of your own!

  // To track which imgs' indices of the original array have already by shown
  img_idx = [];
  for (var ii=0; ii < img_fn.length; ii++) { img_idx[ii] = ii; }

  imgDir = "./img/"

  imgLeftE  = document.getElementById("imgLeft");
  imgRightE = document.getElementById("imgRight");
  btnVote   = document.getElementById("btnVote");
  btnNew    = document.getElementById("btnNew");
  divStats  = document.getElementById("divStats");
  myChart   = document.getElementById("myChart");

  ctx = myChart.getContext("2d");
  myChartObj = 0;

  resetPool();

  imgLeftE.addEventListener( "click", selectImg);
  imgRightE.addEventListener("click", selectImg);
  imgLeftE.addEventListener( "mouseover", selectImg);
  imgRightE.addEventListener("mouseover", selectImg);

  btnVote.addEventListener("click", recordVote);
  btnNew.addEventListener("click", newPair);
}

function getRandIntOnRange (a, b) {
  var r = Math.random();
  var t = a + Math.floor(r * (b-a+1));
  return t;
}

function showRandImg(imgE) {
  var maxIdx = fnPool.length - 1;
  if (maxIdx < 1) {
    resetPool();
    maxIdx = fnPool.length - 1;
  }

  var idx = getRandIntOnRange(0, maxIdx);
  imgE.src = imgDir + fnPool[idx];
   // Extend object to have an property that holds idx w.r.t. original fn array
  imgE.idxOrig = idxPool[idx];

  // Rmove chosen img filename. ( Note: this is faster than using splice(). )
  fnPool[idx] = fnPool[maxIdx];
  fnPool.pop();
  idxPool[idx]= idxPool[maxIdx];
  idxPool.pop();
}

function selectImg() {
  if (voteAllowed) {
    resetImgs();
    this.className = "imgPicked";
    idxSelect = this.idxOrig;
  }
}

function recordVote() {
  if (idxSelect > -1) {
    console.log("voted. idxSelect="+idxSelect);
    voteAllowed = false;
    btnVote.style.visibility = "hidden";
    showChart();
  }
}

function showChart() {
  // The charting code here is just a placeholder, and is NOT the best way to
  // show votes or relative popularity. Improve the code below to generate more
  // easily understandable charts.

  console.log("showChart()");
  var fnL = img_fn[imgLeftE.idxOrig];
  var fnR = img_fn[imgRightE.idxOrig];
  var labelL = fnL.split(".")[0];
  var labelR = fnR.split(".")[0];

  var data = {
    labels: [labelL, labelR],
    datasets: [
      { label: "Raw votes",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: [5, 2] // Bogus data -- use your vote counts instead
      },
      { label: "Percentage split",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: [5/(5+2), 2/(5+2)]
      }
    ]
  };

  // This call to create the chart does not include options as an arg. Modify
  // this to use options that make the labels, colors, etc.  match the look and
  // feel of the rest of your web page.
  //
  // Options (see www.chartjs.org/docs/) should look similar to this:
  //
  //  { //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
  //    scaleBeginAtZero : true,
  //
  //    //Boolean - Whether grid lines are shown across the chart
  //    scaleShowGridLines : true,
  //
  //    ... and so on...
  myChartObj = new Chart(ctx).Bar(data);


  /*** !! Insert code HERE to draw your chart and make it visible !! ***/


  btnNew.style.display = "inline";
  btnNew.style.visibility = "visible";
}

function newPair() {
  console.log("newPair()");  
  btnNew.style.visibility = "hidden";
  btnVote.style.visibility = "visible";


  /*** !! Insert code HERE to hide your chart !! ***/

  // This might correctly free some memory, but it doesn't wipe or hide the
  // graphic that is "cached" in your <canvas>
  if (myChartObj) { delete myChartObj; }


  if (fnPool.length < 2) {
    console.log("Not enough images left. Resetting pool");  
    resetPool();
  }

  voteAllowed = true;
  showRandImg(imgLeftE);
  showRandImg(imgRightE);
}

global_init();

showRandImg(imgLeftE);
showRandImg(imgRightE);
