
const textvalue = localStorage.getItem('inputValue')
let h1TagContent = document.getElementById("Header")    
let CommodityName = document.getElementById("commodity_name");

h1TagContent.textContent = textvalue
CommodityName.textContent = textvalue.substring(0,(textvalue.indexOf(' ')));
let types = textvalue.substring((textvalue.indexOf(' '))+1, textvalue.length);

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
      xAxes: {
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

if(CommodityName.textContent == "CrudeOil" || CommodityName.textContent =="NaturalGas")API_KEY= ``;
else if(CommodityName.textContent == "Corn" || CommodityName.textContent == "Wheat" || CommodityName.textContent == "Rice" || CommodityName.textContent == "Oats" || CommodityName.textContent == "SoybeansOil" || CommodityName.textContent == "Soybeans" || CommodityName.textContent == "Milk" || CommodityName.textContent == "Sugar" || CommodityName.textContent == "Coffee" || CommodityName.textContent == "Tin" || CommodityName.textContent == "IronOre") API_KEY = ``;

else API_KEY = ``;

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

  Tin : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PTINUSDM&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PTINUSDM"], info : "tin Fixed Price"},

  IronOre : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PIORECRUSDM&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PIORECRUSDM"], info : "iron ore Fixed Price"},

  Gold :{url :[`https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD.json?&start_date=2000-01-01api_key=${API_KEY}`],label: ["LBMA/GOLD"], info : "Gold Fixed Price",data_source : "London Bullion Market Association used Nasdaq API", path :[1]} ,

  Silver : {url :[`https://data.nasdaq.com/api/v3/datasets/LBMA/SILVER.json?&start_date=2000-01-01&api_key=${API_KEY}`,],label:["LBMA/SILVER"], info : "Silver Fixed Price",data_source : "London Bullion Market Association used Nasdaq API", path:[1]},

  // Cobalt : {url :[`https://data.nasdaq.com/api/v3/datasets/ODA/PCOBA_USD.json?&api_key=${API_KEY}`],label :["ODA/PCOBA_USD"], info : "Minimum 99.80% purity Cobalt Spot Price",data_source : "IMF Cross Country Macroeconomic Statistics used Nasdaq API"},
  Lithium : "",
  
  Corn : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PMAIZMTUSDM&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PMAIZMTUSDM"], info : "corn Fixed Price"},
  Wheat : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PWHEAMTUSDM&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PWHEAMTUSDM"], info : "wheat Fixed Price"},
  Rice : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PRICENPQUSDM&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PRICENPQUSDM"], info : "rice Fixed Price"},
  Oats : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=WPU012203&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["WPU012203"], info : "oats Fixed Price"},
  SoybeanOil : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PSOILUSDM&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PSOILUSDM"], info : "soybeans oil Fixed Price"},
  Soybean : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PSOYBUSDQ&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PSOYBUSDQ"], info : "soybeans Fixed Price"},
  Milk : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=WPU01610102&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["WPU01610102"], info : "milk Fixed Price"},
  Sugar : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PSUGAISAUSDM&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PSUGAISAUSDM"], info : "suger Fixed Price"},
  Coffee : {url :[`https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=PCOFFOTMUSDM&api_key=${API_KEY}&file_type=json&observation_start=1990-01-01`],label:["PCOFFOTMUSDM"], info : "coffee Fixed Price"}
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
          for (let key in (data.response)[`data`]){
            
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
        PriceChart.options.scales.xAxes.scaleLabel.labelString = data_source;

}
}else if(CommodityName.textContent == "Corn" || CommodityName.textContent == "Wheat" || CommodityName.textContent == "Rice" || CommodityName.textContent == "Oats" || CommodityName.textContent == "SoybeansOil" || CommodityName.textContent == "Soybeans" || CommodityName.textContent == "Milk" || CommodityName.textContent == "Sugar" || CommodityName.textContent == "Coffee" || CommodityName.textContent == "Tin" || CommodityName.textContent == "IronOre"){
  for(let i =0; i<(API_Code[CommodityName.textContent][`label`]).length;i++){
  fetch(API_URL[i])
  .then((response) => response.json())
  .then(
      function(data){

          //console.log(data);
          // 배열 재사용 전에 비우기
          if(ChartXvalues.length !=0)ChartXvalues = [];
          if(ChartYvalues.length !=0)ChartYvalues=[];

          //해당 배열에 기간과 원자재 값 넣기
          for (let key in data[`observations`]){
              
              ChartXvalues.push((data.observations)[key][`date`]);
              ChartYvalues.push((data.observations)[key][`value`]);
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
        PriceChart.options.scales.xAxes.scaleLabel.labelString = data_source;

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
          PriceChart.options.scales.xAxes.scaleLabel.labelString = data_source;
  
  }
}


function getRandomColor() {
	// return "#" + Math.floor(Math.random() * 16777215).toString(16);
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let col = "rgba(" + r + "," + g + "," + b +","+"0.4"+ ")";
  return col;
}
function roundToTwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

let ip_address = '';
fetch(`http://${ip_address}/Open_Source_Project/api/${types}.php`)
.then((response) => response.json())
.then(function(data){
  // console.log(data);
  let chart_value=[];
  let chart_country=[];
  let colors=[];
  let char3=[];
  let char2=[];
  let _unit='';
  let _source='';

  for(let i = 0; i < data.length; i++){
    if(data[i][`commodity`]==CommodityName.textContent){
      chart_value.push(Number(data[i][`value`]));
      chart_country.push(data[i][`name`]);
      colors.push(getRandomColor());
      char2.push((data[i][`alpha_2`]).toUpperCase());
      char3.push((data[i][`alpha_3`]).toUpperCase());
      _unit = data[i][`unit`];
      _source = data[i][`source`];
    }
  }
  let sum = chart_value.reduce((a,b) => (a+b));
  sum = roundToTwo(sum);

// console.log(chart_value);
// console.log(char3);
// console.log(chart_country);
fillArea(char2, char3, chart_country, colors);

const counter = {
    id: 'counter',
    beforeDraw(chart, args, options) {
      const { ctx, chartArea: { top, right , bottom, left, width, height } } = chart;
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.fillRect(width / 2, top + (height / 2), 0, 0);
      ctx.font = '25px Open Sans, sans-serif';
      ctx.textAlign = 'center';
      // console.log("width", width);
      // console.log("height", height);
      // console.log("top", top);
      // console.log("width / 2, top + (height / 2)", width / 2, top + (height / 2));
      ctx.fillText("Total", width / 2, (height / 7)*3);

      ctx.restore();

      ctx.font = '20px Open Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'black';
      ctx.fillText(sum, width / 2, (height / 7)*4);

    }
  };

  let config = {
    type: 'doughnut',
    options: {
      aspectRatio : 1.5,
      responsive: true,
      plugins: {
        labels:{
          render : 'percentage',
          percision : 2,
          fontColor : "#161b22",
          fontFamily: "'Open Sans', sans-serif",
          fontSize: 12,
          // textShadow: true,
          fontStyle: 'bold',
          // shadowColor: 'rgba(239, 239, 239,1)',
        },
        legend: {
          position: "right",
          align: "middle",
          fontFamily : "Open Sans, sans-serif",
          labels :{
            boxWidth : 10,      //이름박스 크기 조절
            usePointStyle: true,
          },
        },
        title:{
          display:true,
          text : `Unit: ${_unit}, Source: ${_source}`,
          position : 'bottom',
          align : 'start',
          padding : '10 0 0 30',          
        },
      },
    },
   
    plugins:[counter],
    data : {
     labels : chart_country,
     datasets :[{
        data : chart_value,
        backgroundColor: colors,
        cutout:"60%",
      }]
    },
   
  };
  new Chart(document.getElementById("WorldMap_Value"), config);
})

function reload(kind){
  localStorage.setItem("inputValue", CommodityName.textContent+" "+kind);
  window.location.href="./WorldMap.html";
}

function fillArea(char2, char3, _name, _colors){
  for(let i = 0; i<char2.length;i++){
    let targetArea = document.getElementById(char2[i]);
    if(targetArea != null){
      targetArea.style.fill = _colors[i];
      targetArea.style.stroke = "#ffff";
      targetArea.style.strokeWidth = 2;
    }
    let targetArea2= document.getElementById(char3[i]);
    if(targetArea2 !=null){
      targetArea2.style.fill = _colors[i];
      targetArea2.style.stroke = "#ffff";
      targetArea2.style.strokeWidth = 2;
    }  
    let targetArea3 = document.getElementsByName(_name[i]);
    if(targetArea3 !=null){
      for(let j = 0; j< targetArea3.length;j++){
        targetArea3[j].style.fill = _colors[i];
        targetArea3[j].style.stroke = "#ffff";
        targetArea3[j].style.strokeWidth = 2;
      }
    }
  }  
}



    // 브라우서 호환 ( 크로스브라우징 ) 체크 하여 문서 전체에 mousemove 이벤트를 걸어줍니다.
    if ( document.addEventListener ) {
        document.addEventListener("mousedown",resultFun,false);
    } else if ( document.attachEvent ) {
        document.attachEvent("onmousedown",resultFun);
    } else {
        document.onmousedown = resultFun;
    }
    
    //  문서에서 마우스가 움직일때(mousemove) 마다 resultFun() 함수가 실행됩니다.
    //  x.clientX,Y 는 페이지에서 이벤트 발생한 X,Y 좌표를 가져옵니다.

    function resultFun(event) {
        
        var countryId = event.target.id;
        var tooltip = document.getElementById("tooltip");
        tooltip.style.display ="block";
        switch (countryId) {
            case "AF": "Afghanistan"; 
            case "AL": "Albania"; 
            case "AG":
            case "AR":
            case "AU":
            case "AZ":
            case "CA":
            case "CN":
            case "DM":
            case "GB":
            case "GR":
            case "ID":
            case "IT":
            case "JP":
            case "ML":
            case "NR":
            case "OM":
            case "PH":
            case "PG":
            case "TK":
            case "NZ":
            case "CL":
            case "RU":
            case "FR":
            case "US":
            case "AS":
            case "AB":
            case "BAH":
            case "COM":
            case "CV":
            case "CAI":
            case "FI":
            case "FSM":
            case "ML":
            case "NMI":
            case "MAU":
            case "NC":
            case "PR":
            case "FRP":
            case "SOI":
            case "STP":
            case "SEY":
            case "TCI":
            case "TON":
            case "TT":
            case "USV":
            case "VAN":
            case "SAM":
            case "SP":
            case "GU":
            case "FJ":
            case "DZ": "Algeria"; 
            case "AI": "Anguilla"; 
            case "AM": "Armenia";
            case "AW": "Aruba";
            case "AT": "Austria"; 
            case "BH": "Bahrain"; 
            case "BD": "Bangladesh"; 
            case "BB": "Barbados";
            case "BY": "Belarus"; 
            case "BE": "Belgium"; 
            case "BZ": "Belize"; 
            case "BJ": "Benin"; 
            case "BM": "Bermuda";
            case "BT": "Bhutan"; 
            case "BO": "Bolivia" 
            case "BA": "Bosnia and Herzegovina"
            case "BW": "Botswana"
            case "BR": "Brazil"
            case "VG": "British Virgin Islands" 
            case "BN": "Brunei Darussalam" 
            case "BG": "Bulgaria" 
            case "BF": "Burkina Faso" 
            case "BI": "Burundi" 
            case "KH": "Cambodia" 
            case "CM": "Cameroon"
            case "CF": "Central African Republic"
            case "TD": "Chad"
            case "CO": "Colombia"
            case "CR": "Costa Rica" 
            case "HR": "Croatia" 
            case "CU": "Cuba"
            case "CW": "Curaçao" 
            case "CZ": "Czech Republic" 
           case  "CI": "Côte d'Ivoire" 
            case "KP": "Dem. Rep. Korea" 
            case "CD": "Democratic Republic of the Congo" 
            case "DJ": "Djibouti" 
            case "DM": "Dominica" 
            case "DO": "Dominican Republic" 
            case "EC": "Ecuador" 
            case "EG": "Egypt" 
            case "SV": "El Salvador" 
            case "GQ": "Equatorial Guinea" 
            case "ER": "Eritrea"
            case "EE": "Estonia" 
            case "ET": "Ethiopia" 
            case "FI": "Finland" 
           case  "GF": "French Guiana" 
            case "GA": "Gabon" 
            case "GE": "Georgia" 
            case "DE": "Germany" 
            case "GH": "Ghana" 
            case "GL": "Greenland" 
            case "GD": "Grenada" 
            case "GU": "Guam" 
            case "GT": "Guatemala" 
            case "GN": "Guinea" 
            case "GW": "Guinea-Bissau" 
            case "GY": "Guyana" 
            case "HT": "Haiti" 
            case "HN": "Honduras" 
            case "HU": "Hungary" 
            case "IS": "Iceland" 
            case "IN": "India" 
            case "IR": "Iran" 
            case "IQ": "Iraq" 
            case "IE": "Ireland" 
            case "IL": "Israel" 
            case "JM": "Jamaica" 
            case "JO": "Jordan" 
            case "KZ": "Kazakhstan" 
            case "KE": "Kenya"
            case "XK": "Kosovo" 
            case "KW": "Kuwait" 
           case  "KG": "Kyrgyzstan" 
           case  "LA": "Lao PDR" 
           case  "LV": "Latvia" 
           case  "LB": "Lebanon" 
           case  "LS": "Lesotho" 
            case "LR": "Liberia" 
            case "LY": "Libya" 
            case "LT": "Lithuania" 
            case "LU": "Luxembourg" 
            case "MK": "Macedonia" 
            case "MG": "Madagascar"
            case "MW": "Malawi" 
            case "MV": "Maldives" 
            case "ML": "Mali"
            case "MH": "Marshall Islands" 
            case "MQ": "Martinique" 
            case "MR": "Mauritania" 
            case "YT": "Mayotte" 
            case "MX": "Mexico" 
            case "MD": "Moldova" 
            case "MN": "Mongolia" 
            case "ME": "Montenegro" 
            case "MS": "Montserrat" 
            case "MA": "Morocco" 
            case "MZ": "Mozambique" 
            case "MM": "Myanmar" 
            case "NA": "Namibia" 
            case "NR": "Nauru" 
            case "NP": "Nepal" 
            case "NL": "Netherlands" 
            case "BQBO": "Netherlands" 
            case "NI": "Nicaragua" 
            case "NE": "Niger" 
            case "NG": "Nigeria" 
            case "PK": "Pakistan" 
            case "PW": "Palau" 
            case "PS": "Palestine" 
            case "PA": "Panama" 
           case "PY": "Paraguay" 
            case "PE": "Peru" 
            case "PL": "Poland" 
            case "PT": "Portugal" 
            case "QA": "Qatar" 
            case "CG": "Republic of Congo" 
            case "KR": "Republic of Korea" 
            case "RE": "Reunion" 
            case "RO": "Romania" 
            case "RW": "Rwanda" 
            case "BQSA": "Saba (Netherlands)" 
            case "LC": "Saint Lucia" 
            case "VC": "Saint Vincent and the Grenadines" 
            case "BL": "Saint-Barthélemy" 
           case  "MF": "Saint-Martin" 
            case "SA": "Saudi Arabia" 
            case "SN": "Senegal" 
            case "RS": "Serbia" 
            case "SL": "Sierra Leone" 
            case "SX": "Sint Maarten" 
            case  "SK": "Slovakia" 
            case "SI": "Slovenia" 
            case "SO": "Somalia" 
            case "ZA": "South Africa" 
            case "SS": "South Sudan" 
            case "ES": "Spain" 
            case "LK": "Sri Lanka" 
            case "BQSE": "St. Eustatius (Netherlands)" 
           case  "SD": "Sudan" 
            case "SR": "Suriname" 
            case "SZ": "Swaziland" 
            case "SE": "Sweden" 
            case "CH": "Switzerland" 
            case "SY": "Syria" 
            case "TW": "Taiwan" 
            case "TJ": "Tajikistan" 
            case "TZ": "Tanzania" 
            case "TH": "Thailand" 
            case "GM": "The Gambia" 
            case "TL": "Timor-Leste" 
            case "TG": "Togo" 
            case "TN": "Tunisia" 
            case "TM": "Turkmenistan" 
            case "TV": "Tuvalu" 
            case "UG": "Uganda" 
            case "UA": "Ukraine" 
            case "AE": "United Arab Emirates" 
            case "UY": "Uruguay" 
            case "UZ": "Uzbekistan" 
            case "VE": "Venezuela" 
            case "VN": "Vietnam" 
            case "EH": "Western Sahara" 
            case "YE": "Yemen" 
            case "ZM": "Zambia" 
            case "ZW": "Zimbabwe"
            break;
          default:
            tooltip.style.display ="none";
            return tooltip.classList.remove("active");
        }
      
        var x = event.clientX;
        var y = event.clientY;
        tooltip.style.left = (x + 20) + "px";
        tooltip.style.top = (y - 20) + "px";
        tooltip.innerHTML = document.getElementById(countryId).getAttribute('name');

        tooltip.classList.add("active");
        tooltip.classList.remove("active");
      }
