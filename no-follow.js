/**
 * @description Highlights nofollow links with a red border
 * @date 2/16/2024 - 3:05:24 PM
 */
function styleNofollowLinks() {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel.toLowerCase().indexOf("nofollow") !== -1) {
      links[i].style.border = "2px solid red";
    }
  }
}
