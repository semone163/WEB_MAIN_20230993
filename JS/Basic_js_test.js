var jb = 'hi'; //변수 선언 후 주석 가능(한줄)
var a = 1; //var로 변수 선언
var b;
b = 5;

/*
여러 줄 주석 : 여러 줄에 걸쳐 주석을 처리합니다.
*/

if (true){
    let c = 'let 접근'; //let으로 변수 선언 차이점
    var c_1 = 'var 접근';
}
//console.log(c); //Error?
console.log(c_1);

let d = 5; 
//let d = "값 재할당"; //Error?
console.log(d);

const e = '상수1 접근';
//e=5;
//const f //Error?
console.log(e);

//마우스 클릭의 이벤트 클릭했을 때 서치 함수를 호출한다. 메시지 창의 띄우는 함수
//문서에 특정 식별자를 인식한다. 검색하기라는 버튼의 특별 식별자를 지정해주지 않으면 자바스크립트가 알 수가 없다.
//search_btn" 식별자 모든 이벤트가 발생할 수 있는 곳에 지정해두어야 한다.
document.getElementById("search_btn").addEventListener("click", search_message);

//search 함수 수정 => 화살표 이용
//function search_message(){
//    alert("검색을 수행합니다!");
//}
const search_message = () => { //()는 인자값에 따라 다르다.
    const c = '검색을 수행합니다!';
    alert(c);
}