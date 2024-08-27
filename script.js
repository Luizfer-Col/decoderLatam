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
  const texResult = $("result-text");

  const encrypter = () => {
    let string = textArea.value;
    for (const [vowel, textEncript] of Object.entries(conversion)) {
      string = string.replaceAll(vowel, textEncript);
    }
    texResult.textContent = string;
    textArea.value = "";
    return string;
  };

  const decrypter = () => {
    let string = textArea.value;

    for (const [vowel, textEncript] of Object.entries(conversion)) {
      string = string.replaceAll(textEncript, vowel);
    }
    texResult.textContent = string;
    textArea.value = "";
    return string;
  };

  encryptButton.addEventListener("click", () => encrypter());
  decryptButton.addEventListener("click", () => decrypter());
  
});
