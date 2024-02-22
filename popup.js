const extpay = ExtPay("seo-tools");

const keywordCounter1 = document.getElementById("btn-kw-c-1");
const keywordCounter2 = document.getElementById("btn-kw-c-2");
const scrapeHeaders = document.getElementById("btn-scrap-headers");
const linkHighlight = document.getElementById("btn-lnk-hl");
const noFollow = document.getElementById("btn-no-follow");
const copyLinks = document.getElementById("btn-copy-links");
const openPageSpeed = document.getElementById("btn-page-speed");

document
  .getElementById("pay-now")
  .addEventListener("click", extpay.openPaymentPage);

document
  .getElementById("free-trial")
  .addEventListener("click", extpay.openTrialPage);

extpay
  .getUser()
  .then((user) => {
    const now = new Date();
    const seveDays = 1000 * 60 * 60 * 24 * 7;
    if (
      user.paid ||
      (user.trialStartedAt && now - user.trialStartedAt < seveDays)
    ) {
      document.getElementById("pay").classList.add("hidden");
      document.getElementById("application").classList.remove("hidden");

      async function getCurrentTab() {
        const queryOptions = { active: true, currentWindow: true };
        const [tab] = await chrome.tabs.query(queryOptions);
        return tab;
      }

      //doc When the button is injects the keyword-counter.js script into the current tab to count the keywords
      keywordCounter1.addEventListener("click", async () => {
        const tab = await getCurrentTab();

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["keyword-counter.js"],
        });
      });

      //doc When the button is injects the keyword-counter-nn.js script into the current tab to count the keywords
      keywordCounter2.addEventListener("click", async () => {
        const tab = await getCurrentTab();

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["keyword-counter-nn.js"],
        });
      });

      //doc When the button is clicked, injects the scrap-headers.js script into the current tab to scrape the headers
      scrapeHeaders.addEventListener("click", async () => {
        const tab = await getCurrentTab();

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["scrap-headers.js"],
        });
      });

      linkHighlight.addEventListener("click", async () => {
        const tab = await getCurrentTab();

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["link-highlight.js"],
        });
      });

      noFollow.addEventListener("click", async () => {
        const tab = await getCurrentTab();

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["no-follow.js"],
        });
      });

      copyLinks.addEventListener("click", async () => {
        const tab = await getCurrentTab();

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["copy-links.js"],
        });
      });

      openPageSpeed.addEventListener("click", async () => {
        const tab = await getCurrentTab();

        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["open-page-speed.js"],
        });
      });
    }
  })
  .catch((err) => {
    document.querySelector("p").innerHTML =
      "Error fetching data :( Check that your ExtensionPay id is correct and you're connected to the internet";
  });
