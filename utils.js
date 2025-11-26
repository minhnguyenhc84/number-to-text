const words = [
  "không",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];

export function readThreeDigits(number) {
  if (number < 10) return words[number];

  const hundreds = Math.floor(number / 100);
  const remainder = number % 100;
  const tens = Math.floor(remainder / 10);
  const units = remainder % 10;
  let text = "";

  // handle hundreds part
  if (hundreds > 0) {
    text += words[hundreds] + " trăm ";
  }

  // handle tens part
  // 0 -> lẻ
  // 10 -> mười
  // 20 -> mươi
  if (tens === 0 && units !== 0) {
    text += "lẻ ";
  } else if (tens === 1) {
    text += "mười ";
  } else if (tens > 1) {
    text += words[tens] + " mươi ";
  }

  // handle units part
  // 11 -> mười MỘT
  // 21 -> hai mươi MỐT
  // 35 -> ba mươi LĂM
  if (units === 1 && tens > 1) {
    text += "mốt ";
  } else if (units === 5 && tens > 0) {
    text += "lăm ";
  } else if (units !== 0) {
    text += words[units];
  }

  return text.trim();
}

// console.log(readThreeDigits(11));
// console.log(readThreeDigits(15));
// console.log(readThreeDigits(20));
// console.log(readThreeDigits(21));
// console.log(readThreeDigits(25));
// console.log(readThreeDigits(100));
// console.log(readThreeDigits(101));
// console.log(readThreeDigits(110));
// console.log(readThreeDigits(111));
// console.log(readThreeDigits(115));
