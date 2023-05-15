
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
            result.push("https://nanhimang.github.io/"+a);
          })
          return result
        }
      catch(err) {
          alert(err.message); 
        }
    }
    
