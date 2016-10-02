'use strict';
var yesCircle = document.getElementById('yes');
var noCircle = document.getElementById('no');

function runAway(event) {
  event.preventDefault();
  var yesRect = yesCircle.getBoundingClientRect();
  var noRect = noCircle.getBoundingClientRect();
  var yesX = (noRect.right + noRect.left / 2) - 270;
  var yesY = (noRect.top + noRect.bottom / 2) - 300;
  var noX = (noRect.right + noRect.left / 2) - 270;
  var noY = (noRect.top + noRect.bottom / 2) - 300;
  var mousePositionX = event.clientX;
  var mousePositionY = event.clientY;

  var distance = Math.sqrt(Math.pow(noX - mousePositionX, 2) + Math.pow(noY - mousePositionY, 2));
  // console.log(yesRect.top, yesRect.right, yesRect.bottom, yesRect.left);
  // console.log(noRect.top, noRect.right, noRect.bottom, noRect.left);
  // console.log(noX + ' ' + mousePositionX);
  // console.log(noY + ' ' + mousePositionY);
  // console.log(distance);
}


yesCircle.addEventListener('mousemove', runAway);
