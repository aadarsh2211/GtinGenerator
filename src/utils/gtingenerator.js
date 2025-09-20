function randomDigits(count) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 10));
}

function generateGTIN(prefix, totalLength, checkDigitLength = totalLength) {
    const randomCount = totalLength - prefix.length - 1;
    const digits = [...prefix, ...randomDigits(randomCount)];
    digits.push(calculateCheckDigit(digits, checkDigitLength));
    return digits.join("");
}

export function generateGTIN14() {
    return generateGTIN([0, 0, 3], 14, 14);
}

export function generateGTIN13() {
    return generateGTIN([0,0], 13, 13);
}

export function generateGTIN12() {
    return generateGTIN([0,0], 12, 12);
}

export function generateGTIN8() {
    return generateGTIN([0,0], 8, 8);
}

function calculateCheckDigit(digits, length) {
    let sum = 0;
    if (length === 13) {
        // GTIN-13 weighting: odd=1, even=3 (left-to-right, 0-based index)
        for (let i = 0; i < digits.length; i++) {
            sum += digits[i] * (i % 2 === 0 ? 1 : 3);
        }
    } else {
        // GTIN-8, 12, 14 weighting: odd=3, even=1 (right-to-left)
        const reversed = [...digits].reverse();
        reversed.forEach((num, index) => {
            sum += index % 2 === 0 ? num * 3 : num;
        });
    }

    const remainder = sum % 10;
    return remainder === 0 ? 0 : 10 - remainder;
}