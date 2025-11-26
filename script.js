import { readThreeDigits } from "./utils.js";

const input = document.getElementById("input-number");
const alert = document.getElementById("input-alert");
const textArea = document.getElementById("text-area");

input.addEventListener("input", function () {
  input.value = input.value.replace(/\D/g, ""); // loại bỏ các ký tự không phải số

  const value = Number(input.value);
  let text = null;

  if (isNaN(value) || value < 1 || value > 999) {
    alert.style.display = "block";
  } else {
    alert.style.display = "none";
    text = readThreeDigits(value);
  }

  textArea.textContent = text;
});
