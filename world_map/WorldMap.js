//localstroage에서 사용자가 입력한 text를 통해 html Tag의 content 기입
if(localStorage.getItem('inputValue')){
    const textvalue = localStorage.getItem('inputValue')
    let h1TagContent = document.getElementById("Header")    
    let CommodityName = document.getElementById("commodity_name");

    h1TagContent.textContent = textvalue
    CommodityName.textContent = textvalue.substring(0,(textvalue.indexOf(' ')));
}


API_KEY = 'NULL';
let ChartXvalues = [];
let ChartYvalues = [];

let ChartXvaluesFunction=[];
let ChartYvaluesFunction=[];

let arr = [1, 2, 3, 4, ,5];
fetch(`https://data.nasdaq.com/api/v3/datasets/OPEC/ORB?start_date=2022-01-01&end_date=2022-05-18&api_key=${API_KEY}`)
.then((response) => response.json())
.then(
    function(data){
        // console.log(data.dataset);

        for (var key in (data.dataset)[`data`]){
          
            ChartYvaluesFunction.push((data.dataset.data)[key][`0`]);
            ChartXvaluesFunction.push((data.dataset.data)[key][`1`]);
        }

        ChartXvalues = ChartXvaluesFunction.reverse();
        ChartYvalues = ChartYvaluesFunction.reverse();

        new Chart(document.getElementById("Price_LineChart"), {
          type: 'line',
          data: {
            labels: ChartYvalues,
            datasets: [{ 
                data:  ChartXvalues,
                label: "OPEC",
                borderColor: "#3e95cd",
                fill: false
              },
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Crude Oil Future Price'
            }
          }
        });


    }
)




