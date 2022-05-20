//localstroage에서 사용자가 입력한 text를 통해 html Tag의 content 기입
if(localStorage.getItem('inputValue')){
    const textvalue = localStorage.getItem('inputValue')
    let h1TagContent = document.getElementById("Header")    
    let CommodityName = document.getElementById("commodity_name");

    h1TagContent.textContent = textvalue
    CommodityName.textContent = textvalue.substring(0,(textvalue.indexOf(' ')));
}

function getToday(){
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

function getStartdate(){
  let end = new Date()
  let start = new Date(end.setMonth(end.getMonth()-6));
  //end 가 실행된 날짜에서 6달 전. 그러면 차트에서 6달 만큼 data를 볼 수 있다.

  let year = start.getFullYear();
  let month = ("0"+(1+start.getMonth())).slice(-2);
  let day = ("0"+start.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

const API_KEY = 'NULL';

let database_code = `OPEC`;
let dataset_code = `ORB`;
let end_date = getToday();
let start_date = getStartdate();

let ChartXvalues = [];
let ChartYvalues = [];

let ChartXvaluesFunction=[];
let ChartYvaluesFunction=[];

let arr = [1, 2, 3, 4, ,5];
fetch(`https://data.nasdaq.com/api/v3/datasets/${database_code}/${dataset_code}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`)
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




