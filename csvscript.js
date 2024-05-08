const fs = require("fs");
const csv = require("csv-parser");

let html = "";

const csvFile = "csvs/AA_IND.csv";
const course = "452 - Senior Degree Project";

fs.createReadStream(csvFile)
  .pipe(csv())
  .on("data", (row) => {
    if (row["Course Selection"] === course) {
      html += "<div>\n";
      html += `<h3>${row["Project Title"]}</h3>\n`;
      html += `<h4>${row["Name"]}</h4>\n`;
      if (row["Project Description"]) {
        html += "<h5>Project Description</h5>\n";
        html += `<p>${row["Project Description"]}</p>\n`;
      }
      if (
        row["Link to Personal Website"] ||
        row["Link to Steam or itch.io Page"] ||
        row["Link to Video"]
      ) {
        html += "<h5>Links</h5>\n<ul>\n";
        if (row["Link to Steam or itch.io Page"]) {
          html += `<li><a href="${row["Link to Steam or itch.io Page"]}" target="_blank">Steam/itch.io</a></li>\n`;
        }
        if (row["Link to Video"]) {
          html += `<li><a href="${row["Link to Video"]}" target="_blank">Video</a></li>\n`;
        }
        if (row["Link to Personal Website"]) {
          html += `<li><a href="${row["Link to Personal Website"]}" target="_blank">Personal Website</a></li>\n`;
        }
        html += "</ul>\n";
      }
        html += "</div>\n";
        html += "<hr>\n";
        html += "\n";
    }
  })
  .on("end", () => {
    console.log(html);
  });
