// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!*/
function thatsNoMoon(){
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
               // Access the JSON in the response
               response.json().then( function(json) {
                  let itsASpaceStation = json[Math.floor(Math.random() * json.length)];
                  document.getElementById("missionTarget").innerHTML =`<h2>Mission Destination</h2>
                     <ol>
                        <li>Name: ${itsASpaceStation.name}</li>
                        <li>Diameter: ${itsASpaceStation.diameter}</li>
                        <li>Star: ${itsASpaceStation.star}</li>
                        <li>Distance from Earth: ${itsASpaceStation.distance}</li>
                        <li>Number of Moons: ${itsASpaceStation.moons.toString()}</li>
                     </ol>
                     <img src="${itsASpaceStation.image}">`;
                                 });
                              });
   
}

window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotName = document.getElementById("pilotName").value;
      let copilotName = document.getElementById("copilotName").value;
      let fuelLevel = document.getElementById("fuelLevel").value;
      let cargoMass = document.getElementById("cargoMass").value;
      let faultyItems = document.querySelector("#faultyItems");
      let pilotStatus = document.querySelector("#pilotStatus");
      let copilotStatus = document.querySelector("#copilotStatus");
      let fuelStatus = document.querySelector("#fuelStatus");
      let cargoStatus = document.querySelector("#cargoStatus");
      let launchStatus = document.querySelector("#launchStatus");

      if (pilotName === "" || copilotName === "" || fuelLevel === "" || cargoMass === "") {
         alert("All fields are required!"); 
         event.preventDefault();
      }      
      else{
         let fuelLevel = Number.parseInt(document.getElementById("fuelLevel").value);
         let cargoMass = Number.parseInt(document.getElementById("cargoMass").value);
         if(Number.isNaN(fuelLevel) || Number.isNaN(cargoMass) || !Number.isNaN(Number.parseInt(pilotName)) || !Number.isNaN(Number.parseInt(copilotName))){
            alert("Make sure to enter valid information for each field!")
            this.event.preventDefault();
         }
         else{
            if (fuelLevel < 10000 || cargoMass > 10000){
               faultyItems.style.visibility = "visible";
               pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch`;
               copilotStatus.innerHTML = `Co-Pilot ${copilotName} is ready for launch`;
               launchStatus.innerHTML = "Shuttle not ready for launch";
               launchStatus.style.color = "red";
               fuelStatus.innerHTML = fuelLevel < 10000 ? "There is not enough fuel for the journey." : "Fuel level high enough for launch.";
               cargoStatus.innerHTML = cargoMass > 10000 ? "Shuttle not ready for launch!" : "Cargo mass low enough for launch";
               event.preventDefault();
            }
            else{
               launchStatus.innerHTML = "Shuttle is ready for launch";
               launchStatus.style.color = "green";
               thatsNoMoon();
               event.preventDefault();
            }
         }
      }
   });
});
