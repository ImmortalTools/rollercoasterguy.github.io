$(document).ready(function() {
  $( "#donation_trigger" ).click();

  var tronaldDump = ["PANIC SELLING!!!", "DUMPPP!", "SWSF'S FAULT", "BIGGER BLOCKS CENTRALIZATION", "Cheina. China. Jina. Shyna"];
  var hodlersBelike = ["hooodll", "hodloor", "To the mooooon", "$10K INCOMING!!!", "BITCOIN WILL UNITE US!"];
  var maximum = hodlersBelike.length;
  var currentMoon = null;
  var soMuchTxs = null;

  function moonTicker() {
    $.ajax({
      dataType: "json",
      url: "https://api.bitfinex.com/v2/candles/trade:30m:tBTCUSD/last",
      success: mooningFunction
    });
  }

  function mooningFunction(data) {

  	var oldEarth = data[1];
  	currentMoon = data[2];

  	var hodlerStatus = currentMoon>=oldEarth;

    var randomDump = getRandom(maximum);
    var randomPump = getRandom(maximum);

    var rollerCoasterStatus = hodlerStatus ? hodlersBelike[randomPump] : tronaldDump[randomDump];
    $('#current-moon').html('$'+currentMoon+" USD");

    document.title = '('+Number(currentMoon).toFixed(1)+')' + " Bitcoin Roller Coaster Guy";

    rBitcoin_or_rBtc(hodlerStatus);

    $('#roller-coaster-status').html(rollerCoasterStatus);
    feeRequest();
  }

  function rBitcoin_or_rBtc(hodlerStatus){
    if(!hodlerStatus){
      $('#roller-coaster-guy').toggleClass("here-we-go");
      $('.panel').toggleClass("panel-danger").toggleClass("panel-success");
      $('.label').toggleClass("label-danger").toggleClass("label-success");
    }
  }


  function getRandom(max) {
    return Math.round(Math.random()*max);
  }


  moonTicker();
  setInterval(moonTicker, 10 * 1000);


  //thread txCount request
  function txCountRequest() {
    $.ajax({
      dataType: "json",
      url: "https://blockchain.info/q/unconfirmedcount?cors=true",
      success: mempoolAttack
    });
  }

  function mempoolAttack(data){
    soMuchTxs = data;
    $('#tx-count').html(soMuchTxs);    
  }

  txCountRequest();
  setInterval(txCountRequest, 30 * 1000);


    //thread for fee request
  function feeRequest() {
    $.ajax({
      dataType: "json",
      url: "https://bitcoinfees.21.co/api/v1/fees/recommended",
      success: makeFeeGreatAgain
    });
  }

  function makeFeeGreatAgain(data){
      var fastestAvgFee = data.fastestFee;
      var fastestAvgFeePerTx = ((fastestAvgFee * 226)/100000000) * currentMoon; 
      $('#fastest-avg-fee').html("~$"+Number(fastestAvgFeePerTx).toFixed(3)+" USD");
    
  }


});
