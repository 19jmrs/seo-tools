/**
 * @name keywordCounter
 * @param {string} keywordList - Ask for a list of keywords using a alert box, separated by comma
 * @description This function goes throught the html of the current page and counts the number of times a keyword is found in the following places:
 * - Main URL
 * - Meta Title
 * - H1, H2, H3, H4, H5, H6
 * - Paragraph Text, Anchor Text, Img Alt, Bold, Italic
 * - Word Count
 * - Meta Description, Meta Keywords, Open Graph Title, Open Graph Description, Twitter Card Title, Twitter Card Description
 * - Body, Head
 * - Image File Name, Figure Caption
 * - Source Code URL
 * - Microdata (schema format), RDF (schema format), JSON LD (schema format)
 * - HTML Head & Body Tags
 * @date 2/15/2024 - 5:39:30 PM
 */
function keywordCounter() {
  function countKeywordsInText(text, keywordPattern) {
    return (text.match(keywordPattern) || []).length;
  }

  function countKeywordsInElements(elements, keywordPattern) {
    console.log(
      Array.from(elements).map((element) =>
        countKeywordsInText(element.textContent, keywordPattern)
      )
    );
    return Array.from(elements).reduce(
      (count, element) =>
        count + countKeywordsInText(element.textContent, keywordPattern),
      0
    );
  }

  function countKeywordsInAttribute(elements, attr, keywordPattern) {
    return Array.from(elements).reduce(
      (count, element) =>
        count +
        countKeywordsInText(element.getAttribute(attr) || "", keywordPattern),
      0
    );
  }

  function countKeywordsInSchemaData(scriptType, keywordPattern) {
    const schemaScripts = Array.from(
      document.querySelectorAll(`script[type="${scriptType}"]`)
    );
    return schemaScripts.reduce(
      (count, script) =>
        count + countKeywordsInText(script.textContent, keywordPattern),
      0
    );
  }

  function countKeywordsInMicrodata(keywordPattern) {
    const microdataElements = Array.from(
      document.querySelectorAll("[itemscope]")
    );
    return microdataElements.reduce(
      (count, element) =>
        count +
        countKeywordsInText(
          element.getAttribute("itemscope") || "",
          keywordPattern
        ),
      0
    );
  }

  function countKeywordsInRDF(keywordPattern) {
    const microdataElements = Array.from(document.querySelectorAll("[vocab]"));
    return microdataElements.reduce(
      (count, element) =>
        count +
        countKeywordsInText(
          element.getAttribute("vocab") || "",
          keywordPattern
        ),
      0
    );
  }

  function countKeywordsInNestedElements(parentElement, keywordPattern) {
    return Array.from(parentElement.querySelectorAll("*")).reduce(
      (count, element) =>
        count + countKeywordsInText(element.textContent || "", keywordPattern),
      0
    );
  }

  function countKeywordsInNestedAttributes(parentElement, keywordPattern) {
    return Array.from(parentElement.querySelectorAll("*")).reduce(
      (count, element) => {
        for (let i = 0; i < element.attributes.length; i++) {
          count += countKeywordsInText(
            element.attributes[i].value,
            keywordPattern
          );
        }
        return count;
      },
      0
    );
  }

  function countKeywordsInURL(url, kebabKeywordPattern) {
    return (url.match(kebabKeywordPattern) || []).length;
  }

  const keywordList = prompt("Enter keyword(s) separated by comma:")
    .split(",")
    .map((k) => k.trim());
  const keywordPattern = new RegExp(
    "\\b(" +
      keywordList
        .map((k) => k.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"))
        .join("|") +
      ")\\b",
    "gi"
  );
  const kebabKeywordPattern = new RegExp(
    "\\b(" +
      keywordList
        .map((k) =>
          k.replace(/ /g, "-").replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        )
        .join("|") +
      ")\\b",
    "gi"
  );

  const result = {};
  result["Main URL"] = countKeywordsInText(location.href, kebabKeywordPattern);
  result["Meta Title"] = document.querySelector("title")
    ? countKeywordsInText(
        document.querySelector("title").textContent,
        keywordPattern
      )
    : 0;

  ["H1", "H2", "H3", "H4", "H5", "H6"].forEach((tag) => {
    result[tag] = countKeywordsInElements(
      document.getElementsByTagName(tag),
      keywordPattern
    );
  });

  result["Paragraph Text"] = countKeywordsInElements(
    document.getElementsByTagName("p"),
    keywordPattern
  );
  result["Anchor Text"] = countKeywordsInElements(
    document.getElementsByTagName("a"),
    keywordPattern
  );
  result["Img Alt"] = countKeywordsInAttribute(
    document.getElementsByTagName("img"),
    "alt",
    keywordPattern
  );
  result["Bold"] = countKeywordsInElements(
    document.querySelectorAll("b, strong"),
    keywordPattern
  );
  result["Italic"] = countKeywordsInElements(
    document.querySelectorAll("i, em"),
    keywordPattern
  );

  result["Word Count"] =
    countKeywordsInElements(
      document.getElementsByTagName("html"),
      keywordPattern
    ) +
    countKeywordsInNestedAttributes(
      document.querySelector("html"),
      keywordPattern
    );
  result["Meta Description"] = countKeywordsInAttribute(
    document.querySelectorAll('meta[name="description"]'),
    "content",
    keywordPattern
  );
  result["Meta Keywords"] = countKeywordsInAttribute(
    document.querySelectorAll('meta[name="keywords"]'),
    "content",
    keywordPattern
  );
  result["Open Graph Title"] = countKeywordsInAttribute(
    document.querySelectorAll('meta[property="og:title"]'),
    "content",
    keywordPattern
  );
  result["Open Graph Description"] = countKeywordsInAttribute(
    document.querySelectorAll('meta[property="og:description"]'),
    "content",
    keywordPattern
  );
  result["Twitter Card Title"] = countKeywordsInAttribute(
    document.querySelectorAll('meta[name="twitter:title"]'),
    "content",
    keywordPattern
  );
  result["Twitter Card Description"] = countKeywordsInAttribute(
    document.querySelectorAll('meta[name="twitter:description"]'),
    "content",
    keywordPattern
  );

  result["Body"] =
    countKeywordsInText(document.body.textContent, keywordPattern) +
    countKeywordsInNestedAttributes(
      document.querySelector("body"),
      keywordPattern
    );
  result["Head"] =
    countKeywordsInNestedElements(
      document.querySelector("head"),
      keywordPattern
    ) +
    countKeywordsInNestedAttributes(
      document.querySelector("head"),
      keywordPattern
    );
  result["Image File Name"] = countKeywordsInAttribute(
    document.getElementsByTagName("img"),
    "src",
    kebabKeywordPattern
  );
  result["Figure Caption"] = countKeywordsInElements(
    document.getElementsByTagName("figcaption"),
    keywordPattern
  );
  result["Source Code URL"] = countKeywordsInURL(
    document.documentElement.outerHTML,
    kebabKeywordPattern
  );
  result["Microdata (schema format)"] =
    countKeywordsInMicrodata(keywordPattern);
  result["RDF (schema format)"] = countKeywordsInRDF(keywordPattern);
  result["JSON LD (schema format)"] = countKeywordsInSchemaData(
    "application/ld+json",
    keywordPattern
  );
  result["HTML Head & Body Tags"] =
    countKeywordsInText(document.body.textContent, keywordPattern) +
    countKeywordsInNestedAttributes(
      document.querySelector("body"),
      keywordPattern
    ) +
    countKeywordsInNestedElements(
      document.querySelector("head"),
      keywordPattern
    ) +
    countKeywordsInNestedAttributes(
      document.querySelector("head"),
      keywordPattern
    );

  let clipboardData = "";
  for (const [key, value] of Object.entries(result)) {
    clipboardData += `${key} : ${value}\n`;
  }

  navigator.clipboard.writeText(clipboardData).then(
    () => {
      alert("Results copied to clipboard");
    },
    () => {
      alert("Failed to copy results to clipboard");
    }
  );
}

keywordCounter();
