const inputBox = document.querySelector("input");
const recommendBox = document.querySelector("#recommend");
const texts = document.querySelectorAll(".text");

/*addEventListener라는 함수는 인자를 "keyup"와 e를 받는다.
	여기서 e라는 값은 조건 형태로 값을 가지게 된다. //e는 이벤트가 발생한 값을 저장
	if구문에서...
		만약 e에 문자가 있다면(문자열 길이로 확인), 숨겼던 글을 보이게 바꾼다
		아니라면 다시 안보이게 만든다
*/
inputBox.addEventListener("keyup",e=>{
	if (e.target.value.length > 0) {
		recommendBox.classList.remove('invisible');
	} else {
		recommendBox.classList.add('invisible');
	}
})