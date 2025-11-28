const numberTexts = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const unitTexts = ["", "nghìn", "triệu", "tỷ"];

function readThreeDigits(number, hasScale = false) {
  if (number < 10 && !hasScale) return numberTexts[number];

  const hundreds = Math.floor(number / 100);
  const remainder = number % 100;
  const tens = Math.floor(remainder / 10);
  const unit = remainder % 10;
  let text = "";

  if (hundreds > 0) {
    text += numberTexts[hundreds] + " trăm";
  } else if (hasScale) {
    text += " không trăm";
  }

  if (tens === 0 && unit !== 0) {
    text += " lẻ";
  } else if (tens === 1) {
    text += " mười";
  } else if (tens > 1) {
    text += " " + numberTexts[tens] + " mươi";
  }

  if (unit === 5 && tens > 0) {
    text += " lăm";
  } else if (unit === 1 && tens > 1) {
    text += " mốt";
  } else if (unit !== 0) {
    text += " " + numberTexts[unit];
  }

  return text.trim();
}

export function readNumber(number) {
  if (number < 1000) return readThreeDigits(number);

  let text = "";
  let index = 0;
  let lastIndex = Math.floor(String(number).length / 3);

  do {
    const lastThreeDigits = number % 1000;
    const hasScale = index !== lastIndex;

    if (lastThreeDigits > 0) {
      const textNumber = readThreeDigits(lastThreeDigits, hasScale);
      const textUnit = unitTexts[index];
      text = `${textNumber} ${textUnit} ${text}`;
    }

    number = Math.floor(number / 1000);
    index++;
  } while (number > 0);

  return text.trim();
}
