// _변수명 정의     
//#region 
let wwpr = document.getElementsByClassName('whole_wrapper')[0]; // 검은색 배경
let bg = document.getElementsByTagName('body')[0]; // 검은색 배경
let dsc = document.querySelector('.desc.f'); 
let dsc_mk = document.querySelector('.desc.f>.marked'); // 마무리 알림
let dsc_p = document.getElementsByClassName('twinkle')[0]; // 랭킹 유도 멘트

    // =result page
let rp = document.getElementsByClassName('report')[0];
let cp = document.getElementById('cps'); // click per second
let rtr = document.getElementById('retry'); //retry
let dwn = document.getElementById('down'); //retry
let shre = document.getElementById('share'); //retry

    // =input page
let ip = document.getElementsByClassName('input')[0];
let dsc2 = document.querySelector('.desc.s'); 
let dsc2_mk = document.querySelector('.desc.s>.marked'); // 마무리 알림
let dsc2_ht1 = document.querySelectorAll('.hint')[0]; 
let dsc2_ht2 = document.querySelectorAll('.hint')[1]; 
let dsc2_ht3 = document.querySelectorAll('.hint')[2]; 
let user_nm = document.getElementById('name');
let mn = document.getElementsByClassName('whole_pad')[0];
let btp_back = document.querySelector('.pad.side'); //back to scroe
let btp_reset = document.querySelectorAll('.pad.side')[1]; //reset
//#endregion

function copyToClipboard() {
    navigator.clipboard.writeText('https://nanhimang.github.io/carpaltunnel/CPS_%EA%B2%8C%EC%9E%84_v1.6.html')
    alert('URL has been copied to the clipboard!');
}

//.로컬 데이터 불러오기
function displaying(){
    window.alert("Highlights downloaded!");
    var blobDataURL = localStorage.getItem('gif');
    var el = document.getElementById("target");
      el.href= blobDataURL;
      el.download="CarpalTunnelGame.gif";
      el.click();
    setTimeout(()=>{
        localStorage.removeItem('gif');   
    },10000);
  }

// .쿠키 불러오기
function getCookie(key) {
    try{
        const value = '; ' + document.cookie;
        const targetValue = value.split('; ' + key + '=');
        if (targetValue.length === 2) {
          return (targetValue.pop().split(';').shift());
        }
        else{return targetValue;}
    }
    catch(err) {
        alert(err.message); 
      }
  }

cp.innerText=getCookie('score');
setTimeout(page_opening,1500);

//  .종료 화면 
//#region
function color_setTimeout(ii){ //글자 반짝반짝
    setTimeout(()=>
    {if (dsc_p.style.color=="rgb(57, 168, 242)"){
        dsc_p.style.color="gray";}
    else{
        dsc_p.style.color="#39a8f2";}
    }, ii*500)
}

function page_opening(){ // 반짝반짝
    dsc_p.style.display="block";
    var i=0;
    /* ★. while은 조건문만 들어감 */
    while(i<10){
        color_setTimeout(i);
        i++;            
    }
}
    //  _retry 누를 때 event 
rtr.addEventListener('click',function(){ //확인 창 누르면 새로고침
    if(confirm("Try again?")){
        location.href="CPS_게임_v1.7.html";
    }
})
//#endregion

// .INPUT 화면연결 이벤트
//#region
function flip(){
    mn.style.transform="rotateY(80deg)";
}
function reflip(){
    mn.style.transform="rotateY(0deg)";
}
function page_transition(){
    rp.addEventListener('mouseover',flip);
    rp.addEventListener('mouseout',reflip);
    rp.addEventListener('mousedown',function(){
        rtr.style="display:none"; //컨텐츠 가림
        dwn.style="display:none"; //컨텐츠 가림
        shre.style="display:none"; //컨텐츠 가림
        dsc.style="display:none";
        dsc2.style="display:block"; //컨텐츠 보임
        mn.style.transform="rotateY(180deg)";
        btp_back.style.display="flex";
        btp_reset.style.display="flex";
        rp.removeEventListener('mouseover',flip);
        rp.removeEventListener('mouseout',reflip);
    });
}
function page_back(){
    rp.addEventListener('mouseover',flip);
    rp.addEventListener('mouseout',reflip);
    rtr.style="display:block; font-size:4rem;"; //컨텐츠 가림
    dwn.style="display:block; font-size:4rem;"; //컨텐츠 가림
    shre.style="display:block; font-size:4rem;"; //컨텐츠 가림
    dsc.style="display:block";
    dsc2.style="display:none"; //컨텐츠 보임
    btp_back.style="display:none";
    btp_reset.style="display:none";
    mn.style.transform="rotateY(0deg)";
}
    setTimeout(page_transition,1500);
//#endregion

// .INPUT 화면
btp_back.addEventListener('click',function(){
    page_back();
})
btp_reset.addEventListener('mousedown',function(){
    ip.style.backfaceVisibility="visible";
    mn.style.animation= "flipping .1s 5";
    user_nm.value="";
    dsc2_ht1.style.display="none";
    dsc2_ht2.style.display="none";   
    dsc2_ht3.style.display="none";  
})
btp_reset.addEventListener('mouseup',function(){
    ip.style.backfaceVisibility="hidden";
    mn.style.animation= "";
    user_nm.value="";
})



 
// 입력값이 있을 경우 1번째 문장 제시
user_nm.addEventListener('keyup',function(e){
    if (user_nm.value.length==0){
        dsc2_ht1.style.display="none";
        dsc2_ht2.style.display="none";   
        dsc2_ht3.style.display="none";   
        if (e.code=="Enter"){
            dsc2_ht3.style.display="block";
            dsc2_ht3.style.color="red";
        }
    }
    if (user_nm.value.length>0){
        dsc2_ht1.style.display="block";
        dsc2_ht2.style.display="none";
        dsc2_ht3.style.display="none";   
        if (e.code=="Enter"){
            page_fadeout();
        }
    else if (user_nm.value.length>10){
            dsc2_ht1.style.display="none";
            dsc2_ht2.style.display="block";
            dsc2_ht3.style.display="none";   
        }
    }
});



// .INPUT fadeout
function page_fadeout(){
    wwpr.style.opacity = "0";
    bg.style.backgroundColor="black";

    setTimeout(function(){
        location.href="CPS_랭킹화면_v1.7.html";
    },1000);
}
