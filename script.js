import { readNumber } from "./utils.js";

const input = document.getElementById("input-number");
const inputFormatted = document.getElementById("input-formatted");
const alert = document.getElementById("input-alert");
const textArea = document.getElementById("text-area");

input.addEventListener("input", function () {
  input.value = input.value.replace(/\D/g, ""); // loại bỏ các ký tự không phải số

  const value = Number(input.value);
  const min = 1;
  const max = 1e12 - 1;
  let text = "";

  if (isNaN(value) || value < min || value > max) {
    alert.style.display = "block";
  } else {
    alert.style.display = "none";
    text = readNumber(value);
  }

  textArea.textContent = text;
  inputFormatted.textContent = `* ${value.toLocaleString("vi-VN")}`;
});
