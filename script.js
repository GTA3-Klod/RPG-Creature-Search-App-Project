const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const crWeight = document.getElementById("weight");
const crHeight = document.getElementById("height");
const crTypes = document.getElementById("types");
const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const searchButton = document.getElementById("search-button");

const fetchInfo = async () => {
    try {
        const nameOrId = searchInput.value.toLowerCase();
        if (!nameOrId) {
            alert("Please enter creature's name or ID");
        }
        const creatureList = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`);
        const data = await creatureList.json();
        console.log(data);
        creatureInfo(data);
        
    } catch (err) {
        alert("Creature not found");
        console.log(`Creature not found: ${err}`);
        resetAll();
    }
}


const creatureInfo = (data) => {
    const { name, id, weight, height, types, stats, special } = data;

    creatureName.textContent = `${name.toUpperCase()}`;
    creatureId.textContent = `#${id}`;
    crWeight.textContent = `Weight: ${weight}`;
    crHeight.textContent = `Height: ${height}`;
    hp.textContent = stats[0].base_stat;
    attack.textContent = stats[1].base_stat;
    defense.textContent = stats[2].base_stat;
    spAttack.textContent = stats[3].base_stat;
    spDefense.textContent = stats[4].base_stat;
    speed.textContent = stats[5].base_stat;
    if (types.length > 1) {
        crTypes.innerHTML = `
        <span>Types: ${types[0].name.toUpperCase()},</span>
        <span>${types[1].name.toUpperCase()}</span>
        `;
    } else {
        crTypes.innerHTML = `
        <span>Type: ${types[0].name.toUpperCase()}</span>
        `;
    }
     
    
    specialName.textContent = special.name;
    specialDescription.textContent = special.description;
}

const resetAll = () => {
    creatureName.textContent = "";
    creatureId.textContent = "";
    crWeight.textContent = "";
    crHeight.textContent = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    spAttack.textContent = "";
    spDefense.textContent = "";
    speed.textContent = "";
    crTypes.innerHTML = "";
    specialName.textContent = "";
    specialDescription.textContent = "";
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetchInfo();
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchButton.click();
    }
})