//Js 폴더의 login.js를 수정한다. 세션 set/get 함수를 추가 구현한다. 
//function session_set() { //세션 저장
    //let session_id = document.querySelector("#typeEmailX"); // DOM 트리에서 ID 검색
    //let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색    
    //if (sessionStorage) {
        //let en_text = encrypt_text(session_pass.value);
        //sessionStorage.setItem("Session_Storage_test", session_id.value);
        //sessionStorage.setItem("Session_Storage_pass", en_text);
    //} 
    //else {
        //alert("로컬 스토리지 지원 x");
        //}
    //}

function session_set(){ //세션 저장(객체)    
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let random = new Date(); // 랜덤 타임스탬프
        
    const obj = { // 객체 선언
        id : id.value,
        otp : random
    }
        
    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } 
    else {
        alert("세션 스토리지 지원 x");
    }   
}
    

function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_encrypted");
        //return sessionStorage.getItem("Session_Storage_test");
    }
    else {
        alert("세션 스토리지 지원 x");
        }
    }

    //세션 check 함수를 추가한다. 로그인 → 로그인 페이지에 다시 접속 하는 경우
function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_id")) {
        //if (sessionStorage.getItem("Session_Storage_test")) {
        alert("이미 로그인 되었습니다.");
        location.href='login/index_login.html'; // 로그인된 페이지로 이동
    }
}