'use strict';
var yesCircle = document.getElementById('yes');
var noCircle = document.getElementById('no');
var salmon = document.getElementById('salmon');
var loveBubble = document.getElementById('love');
var toFill = document.getElementById('footerfill');
var ulEl = document.getElementById('ul');
var yesArray = ['Definitely', 'I do', 'Certainly', 'With all my heart', 'Of course', 'Who doesn\'t?', 'MMM YES', 'Yup', 'Ya...duh'];

function makeYes() {
  noCircle.firstChild.textContent = 'YES';
  yesCircle.firstChild.textContent = 'no';
}

function makeNoAgain() {
  var yesAnswer = yesArray[Math.round(Math.random() * (yesArray.length - 1))];
  noCircle.firstChild.textContent = 'no';
  yesCircle.firstChild.textContent = yesAnswer;
}

function salmonLove() {
  loveBubble.style.visibility = 'visible';
}

function salmonNoLove() {
  loveBubble.style.visibility = 'hidden';
}

function showLocations() {
 toFill.innerHTML = '<ul id="loclist"><li><h3>1st and Pike</h3><p>1444 1st Ave.</p><p>Seattle, WA 98101</p><p>206-867-5309</p></li><li><h3>SeaTac Airport</h3><p>Terminal 2</p><p>17801 International Blvd.</p><p>Seattle, WA 98158</p><p>206-867-5308</p></li><li><h3>Seattle Center</h3><p>305 Harrison St.</p><p>Seattle, WA 98109</p><p>206-867-5307</p></li><h3>Capitol Hill</h3><p>877 11th Ave.</p><p>Seattle, WA 98102</p><p>206-867-5306</p></li><li><h3>Alki</h3><p>3200 60th Ave.</p><p>Seattle, WA 98116</p><p>206-867-5305</p></li></ul>';
}

function showHours() {
  toFill.innerHTML = '<h3>All Locations:</h3><p>6:00am - 8:00pm</p><p>7 days per week</p>'
}

function showContactInfo() {
  toFill.innerHTML = '<h3>Pat:</h3><p>206-188-2990</p><h3>Customer Service</h3><p>1-800-888-9912</p>';
}

function showNutritionInfo() {
  toFill.innerHTML = '<h2>All of our salmon cookies are:</h2><ul><li>High in quality protein</li><li>Good sources of Omega 3 Fatty Acids</li><li>Devoid of MSG</li></ul>';
}

function showSwag() {
  toFill.innerHTML = '<ul id="swaglist"><li><figure><img src="img/cutter.jpeg"><figcaption>Make your own salmon shaped cookies!<h4>$24</h4></figcaption></figure></li><li><figure><img src="img/shirt.jpg"><figcaption>Let everyone know you have great taste<h4>$64</h4></figcaption></figure></li></ul>';
}

function handleNav(event) {
  var which = event.target.id;
  if (which === 'locations') {
    showLocations();
  } else if (which === 'hours') {
    showHours();
  } else if (which === 'contact') {
    showContactInfo();
  } else if (which === 'nutrition') {
    showNutritionInfo();
  } else if (which === 'swag') {
    showSwag();
  } else {
    toFill.innerHTML = '<img src="img/fish.jpg">'
  }
}
yesCircle.addEventListener('mousedown', salmonLove);
yesCircle.addEventListener('mouseup', salmonNoLove);
noCircle.addEventListener('mouseover', makeYes);
noCircle.addEventListener('mouseout', makeNoAgain);
ulEl.addEventListener('click', handleNav);
