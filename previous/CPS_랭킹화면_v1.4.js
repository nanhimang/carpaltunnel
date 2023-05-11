const firebaseConfig = {  databaseURL:"https://carpaltunnel.firebaseio.com",}
const app = initializeApp(firebaseConfig);
const auth = getAuth();
signInanonymously(auth)
    .then(()=>{})
    .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
    });

onAuthStateChanged(auth, (user)=>{
    if(user){
        const uid = user.uid;
    }
    else{}
});
const database = getDatabase();

// _변수명 정의     
//#region 
let bg = document.getElementsByTagName('body')[0]; // 검은색 배경

let tb = document.querySelector('table.rank');
let scr_area = document.getElementsByClassName('rank_table')[0];
//#endregion

// .데이터 가져와서 UI에 표출하기!
// 테스트 데이터
var userName= "dongni";
var userCps = 12;
let profile;


// 데이터 쓰기
database.ref('ranking/'+auth.user).set({
    name : userName,
    cps : userCps
})

// 데이터 읽기
database.ref('ranking').once('value').then(function(snapshot){
    result=snapshot.val();
    profile={...result};
});
const user_data = Object.values(profile);
users_data.sort((a,b)=>b.cps-a.cps);
const user_rank1 = {...users_data};
const user_rank2 = user_rank1.map((a)=>a.cps);
const user_rank2_1 = new Set(user_rank2);
const user_ran2_2 = new Array.from(user_rank2_1);
const user_rank = user_rank2_2.indexOf(userCps)+1;


var tablerow =  document.createElement('tr');
var td1 =  document.createElement('td');
var td2 =  document.createElement('td');
var td3 =  document.createElement('td');


//랭크 구하기
var index = 0;
var prev_data=0;
for (k of user_rank1){
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
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    prev_data=k.cps;
}


// 랭크만큼 스크롤하기
function to_userscore(rk){
    var multiplecount=(rk-1-2);
    var scrolling = document.body.clientHeight*0.065*multiplecount;
    scr_area.scrollTop=scrolling;
}

function to_top(){
    scr_area.scrollTop=0;
}

setTimeout(to_userscore(),2000,user_rank);
