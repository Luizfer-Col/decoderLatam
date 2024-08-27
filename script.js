const conversion = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};
document.addEventListener("DOMContentLoaded", function () {
  const $ = (id) => document.getElementById(id);

  const encryptButton = $("encrypt-button");
  const decryptButton = $("decrypt-button");
  const textArea = $("input-text");
  const resultText = $("result-text");
  const resultContainer = $("result-container");
  const noResultContainer = $("no-result-container");
  const copyButton = $("copy-button");
  const cleanButton = $("clean-button");
  const notificationBanner = $("notification-banner");
  const warningContainer = $("warning-container");

  const updateResultDisplay = (result) => {
    if (result.trim()) {
      resultText.textContent = result;
      resultContainer.style.display = "flex";
      noResultContainer.style.display = "none";
    } else {
      resultText.textContent = "";
      resultContainer.style.display = "none";
      noResultContainer.style.display = "flex";
    }
  };

  const encrypter = () => {
    let string = textArea.value;
    for (const [vowel, textEncript] of Object.entries(conversion)) {
      string = string.replaceAll(vowel, textEncript);
    }
    updateResultDisplay(string);
    textArea.value = "";
    return string;
  };

  const decrypter = () => {
    let string = textArea.value;
    for (const [vowel, textEncript] of Object.entries(conversion)) {
      string = string.replaceAll(textEncript, vowel);
    }
    updateResultDisplay(string);
    textArea.value = "";
    return string;
  };

  const copyToClipboard = () => {
    const text = resultText.textContent;
    console.log("text", text);

    if (text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showNotification("Texto copiado al portapapeles");
        })
        .catch((err) => {
          console.error("Error al copiar al portapapeles: ", err);
        });
    }
  };

  const clearAll = () => {
    textArea.value = "";
    resultText.textContent = "";
    resultContainer.style.display = "none";
    noResultContainer.style.display = "flex";
    encryptButton.disabled = true;
    decryptButton.disabled = true;
  };

  const showNotification = (message) => {
    notificationBanner.textContent = message;
    notificationBanner.style.display = "block";
    setTimeout(() => {
      notificationBanner.style.opacity = "0";
      setTimeout(() => {
        notificationBanner.style.display = "none";
        notificationBanner.style.opacity = "1";
      }, 500);
    }, 3000);
  };

  const handleInputChange = () => {
    const text = textArea.value;
    const isValid = /^[a-z\s]*$/.test(text);

    encryptButton.disabled = !isValid;
    decryptButton.disabled = !isValid;

    if (isValid) {
      warningContainer.style.borderColor = "#007e1b80";
      warningContainer.style.backgroundColor = "#99ffaf31";
    } else {
      warningContainer.style.borderColor = "#7e000080";
      warningContainer.style.backgroundColor = "#ff999931";
    }
  };

  encryptButton.addEventListener("click", () => encrypter());
  decryptButton.addEventListener("click", () => decrypter());
  copyButton.addEventListener("click", () => copyToClipboard());
  cleanButton.addEventListener("click", () => clearAll());

  textArea.addEventListener("input", handleInputChange);
});
