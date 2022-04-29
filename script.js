const inputBox = document.querySelector("#Search_box");
const ta = document.querySelector("#command_list");

inputBox.addEventListener("keyup", (e)=>{
	if(e.target.value.length >0){
		ta.classList.remove('invisible');
		// searchbox.style.setProperty('border-radius', '0px');
	}
	else{
		ta.classList.add('invisible');
		// searchbox.style.setProperty('border-radius', '15px');
	}
})


const search_Recommends= ()=>{
	const searchbox = document.getElementById("Search_box");
	let command_list = document.getElementById("command_list");
	let command = document.querySelectorAll(".command");
	let commands_tags = command_list.getElementsByTagName("li");

	for(var i=0; i<commands_tags.length;i++){
		let match = command[i];

		if(match){
			let textvalue=match.textContent || match.innerHTML
			
			if(textvalue.toUpperCase().indexOf(searchbox.value.toUpperCase())>-1){
				command[i].style.display = "";
			}else {
				command[i].style.display = "none";
			}
		}
	}	
}
