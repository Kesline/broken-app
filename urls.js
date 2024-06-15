const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Function to download HTML from a URL and save it to a file
async function downloadAndSaveHtml(url) {
  try {
    const response = await axios.get(url);
    const { data } = response;
    const hostname = new URL(url).hostname;
    const filename = path.join(__dirname, `${hostname}.txt`);
    fs.writeFileSync(filename, data);
    console.log(`Wrote to ${hostname}`);
  } catch (error) {
    console.error(`Couldn't download ${url}: ${error.message}`);
  }
}

// Main function to read URLs from a file and process them
async function processUrlsFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    const urls = data.trim().split('\n');
    const downloadPromises = urls.map(url => downloadAndSaveHtml(url));
    await Promise.all(downloadPromises);
  } catch (error) {
    console.error(`Error reading file ${filename}: ${error.message}`);
    process.exit(1); // Exit with error status
  }
}

// Extract filename from command line arguments
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1); // Exit with error status
}

// Call main function with provided filename
const filename = args[0];
processUrlsFile(filename);
