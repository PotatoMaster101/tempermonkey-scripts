// ==UserScript==
// @name         SimpleLogin Alias Matcher
// @namespace    http://tampermonkey.net/
// @version      2025-11-21
// @description  Matches a custom alias on SimpleLogin.
// @author       PotatoMaster101
// @match        https://app.simplelogin.io/dashboard/custom_alias
// @icon         https://www.google.com/s2/favicons?sz=64&domain=simplelogin.io
// @grant        none
// ==/UserScript==

(function() {
  "use strict";

  const conditionMet = (regex) => {
    const el = document.querySelector("body > div > div.flex-fill > div.my-2.my-md-2 > div > div > div > form > div:nth-child(1) > div:nth-child(2) > select");
    const email = el.options[el.selectedIndex].text;
    return (new RegExp(regex)).test(email);
  };

  let rgx = localStorage.getItem("regex") || "";
  while (rgx == "" || rgx == null) {
    rgx = prompt("Alias regex:", "\\.[a-z]{3}\\d{3}");
  }
  localStorage.setItem("regex", rgx);

  if (!conditionMet(rgx)) {
    console.log("Alias not matching, refreshing...");
    setTimeout(() => { location.reload(); }, 1000);
  } else {
    console.log("Alias matched");
  }
})();
