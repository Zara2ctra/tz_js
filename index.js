function serialize(arr) {
    let serialized = '';
    for (const num of arr) {
        if (num < 128) {
            serialized += String.fromCharCode(num);
        } else {
            serialized += String.fromCharCode(128 + Math.floor(num / 128), num % 128);
        }
    }
    return serialized;
}

function unserialize(str) {
    const result = [];
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode < 128) {
            result.push(charCode);
        } else {
            const highByte = charCode - 128;
            const lowByte = str.charCodeAt(++i);
            result.push(highByte * 128 + lowByte);
        }
    }
    return result;
}


const tests = [
    [1, 2, 3, 50, 100, 150],
    [...Array(50).fill().map(() => Math.floor(Math.random() * 300))],
    [...Array(100).fill().map(() => Math.floor(Math.random() * 300))],
    [...Array(500).fill().map(() => Math.floor(Math.random() * 300))],
    [...Array(1000).fill().map(() => Math.floor(Math.random() * 300))],
    [...Array(1000).fill().map(() => Math.floor(Math.random() * 9) + 1)],
    [...Array(1000).fill().map(() => Math.floor(Math.random() * 90) + 10)],
    [...Array(300).fill().map(() => Math.floor(Math.random() * 900) + 100)],
    [...Array(300).fill().map(() => [1, 2, 3])].flat(),
];

tests.forEach(test => {
    const input = test;
    const serialized = serialize(input);
    const deserialized = unserialize(serialized);
    const compressionRatio = serialized.length / (input.length * 2);

    console.log('Input:', input);
    console.log('Serialized:', serialized);
    console.log('Deserialized:', deserialized);
    console.log('Compression Ratio:', compressionRatio.toFixed(2));
    console.log('');
});
