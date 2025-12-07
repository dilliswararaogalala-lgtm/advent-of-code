import { chunk } from "jsr:@std/collections";

const imageData = "123456789012".split('');

const imageSize = 3 * 2;

const chunks = chunk(imageData, imageSize);

console.log(chunks);