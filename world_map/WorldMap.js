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
        document.addEventListener("mousemove",resultFun,false);
    } else if ( document.attachEvent ) {
        document.attachEvent("onmousemove",resultFun);
    } else {
        document.onmousemove = resultFun;
    }
    
    //  문서에서 마우스가 움직일때(mousemove) 마다 resultFun() 함수가 실행됩니다.
    //  x.clientX,Y 는 페이지에서 이벤트 발생한 X,Y 좌표를 가져옵니다.
    function resultFun(x) {
        var xY = x.clientX +  " * "  + x.clientY ;
        var positionLeft = x.clientX;
        var positionTop = x.clientY;
        // result  div 에 innerHTML 로 xY 변수를 적용 합니다.
       
        document.getElementById('info-tooltip').innerHTML = 'china'
        //  result  div 의 position 위치를  positionLeft, Top 변수 값으로 style 적용해줍니다.
        document.getElementById('info-tooltip').style.display =  'block' ;
        document.getElementById('info-tooltip').style.left = ( positionLeft - 25 ) + "px";
        document.getElementById('info-tooltip').style.top = ( positionTop + 30 ) + "px";
    }


