var maincontainer = document.querySelector("#maincontainer #content")
var sidecontainer = document.querySelector("#maincontainer #sidebar")
var isscontainer = document.querySelector("#logScore")
var warenkorb = [];

function init(){
  if (warenkorb.length != null) {
    var warenkorbstring = "";
    for (var i = 0; i < warenkorb.length; i++) {
      warenkorbstring+='<span class="warenkorbitem">'+warenkorb[i]+'</span>'
    }
    sidecontainer.innerHTML = warenkorbstring
  }

  calcISS();

  maincontainer.innerHTML =
  '<div id="buttonwrapper"><div class="mainButton"><span class="regionID">1</span><img src="head.png" alt="" class="mainButtonImage"/></div><div class="mainButton" onclick="showMore(1)"><span  class="regionID">2</span>      <img src="Kopficon.png" alt="" class="mainButtonImage"/>    </div>    <div class="mainButton">      <span class="regionID">3</span>      <img src="chest.png" alt=""class="mainButtonImage"/>    </div>    <div class="mainButton">      <span  class="regionID">4</span>      <img src="abdominal.png" alt="" class="mainButtonImage"/>    </div>    <div class="mainButton">      <span class="regionID">5</span>      <img src="extremities.png"alt="" class="mainButtonImage"/>    </div>    <div class="mainButton">      <span class="regionID">6</span>      <img src="external.png" alt="" class="mainButtonImage"/>    </div> </div></div>'
}

function showMore(region) {
  maincontainer.innerHTML = ""
  if(region == 1){
    maincontainer.innerHTML = '<div class="mainButton" onclick="showMore(2)"><span class="textView">Organe</span></div><div class="mainButton"><span class="textView">Nerven</span></div><div class="mainButton"><span class="textView">Knochenverletzung</span></div>'
  } else if (region == 2) {
    maincontainer.innerHTML = '<div class="mainButton" onclick="showMore(3)"><span class="textView">Auge</span></div><div class="mainButton"><span class="textView">Nase</span></div><div class="mainButton"><span class="textView">Mund</span></div>'
  } else if (region == 3) {
    maincontainer.innerHTML = '<span class="tableView" onclick="pushId(340499.1)">Verletzung</span><span class="tableView" onclick="pushId(341006.2)">Verletzung mit Retinaablösung</span><span class="tableView" onclick="pushId(241200.2)">Verletzung der äußeren Augenhaut</span><span class="tableView" onclick="pushId(240402.4)">Abriss, Enukleation einseitig</span><span class="tableView" onclick="pushId(540403.3)">Abriss, Enukleation beidseitig</span>'
  }
}

function pushId(id){
  warenkorb.push(id)
  init()
}

function calcISS(){
  if (warenkorb.length!=0) {

    let issScore = 0
    var list = {}
    var allSquares = []

    for (let i = 0; i < warenkorb.length; i++) {
      let region = warenkorb[i].toString()[0]; //1-6
      let degOfInjury = Math.pow(parseInt(warenkorb[i].toString().split('.')[1]),2)

      if (list[region] == undefined) {
        list[region] = degOfInjury
      } else if (list[region] < degOfInjury) {
        list[region] = degOfInjury
      }
      // issScore += Math.pow(parseInt(warenkorb[i].toString().split('.')[1]),2)
    }

    for(let region in list){
      allSquares.push(list[region])
    }

    allSquares.sort(function(a,b){return b-a})

    if (allSquares.length > 2) {
      for (let i = 0; i < 3; i++) {
        issScore += allSquares[i]
      }
      isscontainer.innerHTML = "Der aktuelle ISS Score ist "+issScore+". Er besteht aus "+allSquares[0]+"+"+allSquares[1]+"+"+allSquares[2]+"."
    }

  }
}

init();
