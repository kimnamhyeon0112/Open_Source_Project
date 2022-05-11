let searchbox = document.getElementById("Search_box");
let command_list = document.getElementById("command_list");
let command = document.getElementsByClassName("command");

function search_Recommends() {

	//검색창에 문자가 입력되면, 추천 검색어를 보이게 수정 && 검색창 모서리를 뾰족하게 만듦
	if (searchbox.value.length > 0) {
		command_list.style.display = "block";
		searchbox.style.borderRadius = "0px";
	}
	else {
		command_list.style.display = "none";
		searchbox.style.borderRadius = "15px";
	}

	//사용자가 입력한 문자에 맞게 추천 검색어 보여주는 기능. 영문 대소문자 가리지 않고 찾아준다
	for (var i = 0; i < (command_list.getElementsByTagName("li")).length; i++) {
		let match = command[i];

		if (match) {
			let textvalue = match.textContent || match.innerHTML;

			if (textvalue.toUpperCase().indexOf(searchbox.value.toUpperCase()) > -1) {
				command[i].style.display = "";
			} else {
				command[i].style.display = "none";
			}
		}
	}
}


//검색창에서 Enter 입력하면 해당 검색값이 ul에 있으면 WorldMap.html로 이동시키는 것
searchbox.addEventListener("keypress", function(event) {
	
	// If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter") {
		check =true;
		for(var i=0; i<(command_list.getElementsByTagName("li")).length;i++){
			let match = command[i];

			if(match){
				let textvalue=match.textContent || match.innerHTML
				
				if(textvalue.toUpperCase()==searchbox.value.toUpperCase()){
					// document.cookie = String(searchbox.value)+"="+textvalue;
					window.location.href="./world_map/WorldMap.html";
					check=false;
					break;
				}
			}	
		}
		console.log(check);
		if(check){
			alert("Not valid\nSee Recommend Commands");
		}
	}
});
