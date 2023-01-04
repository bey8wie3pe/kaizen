let quantity = 0;
let total = 0;

function updateQuantity(newQuantity) {
  quantity = newQuantity;
  updateTotal();
}

function updateTotal() {
  let unitPrice = Number($("#unit_price").val());
  total = quantity * unitPrice;
  $("#test").html(`${quantity}本目`);
  $("#money").html(`${total}円`);
}

$("#plus").click(function() {
  updateQuantity(quantity + 1);
});

$("#minus").click(function() {
  updateQuantity(Math.max(0, quantity - 1));
});

function finish() {
  let time = moment().locale("ja").format("LLL");
  document.cookie = `siraga=${quantity} ; max-age=2592000`;
  document.cookie = `total=${total} ; max-age=2592000`;
  document.cookie = `time=${time} ; max-age=2592000`;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return decodeURIComponent(matches[1]);
}

let previousQuantity = Number(getCookie("siraga"));
if (isNaN(previousQuantity)) {
  previousQuantity = 0;
}
let hair = document.getElementById('hair');
hair.innerHTML = `前回は${previousQuantity}本抜きました。`;

let previousTotal = Number(getCookie("total"));
if (isNaN(previousTotal)) {
  previousTotal = 0;
}
let lastTotal = document.getElementById('total');
lastTotal.innerHTML = `前回は${previousTotal}円でした。`;

let previousTime = getCookie("time");
let timeElement = document.getElementById('time');
timeElement.innerHTML = `前回は${previousTime}にしました。`;

