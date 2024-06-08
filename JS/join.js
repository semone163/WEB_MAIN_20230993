class SignUp {
    constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthdayDate = birthdayDate;
      this.gender = gender;
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.classNumber = classNumber;
      this.random = random;
    }
  
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  
    set fullName(fullName) {
      const [firstName, lastName] = fullName.split(" ");
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    get contactInfo() {
      return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
    }
  
    set contactInfo(contactInfo) {
      const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.random = random;
        
    }
  }
  
  class SignUp {
    constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) { // 생성자 함수
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthdayDate = birthdayDate;
      this.gender = gender;
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.classNumber = classNumber;
      this.random = random;
    }
    get fullName() {
      return `${this.firstName} ${this.lastName}`; // 템플릿 리터럴 문자열 연결, 기존에는 + 연산자로 연결
    }
  
    set fullName(fullName) {
      const [firstName, lastName] = fullName.split(" ");
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    get contactInfo() {
      return `${this.emailAddress} ${this.phoneNumber} ${this.random}`; // 요소 하나 하나를 객체 프로퍼티라고 한다.
    }
  
    set contactInfo(contactInfo) {
      const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.random = random;
        
    }
  }
  

function join(){ // 회원가입
    let form = document.querySelector("#form_main");
    let f_name = document.querySelector("#firstName");
    let l_name = document.querySelector("#lastName");
    let b_day = document.querySelector("#birthdayDate");
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress");
    let p_number = document.querySelector("#phoneNumber");
    let class_check = document.querySelector(".select form-control-lg");
    
    form.action = "../index_join.html";
    form.method = "get";
    
    if(f_name.value.length === 0 || l_name.value.length === 0 || b_day.value.length === 0 || email.value.length === 0 || p_number.value.length === 0){
        alert("회원가입 폼에 모든 정보를 입력해주세요.(성별, 분반 제외)");
    }else{
      session_join_set(); 
        form.submit();
    }
}

function session_join_set(){ //세션 저장(객체)    
  let f_name = document.querySelector("#firstName").value;
  let l_name = document.querySelector("#lastName").value;
  let b_day = document.querySelector("#birthdayDate").value;
  let gender = document.querySelector("#inlineRadioOptions");
  let email = document.querySelector("#emailAddress").value;
  let p_number = document.querySelector("#phoneNumber").value;
  let class_check = document.querySelector(".select form-control-lg");
  let random = new Date(); // 랜덤 타임스탬프

 const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
  console.log(newSignUp.fullName); // John Doe
  console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890
 
 if (sessionStorage) {
  const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
  let en_text = encrypt_text(objString); // 암호화
  sessionStorage.setItem("Session_Storage_new_user", objString);
  sessionStorage.setItem("Session_Storage_new_user_encryted", en_text);
  } else {
  alert("세션 스토리지 지원 x");
  }
  }
  
