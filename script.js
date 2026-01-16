import { readNumber } from "./utils.js";
import { SELECTORS, CONSTRAINTS } from "./constants.js";

/**
 * Lấy các DOM elements
 * @returns {Object} - Object chứa các DOM element
 */
function getDOMElements() {
  return {
    input: document.getElementById("input-number"),
    inputFormatted: document.getElementById("input-formatted"),
    alert: document.getElementById("input-alert"),
    textArea: document.getElementById("text-area"),
  };
}

/**
 * Làm sạch input: loại bỏ các ký tự không phải số
 * @param {string} value - Giá trị input
 * @returns {string} - Chuỗi số nguyên
 */
function sanitizeInput(value) {
  return value.replace(/\D/g, "");
}

/**
 * Kiểm tra giá trị có hợp lệ không
 * @param {number} value - Giá trị cần kiểm tra
 * @returns {boolean}
 */
function isValidNumber(value) {
  return !isNaN(value) && value >= CONSTRAINTS.MIN && value <= CONSTRAINTS.MAX;
}

/**
 * Cập nhật giao diện dựa trên giá trị input
 * @param {number} value - Giá trị số
 * @param {Object} elements - DOM elements
 */
function updateUI(value, elements) {
  const isValid = isValidNumber(value);

  // Hiển thị/ẩn alert
  elements.alert.style.display = isValid ? "none" : "block";

  // Hiển thị số được format
  elements.inputFormatted.textContent = `* ${value.toLocaleString("vi-VN")}`;

  // Hiển thị kết quả
  let result = "";
  if (isValid) {
    try {
      result = readNumber(value);
    } catch (error) {
      console.error("Lỗi khi đọc số:", error.message);
      result = "Lỗi: Không thể đọc số này";
    }
  }

  elements.textArea.textContent = result;
}

/**
 * Khởi tạo event listener
 * @param {HTMLElement} inputElement - Input element
 * @param {Object} elements - DOM elements
 */
function initializeEventListener(inputElement, elements) {
  inputElement.addEventListener("input", function () {
    // Làm sạch input
    inputElement.value = sanitizeInput(inputElement.value);

    // Lấy giá trị
    const value = Number(inputElement.value);

    // Cập nhật UI
    updateUI(value, elements);
  });
}

/**
 * Khởi tạo ứng dụng
 */
function initApp() {
  const elements = getDOMElements();
  initializeEventListener(elements.input, elements);
}

// Bắt đầu ứng dụng khi DOM sẵn sàng
initApp();
