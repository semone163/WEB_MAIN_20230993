// js 폴더의 search.js 코드를 수정한다.

function googleSearch() {
    const searchTerm = document.getElementById("search_button_msg").value;// 검색어로 설정 search_input
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;

    // 새 창에서 구글 검색을 수행
    window.open(googleSearchUrl, "_blank"); // 새로운 창에서 열기.
    return false;
}
//공백과 비속어를 검사하는 함수를 만들려고 노력함
//if(searchTerm < ) {
    //window.open(googleSearchUrl, "_blank"); // 새로운 창에서 열기.
    //return false;
//}

