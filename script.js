//vad ska jag göra
//skapa en eventlistner för en klickhändelse

const degreeSign = ' \u00B0' + 'C'

/*************DOM Sun & Planets***********************/
const sun = document.querySelector("#Solis")
const mercurialis = document.querySelector("#Mercurialis")
const venus = document.querySelector("#Venus")
const tellus = document.querySelector("#Tellus")
const mars = document.querySelector("#Mars")
const lovis = document.querySelector("#Lovis")
const saturnus = document.querySelector("#Saturnus")
const uranus = document.querySelector("#Uranus")
const neptunus = document.querySelector("#Neptunus")

/**************DOM textdisplay *******************/
const articleHeading = document.querySelector(".infoPopUp h1")
const articleHeading2 = document.querySelector(".infoPopUp h2")
const articleContext = document.querySelector(".infoPopUp p")
const circumference = document.querySelector(".circumference")
const distanceFromSun = document.querySelector(".distanceFromSun")
const maxTemp = document.querySelector(".maxTemp")
const minTemp = document.querySelector(".minTemp")
const moons = document.querySelector(".moons")

/************DOM Wrappers & exitButton************/
const PopUpWrapper = document.querySelector(".infoWrapper")
const planetcontainer = document.querySelector(".container")
const exitButton = document.querySelector("#exitButton")



/*********Eventlistners for all planets**********Vid klick skickas en sträng med planetens latinska namn******/
sun.addEventListener("click",() => getData("Solis"))
mercurialis.addEventListener("click",() => getData("Mercurialis"))
venus.addEventListener("click",() => getData("Venus"))
tellus.addEventListener("click",() => getData("Tellus"))
mars.addEventListener("click",() => getData("Mars"))
lovis.addEventListener("click", () => getData("Lovis"))
saturnus.addEventListener("click", () => getData("Saturnus"))
uranus.addEventListener("click", () => getData("Uranus"))
neptunus.addEventListener("click", () => getData("Neptunus"))

/*********Eventlistner for exitbutton. Reset display and color*****/
exitButton.addEventListener("click", () => {PopUpWrapper.style.display = "none";
planetcontainer.style.display = "grid"; sun.style.backgroundColor = "#FFD029"; 
sun.style.boxShadow = "0px 0px 250px 0px #e6be2fb9";}) 

// Funktionen hämtar data från ett api. Den tar in em sträng som parameter. Planeterns tag id är samma som deras latiska namn
async function getData(planetId){
    //fetch() returerar ett promise direkt som ett response. await behövs för att invänta hela json objektet pga att det är en asyncfunktion... en async kan ta lång tid på sig.
    const response = await fetch("https://majazocom.github.io/Data/solaris.json")
    // .json() gör om json-filen som är sparad i response till ett js-objekt
    const data = await response.json() 
    //.find letar efter en match mot villkoret i arrowfunktionen och returnerar endast det objektet från arrayen.
    const planetData = data.find(planet => planet.latinName === planetId);
    //Skickar vidare ett planetobjekt (den planet som blev klickad på) till displayArticle()
    displayArticle(planetData) 
    //Vid klick så jag vill jag att rutan för info ska dyka upp och planerterna + headings ska försvinna.
    //Kallar därför på funktionen innanför getData för att den är triggad av ett klick.
    displayPopUp()
    makeSunToMoon()
}
function makeSunToMoon(){
    sun.style.backgroundColor = "#428ED4";
    // Två boxshadows med två olika nyanser och storlek läggs till kring den numera "blå solen". Den gula boxshadow försvinner därmed.
    sun.style.boxShadow = "rgb(66, 142, 212, 0.10) 0px 0px 0px 100px,  rgb(66, 142, 212, 0.06) 0px 0px 0px 50px";
}
//Funktion som visar popup med article och tar bort planeterna.
function displayPopUp(){
    PopUpWrapper.style.display = "flex"; // flex-box för att det finns stylig i css kopplat till flex
    planetcontainer.style.display = "none";
}
/* Ett planetobjekt från den planet som blivit klickad på skickas in i funktionen.
Namngivit parametern till "planet" för att datan som skickas in har sorterats i getData() så att den nu endast består av ett objekt istället för den ursprungliga arrayen.
Info läggs ut i infoPopUppen mha DOM-varibler*/
function displayArticle(planet){
    // .innerText skapar en text inom elementet
    articleHeading.innerText = planet.name; // .name ger tillgång till namnpropertyn
    articleHeading2.innerText = planet.latinName;
    articleContext.innerText = planet.desc;
    circumference.innerText = planet.circumference + " KM";
    distanceFromSun.innerText = planet.distance + " KM";
    maxTemp.innerText = planet.temp.day + degreeSign;
    minTemp.innerText = planet.temp.night + degreeSign;
    // .join("") metoden läggs på för att göra om arrayen av månar till en sträng.
    moons.innerText = planet.moons.join(", ");
}

      
    



