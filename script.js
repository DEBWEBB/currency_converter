let country_list = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW"
};

let apiKey = "e759f92560e41c99ee6213a2";

const dropList = document.querySelectorAll("form select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "INR"
        ? "selected"
        : "";
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => {
  getExchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  const exchangeRateTxt = document.querySelector("form .exchange-rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = "Something went wrong";
    });
}
let country_list = {
  AED: { country: "United Arab Emirates", code: "AE", symbol: "د.إ" },
  AFN: { country: "Afghanistan", code: "AF", symbol: "؋" },
  XCD: { country: "Antigua and Barbuda", code: "AG", symbol: "EC$" },
  ALL: { country: "Albania", code: "AL", symbol: "Lek" },
  AMD: { country: "Armenia", code: "AM", symbol: "֏" },
  ANG: { country: "Netherlands Antilles", code: "AN", symbol: "ƒ" },
  AOA: { country: "Angola", code: "AO", symbol: "Kz" },
  AQD: { country: "Antarctica", code: "AQ", symbol: "" },
  ARS: { country: "Argentina", code: "AR", symbol: "$" },
  AUD: { country: "Australia", code: "AU", symbol: "$" },
  AZN: { country: "Azerbaijan", code: "AZ", symbol: "₼" },
  BAM: { country: "Bosnia and Herzegovina", code: "BA", symbol: "KM" },
  BBD: { country: "Barbados", code: "BB", symbol: "$" },
  BDT: { country: "Bangladesh", code: "BD", symbol: "৳" },
  XOF: { country: "West African Economic and Monetary Union", code: "BE", symbol: "CFA" },
  BGN: { country: "Bulgaria", code: "BG", symbol: "лв" },
  BHD: { country: "Bahrain", code: "BH", symbol: ".د.ب" },
  BIF: { country: "Burundi", code: "BI", symbol: "Fr" },
  BMD: { country: "Bermuda", code: "BM", symbol: "$" },
  BND: { country: "Brunei", code: "BN", symbol: "$" },
  BOB: { country: "Bolivia", code: "BO", symbol: "$b" },
  BRL: { country: "Brazil", code: "BR", symbol: "R$" },
  BSD: { country: "Bahamas", code: "BS", symbol: "$" },
  NOK: { country: "Norway", code: "BV", symbol: "kr" },
  BWP: { country: "Botswana", code: "BW", symbol: "P" },
  BYR: { country: "Belarus", code: "BY", symbol: "p." },
  BZD: { country: "Belize", code: "BZ", symbol: "$" },
  CAD: { country: "Canada", code: "CA", symbol: "$" },
  CDF: { country: "Democratic Republic of the Congo", code: "CD", symbol: "Fr" },
  XAF: { country: "Central African Economic and Monetary Community", code: "CF", symbol: "CFA" },
  CHF: { country: "Switzerland", code: "CH", symbol: "Fr" },
  CLP: { country: "Chile", code: "CL", symbol: "$" },
  CNY: { country: "China", code: "CN", symbol: "¥" },
  COP: { country: "Colombia", code: "CO", symbol: "$" },
  CRC: { country: "Costa Rica", code: "CR", symbol: "₡" },
  CUP: { country: "Cuba", code: "CU", symbol: "$" },
  CVE: { country: "Cape Verde", code: "CV", symbol: "$" },
  CYP: { country: "Cyprus", code: "CY", symbol: "€" },
  CZK: { country: "Czech Republic", code: "CZ", symbol: "Kč" },
  DJF: { country: "Djibouti", code: "DJ", symbol: "Fr" },
  DKK: { country: "Denmark", code: "DK", symbol: "kr" },
  DOP: { country: "Dominican Republic", code: "DO", symbol: "RD$" },
  DZD: { country: "Algeria", code: "DZ", symbol: "د.ج" },
  ECS: { country: "Ecuador", code: "EC", symbol: "$" },
  EEK: { country: "Estonia", code: "EE", symbol: "kr" },
  EGP: { country: "Egypt", code: "EG", symbol: "ج.م" },
  ETB: { country: "Ethiopia", code: "ET", symbol: "Br" },
  EUR: { country: "Eurozone", code: "FR", symbol: "€" },
  FJD: { country: "Fiji", code: "FJ", symbol: "$" },
  FKP: { country: "Falkland Islands", code: "FK", symbol: "$" },
  GBP: { country: "United Kingdom", code: "GB", symbol: "£" },
  GEL: { country: "Georgia", code: "GE", symbol: "ლ" },
  GGP: { country: "Guernsey", code: "GG", symbol: "£" },
  GHS: { country: "Ghana", code: "GH", symbol: "₵" },
  GIP: { country: "Gibraltar", code: "GI", symbol: "£" },
  GMD: { country: "Gambia", code: "GM", symbol: "D" },
  GNF: { country: "Guinea", code: "GN", symbol: "Fr" },
  GTQ: { country: "Guatemala", code: "GT", symbol: "Q" },
  GYD: { country: "Guyana", code: "GY", symbol: "$" },
  HKD: { country: "Hong Kong", code: "HK", symbol: "$" },
  HNL: { country: "Honduras", code: "HN", symbol: "L" },
  HRK: { country: "Croatia", code: "HR", symbol: "kn" },
  HTG: { country: "Haiti", code: "HT", symbol: "G" },
  HUF: { country: "Hungary", code: "HU", symbol: "Ft" },
  IDR: { country: "Indonesia", code: "ID", symbol: "Rp" },
  ILS: { country: "Israel", code: "IL", symbol: "₪" },
  INR: { country: "India", code: "IN", symbol: "₹" },
  IQD: { country: "Iraq", code: "IQ", symbol: "ع.د" },
  IRR: { country: "Iran", code: "IR", symbol: "﷼" },
  ISK: { country: "Iceland", code: "IS", symbol: "kr" },
  JMD: { country: "Jamaica", code: "JM", symbol: "$" },
  JOD: { country: "Jordan", code: "JO", symbol: "د.ا" },
  JPY: { country: "Japan", code: "JP", symbol: "¥" },
  KES: { country: "Kenya", code: "KE", symbol: "Sh" },
  KGS: { country: "Kyrgyzstan", code: "KG", symbol: "лв" },
  KHR: { country: "Cambodia", code: "KH", symbol: "៛" },
  KMF: { country: "Comoros", code: "KM", symbol: "Fr" },
  KPW: { country: "North Korea", code: "KP", symbol: "₩" },
  KRW: { country: "South Korea", code: "KR", symbol: "₩" },
  KWD: { country: "Kuwait", code: "KW", symbol: "د.ك" },
  KYD: { country: "Cayman Islands", code: "KY", symbol: "$" },
  KZT: { country: "Kazakhstan", code: "KZ", symbol: "₸" },
  LAK: { country: "Laos", code: "LA", symbol: "₭" },
  LBP: { country: "Lebanon", code: "LB", symbol: "ل.ل" },
  LKR: { country: "Sri Lanka", code: "LK", symbol: "₨" },
  LRD: { country: "Liberia", code: "LR", symbol: "$" },
  LSL: { country: "Lesotho", code: "LS", symbol: "M" },
  LTL: { country: "Lithuania", code: "LT", symbol: "Lt" },
  LVL: { country: "Latvia", code: "LV", symbol: "Ls" },
  LYD: { country: "Libya", code: "LY", symbol: "د.ل" },
  MAD: { country: "Morocco", code: "MA", symbol: "د.م" },
  MDL: { country: "Moldova", code: "MD", symbol: "lei" },
  MGA: { country: "Madagascar", code: "MG", symbol: "Ar" },
  MKD: { country: "North Macedonia", code: "MK", symbol: "ден" },
  MMK: { country: "Myanmar", code: "MM", symbol: "Ks" },
  MNT: { country: "Mongolia", code: "MN", symbol: "₮" },
  MOP: { country: "Macau", code: "MO", symbol: "MOP$" },
  MRO: { country: "Mauritania", code: "MR", symbol: "UM" },
  MTL: { country: "Malta", code: "MT", symbol: "Lm" },
  MUR: { country: "Mauritius", code: "MU", symbol: "₨" },
  MVR: { country: "Maldives", code: "MV", symbol: "Rf" },
  MWK: { country: "Malawi", code: "MW", symbol: "MK" },
  MXN: { country: "Mexico", code: "MX", symbol: "$" },
  MYR: { country: "Malaysia", code: "MY", symbol: "RM" },
  MZN: { country: "Mozambique", code: "MZ", symbol: "MT" },
  NAD: { country: "Namibia", code: "NA", symbol: "$" },
  XPF: { country: "Pacific Islands", code: "NC", symbol: "CFP" },
  NGN: { country: "Nigeria", code: "NG", symbol: "₦" },
  NIO: { country: "Nicaragua", code: "NI", symbol: "C$" },
  NPR: { country: "Nepal", code: "NP", symbol: "₨" },
  NZD: { country: "New Zealand", code: "NZ", symbol: "$" },
  OMR: { country: "Oman", code: "OM", symbol: "ر.ع." },
  PAB: { country: "Panama", code: "PA", symbol: "B/." },
  PEN: { country: "Peru", code: "PE", symbol: "S/" },
  PGK: { country: "Papua New Guinea", code: "PG", symbol: "K" },
  PHP: { country: "Philippines", code: "PH", symbol: "₱" },
  PKR: { country: "Pakistan", code: "PK", symbol: "₨" },
  PLN: { country: "Poland", code: "PL", symbol: "zł" },
  PYG: { country: "Paraguay", code: "PY", symbol: "₲" },
  QAR: { country: "Qatar", code: "QA", symbol: "ر.ق" },
  RON: { country: "Romania", code: "RO", symbol: "lei" },
  RSD: { country: "Serbia", code: "RS", symbol: "дин." },
  RUB: { country: "Russia", code: "RU", symbol: "₽" },
  RWF: { country: "Rwanda", code: "RW", symbol: "Fr" },
  SAR: { country: "Saudi Arabia", code: "SA", symbol: "ر.س" },
  SBD: { country: "Solomon Islands", code: "SB", symbol: "$" },
  SCR: { country: "Seychelles", code: "SC", symbol: "₨" },
  SDG: { country: "Sudan", code: "SD", symbol: "ج.س." },
  SEK: { country: "Sweden", code: "SE", symbol: "kr" },
  SGD: { country: "Singapore", code: "SG", symbol: "$" },
  SKK: { country: "Slovakia", code: "SK", symbol: "Sk" },
  SLL: { country: "Sierra Leone", code: "SL", symbol: "Le" },
  SOS: { country: "Somalia", code: "SO", symbol: "Sh" },
  SRD: { country: "Suriname", code: "SR", symbol: "$" },
  STD: { country: "São Tomé and Príncipe", code: "ST", symbol: "Db" },
  SVC: { country: "El Salvador", code: "SV", symbol: "$" },
  SYP: { country: "Syria", code: "SY", symbol: "£" },
  SZL: { country: "Eswatini", code: "SZ", symbol: "L" },
  THB: { country: "Thailand", code: "TH", symbol: "฿" },
  TJS: { country: "Tajikistan", code: "TJ", symbol: "SM" },
  TMT: { country: "Turkmenistan", code: "TM", symbol: "m" },
  TND: { country: "Tunisia", code: "TN", symbol: "د.ت" },
  TOP: { country: "Tonga", code: "TO", symbol: "$" },
  TRY: { country: "Turkey", code: "TR", symbol: "₺" },
  TTD: { country: "Trinidad and Tobago", code: "TT", symbol: "$" },
  TWD: { country: "Taiwan", code: "TW", symbol: "$" },
  TZS: { country: "Tanzania", code: "TZ", symbol: "Sh" },
  UAH: { country: "Ukraine", code: "UA", symbol: "₴" },
  UGX: { country: "Uganda", code: "UG", symbol: "Sh" },
  USD: { country: "United States", code: "US", symbol: "$" },
  UYU: { country: "Uruguay", code: "UY", symbol: "$" },
  UZS: { country: "Uzbekistan", code: "UZ", symbol: "so'm" },
  VEF: { country: "Venezuela", code: "VE", symbol: "Bs" },
  VND: { country: "Vietnam", code: "VN", symbol: "₫" },
  VUV: { country: "Vanuatu", code: "VU", symbol: "VT" },
  YER: { country: "Yemen", code: "YE", symbol: "ر.ي" },
  ZAR: { country: "South Africa", code: "ZA", symbol: "R" },
  ZMK: { country: "Zambia", code: "ZM", symbol: "ZK" },
  ZWD: { country: "Zimbabwe", code: "ZW", symbol: "$" }
};

const fromCountryInput = document.getElementById("from-country");
const toCountryInput = document.getElementById("to-country");
const getButton = document.querySelector("form button");
const exchangeRateText = document.querySelector(".exchange-rate");

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal === "0") {
    amount.value = "1";
    amountVal = 1;
  }
  
  const fromCountry = fromCountryInput.value.trim();
  const toCountry = toCountryInput.value.trim();

  if (fromCountry === "" || toCountry === "") {
    exchangeRateText.innerText = "Please enter both countries.";
    return;
  }

  const fromCurrencyCode = getCurrencyCodeFromCountryName(fromCountry);
  const toCurrencyCode = getCurrencyCodeFromCountryName(toCountry);

  if (!fromCurrencyCode || !toCurrencyCode) {
    exchangeRateText.innerText = "Invalid country name(s). Please try again.";
    return;
  }

  exchangeRateText.innerText = "Getting exchange rate...";

  // Get exchange rate using the API
  const apiKey = "e759f92560e41c99ee6213a2";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrencyCode}`;
  
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const exchangeRate = result.conversion_rates[toCurrencyCode];
      if (exchangeRate) {
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateText.innerText = `${amountVal} ${fromCurrencyCode} = ${totalExRate} ${toCurrencyCode}`;
      } else {
        exchangeRateText.innerText = "Something went wrong. Please try again.";
      }
    })
    .catch(() => {
      exchangeRateText.innerText = "Something went wrong";
    });
}

function getCurrencyCodeFromCountryName(countryName) {
  for (let currencyCode in country_list) {
    const countryData = country_list[currencyCode];
    if (countryData.country.toLowerCase() === countryName.toLowerCase()) {
      return currencyCode;
    }
  }
  return null; // Country not found
}
