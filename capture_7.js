window.onload = function(){
	// 캡쳐 버튼 클릭 이벤트 등록
	document.getElementsByClassName("touch")[0].addEventListener("click", executing);
}

//.전체 함수 실행
function executing(e){
    document.getElementsByClassName("touch")[0].removeEventListener("click", executing);
    screenshot(e);
}


//.스크린 캡쳐 실행
    function screenshot(e){
        var canvasArray = [];
        var count = 0;
        var interval = setInterval(function(){
            html2canvas(document.body).then(
                function(canvas) {
                     var cWd = canvas.width;
                     var cHgt = canvas.height;
                    console.log("executed count :"+count);
                    if (count == 50){
                        if (canvasArray.length == 50){
                            console.log("clear interval!", canvasArray);
                            gifRandering(canvasArray);
                        }
                        else{
                            console.log("Still on pushing canvasArray...")
                        }
                    }
                    else{
                          var wd = document.body.clientWidth;
                          var hgt = document.body.clientHeight;
                          var wdG = cWd-wd;
                          var hgtG = cHgt-hgt;
                          var Wd = wd-wdG;
                          var Hgt = hgt-hgtG;
                          let img = canvas.getContext('2d',{ willReadFrequently: true }).getImageData(wdG, hgtG, Wd, Hgt);
                          img.width = Wd;
                          img.height = Hgt;
                          let c = document.createElement("canvas");
                          c.width = Wd;
                          c.height = Hgt;
                          c.getContext('2d',{ willReadFrequently: true }).putImageData(img, 0, 0);
                          canvasArray.push(c);
                          count++;
                }
        });
    }, 100)
}


//.스크린 캡쳐 GIF 랜더링
function gifRandering(canvasArray){
  clearInterval(timming);
  if (canvasArray.length==50){
    var gif = new GIF({
      workers: 2,
      quality: 10
    });
    console.log("gif loaded!");
    for (let k in canvasArray){
        const canvasElem = canvasArray[k];
        gif.addFrame(canvasElem,{delay:100});
    }
    gif.on('finished', function(blob) {
      console.log("All frame added!");
      console.log(blob);
      const reader = new FileReader();
      reader.onload = () => { 
        const dataURL = reader.result;
        localStorage.setItem('gif', dataURL);
        console.log(dataURL);
      }
      reader.readAsDataURL(blob);
  }, 'image/gif',0.5)
    gif.render();      
  }
}    
