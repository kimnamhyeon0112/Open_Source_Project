//localstroage에서 사용자가 입력한 text를 통해 html Tag의 content 기입
if(localStorage.getItem('inputValue')){
    const textvalue = localStorage.getItem('inputValue')
    let h1TagContent = document.getElementById("Header")    
    let CommodityName = document.getElementById("commodity_name");

    h1TagContent.textContent = textvalue
    CommodityName.textContent = textvalue.substring(0,(textvalue.indexOf(' ')));
}
dfd.readCSV('https://raw.githubusercontent.com/huntedu/web/main/Oil_Reserves.csv')
.then(function(data){
    data.plot ("plot_div").pie({ config: { values: "Quantity", labels: "Country" } });
 });
