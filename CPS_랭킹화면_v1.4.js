// _변수명 정의     
//#region 
let bg = document.getElementsByTagName('body')[0]; // 검은색 배경
/* let ttl = document.getElementsByClassName('title')[0]; // 게임 이름
 */
/* let dsc = document.getElementsByClassName('desc')[0]; // 마무리 알림
let dsc_mk = document.getElementsByClassName('marked')[0]; // 마무리 알림
let dsc_p = document.querySelectorAll('.desc>p')[1]; // 랭킹 유도 멘트
 */
/* let ba = document.getElementsByClassName('bar a')[0]; //시간 진행 바
let bb = document.getElementsByClassName('bar b')[0];
let bc = document.getElementsByClassName('bar c')[0];
let bd = document.getElementsByClassName('bar d')[0];

let tpd = document.getElementsByClassName('touch')[0]; 
let ctn = document.getElementsByClassName('curtain')[0]; // start
let nm = tpd.getElementsByTagName('p')[1]; // play 화면

let ttl_e = document.querySelector('.title.end'); */
/* let rp = document.getElementsByClassName('report')[0];
let cp = document.getElementById('cps:); // click per second
let rtr = document.getElementById('retry'); //retry */


let tb = document.querySelector('table.rank');
let scr_area = document.getElementsByClassName('rank_table')[0];
//#endregion

// .데이터 가져와서 UI에 표출하기!
// 테스트 데이터
var userName= "dongni";
var cps = 12;
let users_data = [
    {name : "Yu-Jeong", cps:21},
    {name : "Yu-eong", cps:215},
    {name : "Yu-Jeng", cps:213},
    {name : "Y-Jeonnnnnnnnng", cps:23},
    {name : "Yu-Jeon", cps:21},
    {name : "Yu-Jeon", cps:21},
    {name : "Yu-Jeon", cps:21},
    {name : "Yu-Jeon", cps:21},
    {name : "Yu-Jeon", cps:21},
    {name : "Yu-Jeon2", cps:21}
];

// users_data.map(a=>a.cps);
users_data.sort((a,b)=>b.cps-a.cps);

var tablerow =  document.createElement('tr');
var td1 =  document.createElement('td');
var td2 =  document.createElement('td');
var td3 =  document.createElement('td');


//랭크 구하기
var index = 0;
var prev_data=0;
for (k of users_data){
    if (prev_data==k.cps){
    }
    else{
        index+=1;
    }
    let tablerow =  document.createElement('tr');
    let tr = tb.appendChild(tablerow);
    let td1 =  document.createElement('td');
    let td2 =  document.createElement('td');
    let td3 =  document.createElement('td');
    td1.innerText= index;
    td2.innerText=k.name;
    td3.innerText=k.cps;
    console.log(index);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    prev_data=k.cps;
}


// 랭크만큼 스크롤하기
var user_rank = 11;
function to_userscore(rk){
    var multiplecount=(rk-1-2);
    var scrolling = document.body.clientHeight*0.065*multiplecount;
    scr_area.scrollTop=scrolling;
}

function to_top(){
    scr_area.scrollTop(-scrolling);
}