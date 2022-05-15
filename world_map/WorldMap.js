//localstroage에서 사용자가 입력한 text를 통해 html Tag의 content 기입
if(localStorage.getItem('inputValue')){
    const textvalue = localStorage.getItem('inputValue')
    let h1TagContent = document.getElementById("Header")    
    let CommodityName = document.getElementById("commodity_name");

    h1TagContent.textContent = textvalue
    CommodityName.textContent = textvalue.substring(0,(textvalue.indexOf(' ')));
}
const textvalue = localStorage.getItem('inputValue')
var remote_url = 'https://raw.githubusercontent.com/kimnamhyeon0112/Open_Source_Project/Feature_PieData/DB/'+ textvalue +'.csv';
dfd.readCSV(remote_url)
.then(function(data){
    data.plot ("plot_div").pie({ config: { values: "Quantity", labels: "Country" } });
 });
