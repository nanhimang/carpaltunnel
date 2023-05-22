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
                    console.log("executed count :"+count);
                    if (count == 50){
                        if (canvasArray.length == 50){
			    clearInterval(interval);
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
                          let img = canvas.getContext('2d',{ willReadFrequently: true }).getImageData(0,0,wd,hgt);
                          img.width = wd;
                          img.height = hgt;
                          let c = document.createElement("canvas");
                          c.width = wd;
                          c.height = hgt;
                          c.getContext('2d',{ willReadFrequently: true }).putImageData(img, 0, 0);
                          canvasArray.push(c);
                          count++;
                }
        });
    }, 100)
}


//.스크린 캡쳐 GIF 랜더링
function gifRandering(canvasArray){
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
