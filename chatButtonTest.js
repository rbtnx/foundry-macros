let featName = "Deflect Missiles";
let actorData = actor || canvas.tokens.controlled[0] || game.user.character;
let targetActor = game.user.targets.values().next().value.actor;
let featData = actorData ? actorData.items.find(i => i.name===featName) : null;
let featUpdate = duplicate(featData);
let dexMod = actorData.data.data.abilities.dex.mod;
let monkLevel = actorData.data.data.details.level;


let chatMsg = `
<div class="dnd5e chat-card item-card" data-actor-id="${actorData.id}" data-item-id="${featData.id}" data-spell-level="${featData.data.data.level}">
    <header class="card-header flexrow">
        <img src="${featUpdate.img}" title="${featName}" width="36" height="36"/>
        <h3 class="item-name">
        ${featName}</h3>
    </header>
    <div class="card-content">
        <p><strong>Flavor Text</strong></p>
        <p><em>${actorData.name} insults ${targetActor.data.name}.</em></p>                                    
        <details closed="">
            <summary>Toggle description</summary>
            ${featUpdate.data.description.value}
        </details>
    </div>
    <div class="card-buttons">
        <button data-action="save" data-ability="wis" disabled">Save DC ${eval(8 + actorData.data.data.attributes.prof)} Wisdom</button>
    </div>
</div>
`;

new Roll("1d4 + @dex + @monkLvl", {dex: dexMod, monkLvl: monkLevel}).roll().toMessage({
    speaker: ChatMessage.getSpeaker(),
    flavor: chatMsg});   