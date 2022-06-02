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
            case "UK":
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