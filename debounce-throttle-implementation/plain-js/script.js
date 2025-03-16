"use strict";
const username = document.querySelector(".username");
const debounceValue = document.querySelector(".debounce-value");
const throttleValue = document.querySelector(".throttle-value");
const normalValue = document.querySelector(".normal-value");

function debounce() {
  let timer;
  return (text) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      debounceValue.textContent = text;
    }, 1000);
  };
}

const timer = debounce();

//-----------Throttling---------------
const throttling = function () {
  let isActive = true;

  let outputText;

  return (text) => {
    outputText = text;
    if (!isActive) {
      return;
    }
    isActive = false;
    throttleValue.textContent = text;

    setTimeout(() => {
      isActive = true;
      throttleValue.textContent = outputText;
    }, 1000);
  };
};
const interval = throttling();

//........................
username.addEventListener("input", function (e) {
  const value = e.target.value;
  normalValue.textContent = value;
  timer(value);
  interval(value);
});

