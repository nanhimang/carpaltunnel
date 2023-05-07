// _변수명 정의     
//#region 
let bg = document.getElementsByTagName('body')[0]; // 검은색 배경
let ttl = document.getElementsByClassName('title')[0]; // 게임 이름

/* let dsc = document.getElementsByClassName('desc')[0]; // 마무리 알림
let dsc_mk = document.getElementsByClassName('marked')[0]; // 마무리 알림
let dsc_p = document.querySelectorAll('.desc>p')[1]; // 랭킹 유도 멘트
 */
let ba = document.getElementsByClassName('bar a')[0]; //시간 진행 바
let bb = document.getElementsByClassName('bar b')[0];
let bc = document.getElementsByClassName('bar c')[0];
let bd = document.getElementsByClassName('bar d')[0];

let tpd = document.getElementsByClassName('touch')[0]; 
let ctn = document.getElementsByClassName('curtain')[0]; // start
let nm = tpd.getElementsByTagName('p')[1]; // play 화면

let ttl_e = document.querySelector('.title.end');
/* let rp = document.getElementsByClassName('report')[0];
let cp = document.getElementById('cps'); // click per second
let rtr = document.getElementById('retry'); //retry */

var op = 1; // 배경 투명도
var count = 0; // 클릭 카운트
var cps=0; // cps 결과
//#endregion

// .최초화면 + 게임화면 + 종료화면 
//#region   
// :최초화면 
ctn.addEventListener('mousedown', function () {
    ttl.style.color = "transparent";//해당 tag hid
    ctn.style.display = "none";//해당 tag hid
    nm.style.display = "inline-block";//해당 tag hid
// :게임화면 
    tpd.addEventListener('click', function () {
        op -= 0.01;
        bg.style.backgroundColor = "rgba(0,0,0," + op + ")";
    })
//  !performance로 소요시간을 계산하는 방식 대신에 setTimeout 함수를 활용하자! 
//  !굳이 즉시 실행 함수를 만들어 줄 필요없음! 

    // _게임종료 이벤트
    setTimeout(function gameover() {
        cps=count/10; //클릭시 count
        setCookie(cps);
        bg.style.transition="all 1s"; //10초 뒤 게임 종료되면 시간바 사라지고 배경 밝아짐
        bg.style.backgroundColor="white";
        ba.style.width="0%";
        bb.style.height="0%";
        bc.style.width="0%";
        bd.style.height="0%";

        // title 중앙에 표시
        tpd.removeEventListener('mousedown', expand_pad);
        tpd.removeEventListener('mouseup', reset_pad);

        tpd.style.transition = "all 1s";
        tpd.style.transform = "rotateY(180deg)";
        ttl_e.style.display="inline-block";

        setTimeout(function fadeoff(){
            ttl_e.style.transition="all 1s";
            ttl_e.style.opacity="0%";
            setTimeout(function loading(){
                location.href="CPS_result+이름입력_v1.4.html";
            },2000)
        },2000)
    }, 10000);

    //  _Counter 이벤트
    ba.style.width="100%"; //게임 시작되면 시간바 event
    setTimeout(function(){
        bb.style.height="100%";
    },2500)
    setTimeout(function(){
        bc.style.width="100%";
    },2500*2)
    setTimeout(function(){
        bd.style.height="100%";
    },2500*3)
    })
//#endregion


    // _쿠키 저장
    function setCookie(value) {
        var score = cps;
        var score_cookie = encodeURIComponent("score") + '=' + encodeURIComponent(score);
        document.cookie = score_cookie;
      }
      
//  .게임화면 
//  _마우스 누를 때 event 
//#region    
function expand_pad(){
    count += 1;
    nm.innerText = count
    nm.style.color = "red";
    nm.style.fontSize = "5rem";
    tpd.style.width = "25%";
}
tpd.addEventListener('mousedown', expand_pad); //카운트 및 글자 강조

//  _뗄 때 event
function reset_pad(){
    nm.style.color = "black";
    nm.style.fontSize = "3rem";
    tpd.style.width = "27%";    
}
tpd.addEventListener('mouseup', reset_pad);
//#endregion

/* //  .종료 화면     
//#region
function color_setTimeout(ii){ //글자 반짝반짝
    setTimeout(()=>
    {if (dsc_p.style.color=="rgb(57, 168, 242)"){
        dsc_p.style.color="black";}
    else{
        dsc_p.style.color="#39a8f2";}
    }, ii*500)
}

//  _retry 누를 때 event 
rtr.addEventListener('click',function(){ //확인 창 누르면 새로고침
    if(confirm("Try again?")){
        location.reload();
    }
})
//#endregion */
