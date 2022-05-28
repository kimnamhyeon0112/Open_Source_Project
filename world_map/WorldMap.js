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

let API_KEY =  `NULL`;
let API_URL="NULL";
let chart_info = "NULL";
let data_source = "NULL";

let end_date = getToday();
let start_date = getStartdate();


let API_Code = {
  CrudeOil : {url : [`https://api.eia.gov/v2/petroleum/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RCLC1`,`https://api.eia.gov/v2/petroleum/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RCLC2`,`https://api.eia.gov/v2/petroleum/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RCLC3`,`https://api.eia.gov/v2/petroleum/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RCLC4`], label : ["RCLC1","RCLC2", "RCLC3", "RCLC4" ], info :'CrudeOil Future Price', data_source : "NYMEX Future Price used eia API"},

  NaturalGas : {url : [`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGC1`, `https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGC2`,`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGC3`,`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGC4`,`https://api.eia.gov/v2/natural-gas/pri/fut/data/?api_key=${API_KEY}&frequency=daily&start=2021-01-01&sort[0][column]=period&sort[0][direction]=desc&data[]=value&facets[series][]=RNGWHHD`],label : ["RNGC1","RNGC2", "RNGC3", "RNGC4","RNGWHHD"], info : 'NaturalGas Spot & Future Price', data_source : "NYMEX used eia API"},

  Coal :{url :[`https://data.nasdaq.com/api/v3/datasets/BSE/BOM533278.json?&start_date=2010-11-04&api_key=${API_KEY}`], label: [ "BSE/BOM533278"], info :'Coal Price', data_source : "Bombay Stock Exchang used Nasdaq API", path: [4] },
  
  Aluminium : {url :[`https://data.nasdaq.com/api/v3/datasets/SHFE/ALQ2022.json?api_key=${API_KEY}`], label : ["SHFE/ALQ2022"],info : "Aluminium Future Price",data_source : "Shanghai Futures Exchang used Nasdaq API", path: [6]},

  Copper : {url :[`https://data.nasdaq.com/api/v3/datasets/SHFE/CUQ2022.json?&api_key=${API_KEY}`],label :["SHFE/CUQ2022"],  info : "Copper Future Price",data_source : "Shanghai Futures Exchang used Nasdaq API", path:[6]} ,

  Zinc : {url :[`https://data.nasdaq.com/api/v3/datasets/SHFE/ZNQ2022.json?&api_key=${API_KEY}`],label :["SHFE/ZNQ2022"],info : "Zinc Future Price",data_source : "Shanghai Futures Exchang used Nasdaq API", path:[6]},

  Nickel : {url :[`https://data.nasdaq.com/api/v3/datasets/SHFE/NIN2022.json?&api_key=${API_KEY}`],label :["SHFE/NIN2022"], info : "Nickel Future Price",data_source : "Shanghai Futures Exchang used Nasdaq API", path:[6]},

  Lead : {url :[`https://data.nasdaq.com/api/v3/datasets/SHFE/PBQ2022.json?&api_key=${API_KEY}`],label:["SHFE/PBQ2022"], info : "Lead Future Price",data_source : "Shanghai Futures Exchang used Nasdaq API", path:[6]},

  Tin : "",

  IronOre : "",

  Gold :{url :[`https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD.json?&start_date=2000-01-01api_key=${API_KEY}`],label: ["LBMA/GOLD"], info : "Gold Fixed Price",data_source : "London Bullion Market Association used Nasdaq API", path :[1]} ,

  Silver : {url :[`https://data.nasdaq.com/api/v3/datasets/LBMA/SILVER.json?&start_date=2000-01-01&api_key=${API_KEY}`,],label:["LBMA/SILVER"], info : "Silver Fixed Price",data_source : "London Bullion Market Association used Nasdaq API", path:[1]},

  // Cobalt : {url :[`https://data.nasdaq.com/api/v3/datasets/ODA/PCOBA_USD.json?&api_key=${API_KEY}`],label :["ODA/PCOBA_USD"], info : "Minimum 99.80% purity Cobalt Spot Price",data_source : "IMF Cross Country Macroeconomic Statistics used Nasdaq API"},
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
let ydataPath = API_Code[CommodityName.textContent][`path`];


// fetch(`https://data.nasdaq.com/api/v3/datasets/${database_code}?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`)

//https://internal.agtransport.usda.gov/resource/g92w-8cn7.json?$order=date%20DESC&commodity=Corn

if(CommodityName.textContent == "CrudeOil" || CommodityName.textContent =="NaturalGas"){
  for(let i =0; i<(API_Code[CommodityName.textContent][`label`]).length;i++){
  fetch(API_URL[i])
  .then((response) => response.json())
  .then(
      function(data){

        // console.log(data);
          // 배열 재사용 전에 비우기
          if(ChartXvalues.length !=0)ChartXvalues = [];
          if(ChartYvalues.length !=0)ChartYvalues=[];

          //해당 배열에 기간과 원자재 값 넣기
          for (let key in (data.dataset)[`data`]){
            
              ChartXvalues.unshift((data.response.data)[key][`period`]);
              ChartYvalues.unshift((data.response.data)[key][`value`]);
          }
          
          // console.log(ChartXvalues);
          // console.log(ChartYvalues);
          //적당히 차트에 넣고 차트 갱신
          PriceChart.data.labels = ChartXvalues;
          PriceChart.update();
          addData(ChartYvalues,kind[i]);
        }
  )
        PriceChart.options.title.text = chart_info;
        PriceChart.options.scales.xAxes[0].scaleLabel.labelString = data_source;

}
}else {
  for(let i =0; i<(API_Code[CommodityName.textContent][`label`]).length;i++){
    fetch(API_URL[i])
    .then((response) => response.json())
    .then(
        function(data){
            // 배열 재사용 전에 비우기
            if(ChartXvalues.length !=0)ChartXvalues = [];
            if(ChartYvalues.length !=0)ChartYvalues=[];
  
            //해당 배열에 기간과 원자재 값 넣기
            for (let key in data.dataset[`data`]){
              
                ChartXvalues.unshift((data.dataset.data)[key][0]);
                ChartYvalues.unshift((data.dataset.data)[key][(ydataPath[i])]);
            }
            //적당히 차트에 넣고 차트 갱신
            PriceChart.data.labels = ChartXvalues;
            PriceChart.update();
            addData(ChartYvalues,kind[i]);
          }
    )
          PriceChart.options.title.text = chart_info;
          PriceChart.options.scales.xAxes[0].scaleLabel.labelString = data_source;
  
  }
}


function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}



