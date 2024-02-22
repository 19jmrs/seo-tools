/**
 * @description Open Google PageSpeed Insights for the current page
 * @date 2/16/2024 - 3:15:30 PM
 */
function openPageSpeedInsights() {
  window.open(
    "https://developers.google.com/speed/pagespeed/insights/?url=" +
      encodeURIComponent(window.location.href) +
      "&utm_source=bookmarklet&utm_medium=bookmarklet&utm_campaign=bookmarklet",
    "_blank",
    "toolbar=0,location=0,menubar=0,width=720,height=600"
  );
}

openPageSpeedInsights();
