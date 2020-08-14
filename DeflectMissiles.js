// Monk Deflect Missiles
let featName = "Deflect Missiles";
let actorData = actor || canvas.tokens.controlled[0] || game.user.character;
let featData = actorData ? actorData.items.find(i => i.name===featName) : null;
let featUpdate = duplicate(featData);
let dexMod = actorData.data.data.abilities.dex.mod;
let monkLevel = actorData.data.data.details.level;
let martialArtsDie = "1d4";

let chatMsg = `
<div class="dnd5e chat-card item-card" data-actor-id="${actorData.id}" data-item-id="${featData.id}">
    <header class="card-header flexrow">
        <img src="${featUpdate.img}" title="${featName}" width="36" height="36"/>
        <h3 class="item-name">
        ${featName}</h3>
    </header>
    <div class="card-content">
        <p><em>${actorData.name} greift in die Luft und wehrt das Geschoss ab.</em></p>                                    
        <details closed="">
            <summary>Feature Beschreibung</summary>
            ${featUpdate.data.description.value}
        </details>
    </div>
</div>
`;

new Roll("1d10 + @dex + @monkLvl", {dex: dexMod, monkLvl: monkLevel}).roll().toMessage({
    speaker: ChatMessage.getSpeaker(),
    flavor: chatMsg
});

let dmgMsg = `
<div class="dnd5e chat-card item-card" data-actor-id="${actorData.id}" data-item-id="${featData.id}">
    <header class="card-header flexrow">
        <img src="${featUpdate.img}" title="${featName}" width="36" height="36"/>
        <h3 class="item-name">
        ${featName}</h3>
    </header>
    <div class="card-content">
        <p><em>${actorData.name} hat das Geschoss gefangen und wirft es zurück!</em></p>
    </div>
    <div class="card-buttons">
        <button data-action="formula" disabled">Schaden</button>
    </div>
</div>
`;

new Roll("1d4").roll().toMessage({
    speaker: ChatMessage.getSpeaker(),
    flavor: dmgMsg
});