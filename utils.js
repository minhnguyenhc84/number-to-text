import { DIGITS, UNITS, TEXT } from "./constants.js";

/**
 * Trích xuất hàng trăm, chục, đơn vị từ một số
 * @param {number} number - Số cần trích (0-999)
 * @returns {Object} {hundreds, tens, unit}
 */
function extractDigits(number) {
  return {
    hundreds: Math.floor(number / 100),
    tens: Math.floor((number % 100) / 10),
    unit: number % 10,
  };
}

/**
 * Đọc hàng trăm
 * @param {number} hundreds - Chữ số hàng trăm
 * @param {boolean} hasScale - Có đơn vị hàng không
 * @returns {string}
 */
function readHundreds(hundreds, hasScale) {
  if (hundreds > 0) {
    return `${DIGITS[hundreds]} ${TEXT.HUNDRED}`;
  }
  return hasScale ? `không ${TEXT.HUNDRED}` : "";
}

/**
 * Đọc hàng chục và đơn vị
 * @param {number} tens - Chữ số hàng chục
 * @param {number} unit - Chữ số hàng đơn vị
 * @returns {string}
 */
function readTensAndUnits(tens, unit) {
  let text = "";

  if (tens === 0 && unit !== 0) {
    text += TEXT.ODD;
  } else if (tens === 1) {
    text += TEXT.TEN;
  } else if (tens > 1) {
    text += `${DIGITS[tens]} ${TEXT.TENS}`;
  }

  if (unit === 5 && tens > 0) {
    text += ` ${TEXT.LAM}`;
  } else if (unit === 1 && tens > 1) {
    text += ` ${TEXT.MOT}`;
  } else if (unit !== 0) {
    text += ` ${DIGITS[unit]}`;
  }

  return text;
}

/**
 * Đọc ba chữ số cuối
 * @param {number} number - Số cần đọc (0-999)
 * @param {boolean} hasScale - Có đơn vị hàng không (triệu, tỷ, ...)
 * @returns {string}
 */
function readThreeDigits(number, hasScale = false) {
  // Trường hợp số < 10 và không có đơn vị hàng
  if (number < 10 && !hasScale) {
    return DIGITS[number];
  }

  const { hundreds, tens, unit } = extractDigits(number);

  let result = [];

  const hundredsText = readHundreds(hundreds, hasScale);
  if (hundredsText) result.push(hundredsText);

  const tensUnitsText = readTensAndUnits(tens, unit);
  if (tensUnitsText) result.push(tensUnitsText);

  return result.join(" ");
}

/**
 * Đọc một số bất kỳ (1 - 999,999,999,999)
 * @param {number} num - Số cần đọc
 * @returns {string} - Số được đọc dưới dạng chữ
 * @throws {Error} - Nếu input không hợp lệ
 */
export function readNumber(num) {
  // Validation
  if (!Number.isInteger(num) || num < 0) {
    throw new Error("Input phải là số nguyên dương");
  }

  // Trường hợp số < 1000
  if (num < 1000) {
    return readThreeDigits(num);
  }

  let text = "";
  let scaleIndex = 0;
  let totalScales = Math.floor(String(num).length / 3);

  // Xử lý từng nhóm 3 chữ số từ phải sang trái
  while (num > 0) {
    const threeDigits = num % 1000;
    const hasScale = scaleIndex !== totalScales;

    if (threeDigits > 0) {
      const readText = readThreeDigits(threeDigits, hasScale);
      const scaleUnit = UNITS[scaleIndex];
      text = `${readText} ${scaleUnit} ${text}`.trim();
    }

    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return text.trim();
}
