let tabArticle = [{
    id: 1,
    libelle: "Asus Rog",
    prix: 310000,
    stock: 8,
    photo: "img/image1.jpg",
},
{
    id: 2,
    libelle: "Asus Rog Flow",
    prix: 280000,
    stock: 8,
    photo: "img/image2.jpg",
},
{
    id: 3,
    libelle: "Asus Rog",
    prix: 260000,
    stock: 25,
    photo: "img/image3.jpg",
},
{
    id: 4,
    libelle: "Gaming Pack",
    prix: 100000,
    stock: 15,
    photo: "img/image4.jpg",
},
{
    id: 5,
    libelle: "Acer Swift4",
    prix: 200000,
    stock: 5,
    photo: "img/image5.jpg",
},
{
    id: 6,
    libelle: "Souris Bleu-Noir",
    prix: 10000,
    stock: 5,
    photo: "img/image6.jpg",
},
{
    id: 7,
    libelle: "Lenovo Yoga N45",
    prix: 250000,
    stock: 15,
    photo: "img/image7.jpg",
},
{
    id: 8,
    libelle: "Imprimente Laser",
    prix: 200000,
    stock: 25,
    photo: "img/image8.jpg",
},
{
    id: 9,
    libelle: "Souris Gris-Noir",
    prix: 10000,
    stock: 20,
    photo: "img/image9.jpg",
},
{
    id: 10,
    libelle: "Clavier+Souris Noir",
    prix: 15000,
    stock: 25,
    photo: "img/image10.jpg",
},
{
    id: 11,
    libelle: "Asus Rog",
    prix: 250000,
    stock: 15,
    photo: "img/image11.jpg",
},
{
    id: 12,
    libelle: "Asus Rog",
    prix: 270000,
    stock: 15,
    photo: "img/image12.jpg",
},
];

//Charger les articles
const contenue = document.getElementById("Contenue")

function loadArticles(position) {
    contenue.innerHTML = '';
    tabArticle.forEach((element, i) => {
        let disabled = element.stock <= 0 ? "disabled" : "";
        contenue.innerHTML += `
    <div class="col-md-4 mb-3 col-lg-4 col-lg-3 col-lg-2">
       <div class="card">
            <img src="${element.photo}" alt="${element.libelle}" width="100%">
           <span class="font-weight-bold text-center h4">${element.libelle}</span>
           <span class="font-weight-bold h5" style="margin-left: 5%;">${element.prix} FRCFA</span>
           <div class="card-footer bg-white">
               <button ${disabled} class="btn btn-secondary float-end" onclick="ajoutArticles('${i}')">
                   ACHETER
               </button>
           </div>
       </div>
    </div>`;
    })
}

const contenueModal = document.getElementById("contenuePanier")
let articleAjouter;
let Somme;
let TableauAjout = [];

function ajoutArticles(position) {
    //Verifier le Stock
    if (tabArticle[position].stock > 0) {
        let articleBD = tabArticle[position];
        let article;
        let Resultat = TableauAjout.findIndex(a => a.id == articleBD.id);
        if (Resultat != -1) {
            TableauAjout[Resultat].quantite += 1;
        } else {
            article = {
                id: articleBD.id,
                libelle: articleBD.libelle,
                prix: articleBD.prix,
                quantite: 1,
                photo: articleBD.photo,
            }
            TableauAjout.push(article);
        }
        tabArticle[position].stock -= 1;
        loadArticles();
    }
}

function VoirPanier() {
    contenueModal.innerHTML = "";
    TableauAjout.forEach((element, i) => {
        articleAjouter = `
        <tr>
          <td>
            <img src="${element.photo}" alt="${element.libelle}">
          </td>
          <td>
            <center>
                ${element.libelle}
            </center>
          </td>
          <td>
            <center>
                ${element.quantite}
            </center>
          </td>
          <td>
            <center>
                ${element.prix}
            </center>
          </td>
          <td>
            <center>
                <button class="btn btn-secondary btn-sm" onclick="Supprimer('${i}')"><i class="fa-solid fa-trash"></i></button>
            </center>
          </td>
        </tr>`;
        contenueModal.innerHTML += articleAjouter;
    })
}

//Fonction Supprimer
function Supprimer(Position) {
    TableauAjout.splice(Position, 1);
    VoirPanier();
}

//Formulaire
var Prenom = document.getElementById("Prenom");
var Nom = document.getElementById("Nom");
var Telephone = document.getElementById("Telephone");
var Adresse = document.getElementById("Adresse");
let tabPersonnes = [];

function enregistrement() {
    let NomValue = Nom.value.trim();
    let PrenomValue = Prenom.value.trim();
    let TelephoneValue = Telephone.value.trim();
    let AdresseValue = Adresse.value.trim();
    if (
        NomValue != "" &&
        PrenomValue != "" &&
        TelephoneValue != "" &&
        AdresseValue != ""
    ) {
        let personne = {
            Prenom: PrenomValue,
            Nom: NomValue,
            Adresse: AdresseValue,
            Telephone: TelephoneValue,
        };
        tabPersonnes.push(personne);
        console.log(tabPersonnes);
    } else {
        alert("Tous les champs sont obligatoires !");
    }
    Prenom.value = "";
    Nom.value = "";
    Telephone.value = "";
    Adresse.value = "";
    chargementsInfo();
}

//Facture
const contenueFacture = document.getElementById("contenueFacture")
const FactureTotal = document.getElementById("FactureTotal")
let FactureAjout;
let FactureSomme;

function contFacture() {
    contenueFacture.innerHTML = "";
    FactureSomme = 0;
    TableauAjout.forEach((element) => {
        FactureSomme = FactureSomme + (element.prix * element.quantite);
        FactureAjout = `
        <tr>
          <td>
          <center>
            ${element.libelle}
          </center>
          </td>
          <td>
          <center>
            ${element.prix}
          </center>
          </td>
        </tr>`;
        contenueFacture.innerHTML += FactureAjout;
    })
    FactureTotal.innerHTML = "<center>" + FactureSomme + "</center>";
    console.log(FactureSomme)
}

//Chargement Information
const InformationCharge = document.getElementById("InformationContent")

function chargementsInfo() {
    InformationCharge.innerHTML = "";
    tabPersonnes.forEach((element) => {
        FactureAjout = `
        <tr>
          <td>
            ${element.Nom}
          </td>
          <td>
            ${element.Prenom}
          </td>
          <td>
            ${element.Adresse}
          </td>
          <td>
            ${element.Telephone}
          </td>
        </tr>`;
        InformationCharge.innerHTML += FactureAjout;
    })
    tabPersonnes = [];
    contFacture();
}