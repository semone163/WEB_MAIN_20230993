function pop_up() {
    //window.open("popup/pop_up.html", "팝업테스트", "width=400, height=300, top=10, left=10");

    //js 폴더의 pop_up.js를 수정한다. 메인페이지는 이제 쿠키의 유무를 체크 한다.
    var cookieCheck = getCookie("popupYN");
        if (cookieCheck != "N"){
        window.open("../popup/pop_up.html", "팝업테스트", "width=400, height=300, top=10, left=10");
        }
    }
    
    function setCookie(name, value, expiredays) {
        var date = new Date();
        date.setDate(date.getDate() + expiredays);
        document.cookie = escape(name) + "=" + escape(value) + ";  expires=" + date.toUTCString() + "; path=/";
        }

    function getCookie(name) {
        var cookie = document.cookie;
        console.log("쿠키를 요청합니다.");
        if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for ( var index in cookie_array) {
        var cookie_name = cookie_array[index].split("=");
        if (cookie_name[0] == "popupYN") {
        return cookie_name[1];
        }
        }
        }
        return ;
        }

    function closePopup() {
        if (document.getElementById('check_popup').value) {
        setCookie("popupYN", "N", 1);
        console.log("쿠키를 설정합니다.");
        self.close();
        }
        }           
        
    //1초마다 갱신을 수행하는 날짜 함수
    function show_clock(){
        let currentDate = new Date(); // 현재 시스템 날짜 객체 생성
        let divClock = document.getElementById('divClock');
        let msg = "현재 시간 : ";
        if(currentDate.getHours()>12){ // 12시 보다 크면 오후 아니면 오전
        msg += "오후";
        msg += currentDate.getHours()-12+"시";
        }
        else {
        msg += "오전";
        msg += currentDate.getHours()+"시";
        }
        msg += currentDate.getMinutes()+"분";
        msg += currentDate.getSeconds()+"초";
        divClock.innerText = msg;
        if (currentDate.getMinutes()>58) { //정각 1분전 빨강색 출력
        divClock.style.color="red";
        }
        setTimeout(show_clock, 1000); //1초마다 갱신
        }

        //popup.js에 호버 함수를 추가한다. / 이미지 호버
        //over() 함수에 이미지를 지정해주면 마우스를 올렸을 때 내렸을 때 이미지가 바뀐다.
        //오버 함수 수정 화살표 함수 이용
       // function over(obj) {
           // obj.src="image/LOGO.png";
           // }
          //  function out(obj) {
           // obj.src="image/LOGO_2.png";
           // }
        const over = (obj) => {
            obj.src = "image/LOGO.png";
        }