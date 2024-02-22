/**
 * @description Scrapes all headings elements of the current page and copies them to the clipboard.
 * @description The copied headings are prefixed with their level (H1, H2, H3, etc.)
 */
function copyHeadingsToClipboard() {
  var headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  var output = "";
  for (var i = 0; i < headings.length; i++) {
    var heading = headings[i];
    var level = parseInt(heading.tagName[1]);
    output += "H" + level + "\t" + heading.textContent.trim() + "\n";
  }
  var temp = document.createElement("textarea");
  temp.value = output;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("All headings have been copied to your clipboard.");
}

copyHeadingsToClipboard();
