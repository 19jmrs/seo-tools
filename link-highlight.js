/**
 * @description Highlights external links in red and internal links in green
 * @date 2/16/2024 - 3:02:08 PM
 */
function highlightExternalLinks() {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href");
    if (
      href &&
      href.indexOf(
        window.location.protocol + "//" + window.location.hostname
      ) !== 0
    ) {
      links[i].style.backgroundColor = "red";
    } else {
      links[i].style.backgroundColor = "green";
    }
  }
}

highlightExternalLinks();
