
let textvalue = document.cookie;

let h1TagContent = document.getElementById("Header")    
let CommodityName = document.getElementById("commodity_name");

console.log(textvalue);
CommodityName.textContent = textvalue;
h1TagContent.textContent = textvalue;
