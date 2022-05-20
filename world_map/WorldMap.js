//localstroage에서 사용자가 입력한 text를 통해 html Tag의 content 기입
if(localStorage.getItem('inputValue')){
    const textvalue = localStorage.getItem('inputValue')
    let h1TagContent = document.getElementById("Header")    
    let CommodityName = document.getElementById("commodity_name");

    h1TagContent.textContent = textvalue
    CommodityName.textContent = textvalue.substring(0,(textvalue.indexOf(' ')));
}


API_KEY = 'NULL';
let stockChartXvalues = [];
let stockChartYvalues = [];

let stockChartXvaluesFunction=[];
let stockChartYvaluesFunction=[];


fetch(`https://data.nasdaq.com/api/v3/datasets/OPEC/ORB?start_date=2022-01-01&end_date=2022-05-18&api_key=${API_KEY}`)
.then((response) => response.json())
.then(
    function(data){
        console.log(data.dataset);

        for (var key in (data.dataset)[`data`]){
          
            stockChartXvaluesFunction.push(data.dataset.data[key][`0`]);
            stockChartYvaluesFunction.push(data.dataset.data[key][`1`]);
        }

    }
)



