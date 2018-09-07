const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
const writeStream = fs.createWriteStream("post.csv");

// Write Headers
writeStream.write(`Text, Link \n`);

request("https://www.wikipedia.org/", (error, response, body) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(body);

    links = $("a"); //jquery get all hyperlinks
    $(links).each(function(i, link) {
      const title = $(link).text() + ":\n  ";
      const URL = $(link).attr("href");
      // console.log($(link).text() + ":\n  " + $(link).attr("href"));
      //Write Row To CSV
      writeStream.write(`${title}, ${URL}\n`);
    });
  }
});