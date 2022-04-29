const search= ()=>{
	const searchbox = document.getElementById("Search_box").value.toUpperCase();
	const command_list = document.getElementById("command_list")
	const command = document.querySelectorAll(".command")
	const commands = command_list.getElementsByTagName("li")

	for(var i=0; i<commands.length;i++){
		let match = command[i];

		if(match){
			let textvalue=match.textContent || match.innerHTML
			
			if(textvalue.toUpperCase().indexOf(searchbox)>-1){
				command[i].style.display = "";
			}else {
				command[i].style.display = "none";
			}
		}
	}
}