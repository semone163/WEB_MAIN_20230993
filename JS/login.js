//13주
function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/JS/security.js'); // 암복호화 함수
addJavascript('/JS/session.js'); // 세션 함수
addJavascript('/JS/cookie.js'); // 쿠키 함수


//js 폴더에 login.js 파일의 check_xss 함수를 추가한다.
const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;
    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);
    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizedInput !== input) {
    // XSS 공격 가능성 발견 시 에러 처리
    alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;
    }
    // Sanitized된 값 반환
    return sanitizedInput;
    };

const check_input = () => {
    
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    // 전역 변수 추가, 맨 위 위치
    const idsave_check = document.getElementById('idSaveCheck');

    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    if (emailValue === '') {
    alert('이메일을 입력하세요.');
    return false;
    }
    if (passwordValue === '') {
    alert('비밀번호를 입력하세요.');
    return false;
    }

    if(emailValue.length >10){
        alert('아이디는 10글자 이하로 입력해야 합니다.')
        return false
    }

//이메일, 패스워드 입력 값의 길이를 체크
    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }
    if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;
    }
    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    //js 폴더에 login.js 파일의 check_input 함수를 수정한다.
    const sanitizedPassword = 
    check_xss(passwordValue);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
    // check_xss 함수로 비밀번호 Sanitize
    
    if (!sanitizedEmail) {
        // Sanitize된 비밀번호 사용
        return false;
    }
    if (!sanitizedPassword) {
        // Sanitize된 비밀번호 사용
        return false;
    }
    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전
    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
        }
    else
        { // 아이디 체크 x
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
        }

        session_set();
        //Form.submit();
        loginForm.submit();
    };


    //로그인 페이지 - 아이디 자동 삽입
    function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
        const emailInput = document.getElementById('typeEmailX');
        const idsave_check = document.getElementById('idSaveCheck');
        let get_id = getCookie("id");
        if(get_id) {
            emailInput.value = get_id;
            idsave_check.checked = true;
        }
        session_check(); // 세션 유무 검사
    }

document.getElementById("login_btn").addEventListener('click', check_input);

// 로그인/로그아웃 횟수 쿠키 저장하
function login_count(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/";
}

function logout_count(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for (var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] == name) {
                var count = parseInt(cookie_name[1]) + 1;
                login_count(name, count, 1); // 업데이트된 값을 다시 저장
                return count;
            }
        }
    }
    return 1; // 쿠키가 없을 경우 기본값인 1을 반환
}

// 로그인 실패 횟수가 x번인경우 로그인 제한
function login_failed(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/";
}

function check_login_limit() {
    var login_limit = 3; // 로그인 실패 제한 횟수
    var cookie = document.cookie;
    var failed_count = 0;

    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for (var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] == "login_failed_count") {
                failed_count = parseInt(cookie_name[1]);
                break;
            }
        }
    }

    if (failed_count >= login_limit) {
        // 로그인 제한 상태일 때
        document.getElementById("login_status").innerHTML = "로그인 제한 상태입니다.";
        document.getElementById("login_button").disabled = true;
    } else {
        // 로그인 제한 상태가 아닐 때
        document.getElementById("login_status").innerHTML = "로그인 실패 횟수: " + failed_count;
        document.getElementById("login_button").disabled = false;
    }
}

function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert('세션 스토리지 지원하지 않음');
    }
}

function logout() {
    session_del(); // 세션 삭제
    location.href = 'index.html'; // 로그아웃 후 인덱스 페이지로 이동
}

//function session_del() {//세션 삭제
    //if (sessionStorage) {
       // sessionStorage.removeItem("Session_Storage_test");
        //alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
       // }
   // else {
           // alert('세션 스토리지 지원 x');
        //}
   // }

    //function logout(){
        //session_del(); // 세션 삭제
        //location.href='../index.html';
     //}
                    
    
// 세션 스토리지에 로그인 시간을 저장하는 함수
function setLoginTime() {
    var loginTime = new Date().getTime();
    sessionStorage.setItem("loginTime", loginTime);
}

// 세션 스토리지에서 로그인 시간을 가져오는 함수
function getLoginTime() {
    return parseInt(sessionStorage.getItem("loginTime"));
}

// 자동 로그아웃을 위한 함수
function autoLogout() {
    session_del(); // 세션 삭제
    alert("5분이 경과하여 자동으로 로그아웃되었습니다.");
    location.href = '../index.html'; // 메인 페이지로 이동
}

// 로그아웃 버튼 클릭 시 호출되는 함수
function logout() {
    session_del(); // 세션 삭제
    clearTimeout(timer); // 타이머 제거
    location.href = '../index.html'; // 메인 페이지로 이동
}

// 세션 삭제 함수
function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("loginTime");
    } else {
        alert('세션 스토리지 지원하지 않음');
    }
}

// 5분 후 자동 로그아웃 타이머 설정
var timer = setTimeout(autoLogout, 5 * 60 * 1000); // 5분 후에 autoLogout 함수 호출

// 로그인 시간을 설정
setLoginTime();
