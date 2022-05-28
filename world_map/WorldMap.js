//localstroage에서 사용자가 입력한 text를 통해 html Tag의 content 기입
// if(localStorage.getItem('inputValue')){
  const textvalue = localStorage.getItem('inputValue')
  let h1TagContent = document.getElementById("Header")    
  let CommodityName = document.getElementById("commodity_name");
  
  h1TagContent.textContent = textvalue
  CommodityName.textContent = textvalue.substring(0,(textvalue.indexOf(' ')));
  // }
  
let chartsheet = {
  type: 'line',
  options: {
    // maintainAspectRatio : false,
    responsive : true,
    aspectRatio : 1.5,  //차트의 (가로길이/세로길이) 비율
    title: {
      display: true,
      text:  ""
    },
    elements: {
      point:{
          radius: 0.4     //선에 있는 점의 크기 조절
      },
      line :{
        borderWidth :1  //선 두께
      }
    },
    legend :{
      position : `bottom`,    //선의 이름박스 아래로
      align : `start`,    
      labels :{
        boxWidth : 20,      //이름박스 크기 조절
        fontFamily : "'Open Sans', sans-serif",
      }
    },
    scales:{
      xAxes:[
        {
          scaleLabel: {
            display: true,
            labelString: 'NULL',
            fontColor: 'gray',
            fontSize: 11,
          },
          ticks : {
            maxTicksLimit : 8,
            maxRotation :  0 ,
            autoSkipPadding: 8,
          } 
       }
      ]
    }
}
}

let PriceChart = new Chart(document.getElementById("Price_LineChart"), chartsheet);

function addData( ChartYvalues, _label){
  //데이터셋 추가
  let newDataset = {
			label: _label,
			borderColor: getRandomColor(),
			data: ChartYvalues,
			fill: false
  }
  // chart에 newDataset 푸쉬
  PriceChart.data.datasets.push(newDataset);

  PriceChart.update();	//차트 업데이트
}

const API_KEY = 'NULL';
let API_URL="NULL";
let chart_info = "NULL";
let data_source = "NULL";

let end_date = getToday();
let start_date = getStartdate();


let API_Code = {
  CrudeOil : {url : [`https://api.eia.gov/v2/petroleum/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RCLC1`,`https://api.eia.gov/v2/petroleum/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RCLC2`,`https://api.eia.gov/v2/petroleum/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RCLC3`,`https://api.eia.gov/v2/petroleum/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RCLC4`], label : ["RCLC1","RCLC2", "RCLC3", "RCLC4" ], info :'CrudeOil Future Price', data_source : "NYMEX Future Price use eia API"},

  NaturalGas : {url : [`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGC1`, `https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGC2`,`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGC3`,`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGC4`,`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGWHHD`],label : ["RNGC1","RNGC2", "RNGC3", "RNGC4","RNGWHHD"], info : 'NaturalGas Spot & Future Price', data_source : "NYMEX use eia API"},

  // Coal : ["HKEX/03948.json", "HKEX/01898.json", "HKEX/00835.json", "BSE/BOM533278.json"],
  
  // Aluminium : {url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?api_key=${API_KEY}`, kind : ["SHFE/ALQ2022"]},
  // Copper : {url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?&api_key=${API_KEY}`,kind :["HKEX/00358", "SHFE/CUQ2022"]} ,
  // Zinc : {url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?&api_key=${API_KEY}`,kind :["SHFE/ZNQ2022"]},
  // Nickel : {url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?&api_key=${API_KEY}`,kind :["SHFE/NIN2022"]},
  // Lead : {url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?&api_key=${API_KEY}`,kind:["SHFE/PBQ2022"]},
  // Tin : "",
  // IronOre : {url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?&api_key=${API_KEY}`,kind:["HKEX/01053"]},
  // Gold :{url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?&api_key=${API_KEY}`,kind: ["SHFE/AUX2021"]} ,
  // Silver : {url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?&api_key=${API_KEY}`,kind:["SHFE/AGQ2022",	"LBMA/SILVER"]},
  // Cobalt : {url :`https://data.nasdaq.com/api/v3/datasets/${kind}.json?&api_key=${API_KEY}`,kind :["ODA/PCOBA_USD"]},
  Lithium : "",
  
  Corn : "",
  Wheat : "",
  Rice : "",
  Oats : "",
  SoybeanOil : "",
  Soybean : "",
  Sugar : "",
  Coffee : ""
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


let ChartXvalues = [];
let ChartYvalues = [];
API_URL = API_Code[CommodityName.textContent][`url`];
chart_info = API_Code[CommodityName.textContent][`info`];
data_source = API_Code[CommodityName.textContent][`data_source`];
let kind = API_Code[CommodityName.textContent][`label`];

// fetch(`https://data.nasdaq.com/api/v3/datasets/${database_code}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`)

//https://internal.agtransport.usda.gov/resource/g92w-8cn7.json?$order=date%20DESC&commodity=Corn

for(let i =0; i<(API_Code[CommodityName.textContent][`label`]).length;i++){
  console.log(kind);
  console.log(API_URL[i]);
  fetch(API_URL[i])
  .then((response) => response.json())
  .then(
      function(data){

        console.log(data);
          // 배열 재사용 전에 비우기
          if(ChartXvalues.length !=0)ChartXvalues = [];
          if(ChartYvalues.length !=0)ChartYvalues=[];

          //해당 배열에 기간과 원자재 값 넣기
          for (let key in (data.response)[`data`]){
            
              ChartXvalues.unshift((data.response.data)[key][`period`]);
              ChartYvalues.unshift((data.response.data)[key][`value`]);
          }
          
          console.log(ChartXvalues);
          console.log(ChartYvalues);
          //적당히 차트에 넣고 차트 갱신
          PriceChart.data.labels = ChartXvalues;
          PriceChart.update();
          addData(ChartYvalues,kind[i]);
        }
  )
        PriceChart.options.title.text = chart_info;
        PriceChart.options.scales.xAxes[0].scaleLabel.labelString = data_source;

}

function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}



