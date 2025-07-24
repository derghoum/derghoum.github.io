
const TESTURL = "http://127.0.0.1:5501";
const SOURCEURL = "https://digital.ipassistance-dz.com";

// Prestataire
const inputPrestataire = document.getElementById("prestataire");
const inputCodePrestataire = document.getElementById("codeprestataire");

// Client
const inputCodeClient = document.getElementById("codeclient");
const inputNomClient = document.getElementById("nomclient");
const inputTelClient = document.getElementById("telclient");

// Véhicule
const inputMarque = document.getElementById("marque");
const inputImmatriculation = document.getElementById("immatriculation");
const inputVIN = document.getElementById("vin");

// Mission
const inputDossier = document.getElementById("dossier");
const inputDate = document.getElementById("date");
const inputType = document.getElementById("type");

// Checkbox intervention types
// const cbPB = document.getElementById("pb");
// const cbLA = document.getElementById("la");
// const cbVLAG = document.getElementById("vlag");
// const cbVLARG = document.getElementById("vlarg");
// const cbVLAD = document.getElementById("vlad");
// const cbVLARD = document.getElementById("vlard");
// const cbDEFAD = document.getElementById("defad");
// const cbDEFAG = document.getElementById("defag"); // commented out
// const cbDEFARD = document.getElementById("defard");
// const cbDEFARG = document.getElementById("defarg"); // commented out
// const cbCUSTAD = document.getElementById("custad");
// const cbCUSTAG = document.getElementById("custag");
// const cbCUSTARD = document.getElementById("custard");
// const cbCUSTARG = document.getElementById("custarg");

// Heures d'intervention
const inputHeureDebut = document.getElementById("heuredebut");
const inputHeureFin = document.getElementById("heurefin");

// Attestation
const inputMr = document.getElementById("mr");

const inputMarqueOld = document.getElementById("marqueold");
const inputSnOld = document.getElementById("snold");
const inputMarqueNew = document.getElementById("marquenew");
const inputSnNew = document.getElementById("snnew");


window.addEventListener(
  "message",
  (event) => {
    const data = event.data;
    console.log(data)
    document.title = `Fiche d'intervention BDG - ${data.clientNom} ${data.clientPrenom}`;
    //////////////////////////////
    inputPrestataire.value = "DERGHOUM MOHAMED";
    inputCodePrestataire.value = "32/02";
    //////////////////////////////
    inputCodeClient.value = data.sinistreODR;
    inputNomClient.value = `${data.clientNom} ${data.clientPrenom}`;
    inputTelClient.value = data.clientTel1;
    //////////////////////////////
    inputMarque.value = `${data.vehiculeMarque} ${data.vehiculeModele}`
    inputImmatriculation.value = data.vehiculeImmatriculation;
    //////////////////////////////
    inputDossier.value = data.dossierSuivi;
    inputDate.value = data.rdvDateTime;
    document.getElementById(data.glassType).checked = true;
    //////////////////////////////////
    // inputMr.value = `${data.clientNom} ${data.clientPrenom}`;
    inputMarqueOld.value = data.old;
    inputMarqueNew.value = data.new;

    //////////////////////////////
    console.log("Received data:", data);
    //window.print();
  },
  { once: true }
);

// window.addEventListener("load", (event) => {
//   //window.opener.postMessage("ready!", TESTURL);
//   console.log(window.opener)
//   window.opener.postMessage("ready!", SOURCEURL);
//   console.log("ready sent!");
// });
