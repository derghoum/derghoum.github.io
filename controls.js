const fillClipboardButton = document.getElementById("fillClipboard");
const fillFromXmlButton = document.getElementById("fillFromXml");
const printPageButton = document.getElementById("printPage");
const saveAsImageButton = document.getElementById("saveAsImage");
/////////////////////////////////////
function parseJiraXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  const fields = {};
  const customFields = xmlDoc.querySelectorAll("customfield");

  customFields.forEach((field) => {
    const nameTag = field.querySelector("customfieldname");
    const valueTag = field.querySelector("customfieldvalue");

    const name = nameTag?.textContent?.trim();
    const value = valueTag?.textContent?.trim();

    fields[name] = value;
  });

  return fields;
}

fillFromXmlButton.addEventListener("click", () => {
  // Create a hidden file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".xml,text/xml";
  fileInput.style.display = "none";

  // When a file is selected, handle it
  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    const file = files[0];
    if (
      file &&
      (file.type === "text/xml" || file.name.toLowerCase().endsWith(".xml"))
    ) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const lastXmlFileContent = e.target.result; // Store content for later use
        const parsedData = parseJiraXML(lastXmlFileContent);
        console.log("Parsed XML Data:", parsedData);
      };
      console.log(reader.readAsText(file));
    } else {
      alert("Please select a valid XML file.");
    }
    // Clean up
    fileInput.remove();
  });

  // Add to DOM and trigger click
  document.body.appendChild(fileInput);
  fileInput.click();
});

fillClipboardButton.addEventListener("click", async () => {
  console.log("Attempting to fill from clipboard...");
  try {
    const clipboardText = await navigator.clipboard.readText();
    const data = JSON.parse(clipboardText); // Ensure it's valid JSON

    console.log("Parsed from clipboard:", data);

    document.title = `Fiche d'intervention BDG - ${data.clientNom} ${data.clientPrenom}`;

    inputPrestataire.value = "DERGHOUM MOHAMED";
    inputCodePrestataire.value = "32/02";

    inputCodeClient.value = data.policeNumero;
    inputNomClient.value = `${data.clientNom} ${data.clientPrenom}`;
    inputTelClient.value = data.clientTel1;

    inputMarque.value = `${data.vehiculeMarque} ${data.vehiculeModele}`;
    inputImmatriculation.value = data.vehiculeImmatriculation;

    inputDossier.value = data.dossierSuivi;
    inputDate.value = data.rdvDateTime;

    document.getElementById(data.glassType).checked = true;

    inputMarqueOld.value = data.old;
    inputMarqueNew.value = data.new;

    await navigator.clipboard.writeText("");
  } catch (err) {
    alert("Clipboard read or JSON parse failed");
  }
});

printPageButton.addEventListener("click", () => {
  window.print();
});

const captureElement = async (selector) => {
  const element = document.querySelector(selector);
  const rect = element.getBoundingClientRect();

  const canvas = await html2canvas(document.body, {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
  });

  const dataUrl = canvas.toDataURL("image/png");
  return dataUrl;
};

captureElement("#myElement").then((img) => {
  console.log("Captured image URL:", img);
});

saveAsImageButton.addEventListener("click", () => {
  const node = document.querySelector(".page");
  node.classList.add("pagetoimage");
  node.classList.remove("page");
  htmlToImage
    .toPng(node, { cacheBust: true })
    .then((dataUrl) => {
      node.classList.add("page");
      node.classList.remove("pagetoimage");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Fiche d'intervention - ${inputNomClient.value}.png`;
      link.click();
    })
    .catch((err) => {
      console.error("Failed to capture element:", err);
    });
});
