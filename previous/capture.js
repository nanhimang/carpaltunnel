window.onload = function(){
	// 캡쳐 버튼 클릭 이벤트 등록
	document.getElementById("edit").addEventListener("click", function(e){
		// 마우스 커서 모양 변경 (eidt_cursor 클래스 추가)
		document.querySelector("body").classList.add("edit_cursor");
		screenshot(e);
	});
}

function screenshot(e){
	var body = document.querySelector('body');

	// 클릭한 마우스 떼는 이벤트 함수
	var mouseup = function(e) {
		html2canvas(document.body).then(
			function(canvas) { //전체 화면 캡쳐
				 // 선택 영역만큼 crop
                 var width = document.body.clientWidth;
                 var height= document.body.clientHeight;
				var img = canvas.getContext('2d').getImageData(0, 0, width, height);
				var c = document.createElement("canvas");
				c.width = width;
				c.height = height;
				c.getContext('2d').putImageData(img, 0, 0);
				save(c); // crop한 이미지 저장
			}
		);
		body.removeEventListener("mouseup", mouseup);
        // 마우스 커서 기본으로 변경
		document.querySelector("body").classList.remove("edit_cursor");
	}
	body.addEventListener("mouseup", mouseup);

    // 캡쳐한 이미지 저장
/* 	function save(canvas) { 
		if (navigator.msSaveBlob) {
			var blob = canvas.msToBlob();
			return navigator.msSaveBlob(blob, '파일명.jpg');
		} else {
			var el = document.getElementById("target");
			el.href = canvas.toDataURL("image/jpeg");
			el.download = '파일명.jpg';
			el.click();
		}
	}
 */
    function save(canvas) {
        // canvas를 blob 파일로 변환
        canvas.toBlob(function(blob) {
            var url = URL.createObjectURL(blob);
	    document.cookie=url;

            // <img> 태그에 표시
            document.getElementById("target").src = url;
        });
    }
}
