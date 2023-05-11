window.onload = function(){
	// 캡쳐 버튼 클릭 이벤트 등록
	document.getElementById("edit").addEventListener("click", function(e){
		// 마우스 커서 모양 변경 (eidt_cursor 클래스 추가)
		screenshot(e);
	});
}

//.스크린 캡쳐 실행
    function screenshot(e){
        var canvasArray = []; // canvas 객체를 저장할 배열
        var count = 0;
        // setInterval 함수를 사용하여 일정한 간격으로 screenshot 함수를 호출
        var interval = setInterval(function(){
            html2canvas(document.body).then(
                function(canvas) { //전체 화면 캡쳐
                     // 선택 영역만큼 crop
                    console.log("executed count :"+count);
                    if (count == 100){
                        if (canvasArray.length == 100){
                            clearInterval(interval);
                            console.log("clear interval!", canvasArray);
                            CanvastoBlob(canvasArray);
                        }
                        else{
                            console.log("Still on pushing canvasArray...")
                        }
                    }
                    else{
                          let width = document.body.clientWidth;
                          let height = document.body.clientHeight;
                          let img = canvas.getContext('2d',{ willReadFrequently: true }).getImageData(0, 0, width, height);
                          img.width=500;
                          img.height=500;
                          let c = document.createElement("canvas");
                          c.width = 500;
                          c.height = 500;
                          c.getContext('2d',{ willReadFrequently: true }).putImageData(img, 0, 0);
                          canvasArray.push(c);
                          count++;
                }
        });
    }, 100)
    }


    function CanvastoBlob(canvasarray){

        var BlobURLArray = [];
        var count = 0;
        console.log("start Blobing!")
        for (var k in canvasarray){
            count++;
            console.log("Blobbing count:"+count);
            let c = canvasarray[k];
            c.toBlob(function(blob) { //이미지 Blob로 변환
                var BlobURL = URL.createObjectURL(blob);
                BlobURLArray.push(BlobURL);

                if (BlobURLArray.length >= 100) {
                    var BlobURLArray_copy=[];
                    console.log("Blobbing done!", BlobURLArray);
                    console.log("Making cookie!");
                    BlobURLArray.forEach((BlobURL)=>{
                                                        var text = String(BlobURL);
                                                        var new_text = text.replace("blob:http://127.0.0.1:3000/","");
                                                        BlobURLArray_copy.push(new_text);
                    });
                    if (BlobURLArray_copy.length==100){
                        console.log("cookie Maked!");
                        setTimeout(function loading(){
                            var cookie = BlobURLArray_copy.toString();
                            var cookie_key = "blob="+cookie
                            document.cookie = cookie_key;
                            var cookieAdded = String(document.cookie);
                            if(cookieAdded.includes('blob')){
                            location.href="CPS_result+이름입력_v1.4.html";
                            }
                        },3000)
                        return true;
                    }
                }
            }, 'image/png', 1);
        }
    }


//.스크린 캡쳐 표출
    function displaying(){
        var BlobURLArray_fromCookie= getCookie('blob');
        var ImageArray=[];
        for (let k in BlobURLArray_fromCookie){
            const img = new Image();
            const imgSrc = BlobURLArray_fromCookie[k];
            img.src = imgSrc;
            ImageArray.push(img);
            console.log("image pushed");     
            console.log(ImageArray);     
        }

      if (ImageArray.length==100){
        var gif = new GIF({
          workers: 2,
          quality: 10,
          width: 500,
          height : 500
        });
        console.log("gif loaded!");
        for (let k in ImageArray){
            const ImageElem = ImageArray[k];
            gif.addFrame(ImageElem,{delay:200});
        }
        gif.on('finished', function(blob) {
          console.log("All frame added!");
          window.open(URL.createObjectURL(blob));
          var el = document.getElementById("target");
          el.download = "파일명.gif";
          el.click();
        });
        gif.render();      
      }
    }
    
    
    //: cookie 조회 및 BlobURL로 변환
    function getCookie(key) {
      try{
          var value = '; ' + document.cookie;
          var cookieText = value.split('; ' + key + '=');
          if (cookieText.length === 2) {
                                          var CookieText = cookieText.pop().split(';').shift();
                                        }
          else                         {
                                          var CookieText = cookieText;
                                        }

          var cookieArray=CookieText.split(",");
          var result = [];
          cookieArray.forEach((a)=>{
            result.push("blob:http://127.0.0.1:3000/"+a);
          })
          return result
        }
      catch(err) {
          alert(err.message); 
        }
    }
    