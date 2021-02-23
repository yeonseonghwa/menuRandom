//메뉴를 담아주는 변수들
var morningMenu=["김밥","빵우유","토스트","누릉지","찰떡","라면"];
var kimbab = ["참치김밥","돈가스김밥","야채김밥","치즈김밥","땡초김밥"];
var Ramen = ["튀김우동","진라면","辛라면","육개장","불닭볶음면","뽁음진짱뽕","김치찌개라면","왕뚜껑","부대찌개라면","참깨라면","홍라면"];
var lunchMenu =["김치찌개","된장찌개","순두부찌개","순댓국밥","콩나물국밥","삼계탕","쌀국수","떡볶이","김밥","비빔밥","라면","짱뽕","짜장면","김치볶음밥","햄버거","물냉면","비빔냉면","우동","에비동","카레라이스","돈까스","삼겹살","볶음밥","해장국","감자탕","설렁탕","닭갈비","탕수육","갈비탕","밥버거"];
var dinnerMenu=["갈비찜","김치볶음","닭도리탕","돼지불고기","육개장","마타두부","제육볶음","닭볶음","치킨","삼겹살","피자","김치찌개","된장찌개","순두부찌개","순댓국밥","쌀국수","떡볶이","라면","짱뽕","짜장면","김치볶음밥","물냉면","비빔냉면","우동","에비동","카레라이스","볶음밥","닭갈비","탕수육"];
var barFoodMenu=["계란말이","모듬튀김","해물파전","김치전","떡볶이","닭똥집볶음","치즈불닭","두부김치","깐풍기","치킨샐러드","육회","과일화채","라면","오뎅탕","짬뽕탕","부대찌개"];

var menu;       //menu리스트를 담는다.
var randomNumber; //random숫자를 담는다.
var beformNumber;   //0.2초전에 뽑았던 menu.
var timer;
var run=1;
var count=0;
var randomTop;
var randomLeft;
var randomFontSize;

$(function(){
  $('#morningMenu').on('click',function(){    //아침메뉴를 클릭했을때 아침메뉴를 menu에 담아준다.
    menu = morningMenu;
  })
  $('#lunchMenu').on('click',function(){      //점심메뉴를 클릭했을때 점심메뉴를 menu에 담아준다.
    menu = lunchMenu;
  })
  $('#dinnerMenu').on('click',function(){      //저녁메뉴를 클릭했을때 저녁메뉴를 menu에 담아준다.
    menu = dinnerMenu;
  })
  $('#barFoodMenu').on('click',function(){      //술안수메뉴를 클릭했을때 술안주메뉴를 menu에 담아준다.
    menu = barFoodMenu;
  })


  $('#startButton').on('click',function(){      //시작버튼을 누르면 해당 버튼을 중지로 바꿔주고 selectMenu함수를 호출한다.
    $('#string').html('뭐 먹지? 랜덤으로 결정하시죠');
    $('#startButton').val('중지');
    $('#miniMenu').html('');
    selectMenu();
  })

  $('#toMain').on('click',function(){
    location.href='main.html';
  })
})

function selectMenu(){            //메뉴안에서 랜덤으로 메뉴를 뽑아서 화면에 출력해준다.
  if(menu==null){                 //시간대를 선택하지 않으면 시간을 선택하세요를 띄워준다.
    $('#startButton').val('시작');
    alert("시간을 선택하세요.");
  }else if(run){                      //시간을 선택했으면 밑부분을 0.05초마다 한번 돌려준다.
    timer=setInterval(function(){
      randomNumber = Math.floor(Math.random()*menu.length);
      while(randomNumber==beformNumber){                        //이전 메뉴랑 같으면 메뉴를 바꿔준다. 같은 메뉴 나오면 화면이 0.1초 멈추기때문에 이렇게 바꾼거다.
        randomNumber = Math.floor(Math.random()*menu.length);
      }
      beformNumber=randomNumber;
      $('#menu').html(menu[randomNumber]);                        //뽑은 메뉴를 출력해준다.

      randomTop = Math.floor(Math.random() * $(document).height());
      randomLeft = Math.floor(Math.random() * $(document).width());
      randomFontSize = Math.floor(Math.random() * 10+25);

      $("<span class='temp'></span>").html(menu[randomNumber]).hide().css({   //화면에 랜덤위치에 메뉴를 출력해준다.
          "top": randomTop,
          "left": randomLeft,
          "color": "rgba(0,0,0,." + Math.random() + ")",
          "fontSize": randomFontSize + "px"
      }).appendTo("body").fadeIn("slow", function () {
          $(this).fadeOut("slow", function () {               //천천히 사지지고
              $(this).remove();                           //삭제한다.
          });
      });
    },50);
    run=0;                                                        //run를 0으로 만든이유가 버튼을 재 클릭했을때 setInterval를 멈춰주기 위해서다.
  }else{
    $('#string').html('OK 이거 먹자');
    $('#startButton').val('싫어 다른거 먹을래');                    //중지를 클릭했을때 싫어 다른거 먹을래로 바꿔준다. 이를 클릭하면 다른 메뉴로 바꿔준다.
    clearInterval(timer);                                         //setInterval를 멈춰준다.
    run=1;
    printRamen();
  }

}


function printRamen(){
    var menu = $('#menu').html();
    if(menu == '라면'){
      for(var index in Ramen){
        $("<b class='ramen'></b>").html(Ramen[index]+'~').show().appendTo("#miniMenu");
      }
    }else if(menu == '김밥'){
      for(var index in kimbab){
        $("<b class='ramen'></b>").html(kimbab[index]+'~').show().appendTo("#miniMenu");
      }
    }
}
function sleep(delay){
  var start = new Date().getTime();
  while(new Date().getTime()<start+delay);
}
