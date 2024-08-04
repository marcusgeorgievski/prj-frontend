// import * as pdfjsLib from 'pdfjs-dist';
// import JSZip from 'jszip';

// export async function extractTextFromDocx(file) {
//   const arrayBuffer = await file.arrayBuffer();
//   const zip = new JSZip();
//   const content = await zip.loadAsync(arrayBuffer);
//   const doc = await content.file('word/document.xml').async('string');
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(doc, 'application/xml');
//   const texts = xmlDoc.getElementsByTagName('w:t');
//   let textContent = '';

//   for (let i = 0; i < texts.length; i++) {
//     textContent += texts[i].textContent + ' ';
//   }

//   return textContent;
// }

// export async function extractTextFromPDF(file) {
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
//   let textContent = '';

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const text = await page.getTextContent();
//     textContent += text.items.map((item) => item.str).join(' ');
//   }

//   return textContent;
// }
