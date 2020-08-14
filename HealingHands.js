// Monk Healing Hands
if (game.user.targets.size !== 1)
ui.notifications.warn(`Du hast kein Ziel ausgewählt.`);

let confirmed = false;
let actorData = actor || canvas.tokens.controlled[0] || game.user.character;
let targetActor = game.user.targets.values().next().value.actor;
let hhPool = actorData.data.data.resources.secondary.value;
let maxHeal = Math.clamped(hhPool,0,
        targetActor.data.data.attributes.hp.max - targetActor.data.data.attributes.hp.value);

new Dialog({
    title: `Healing Hands`,
    content:`
        <form>
            <div class="form-group">
                <label for="num">HP wiederherstellen: (Max = ${maxHeal})</label>
                <input id="num" name="num" type="number" min="0" max="${maxHeal}" value="0"></input>
            </div>
        </form>`,
    buttons: {
        heal: { label: "Heilen!", callback: () => confirmed = true },
        cancel: { label: "Abbrechen", callback: () => confirmed = false}
      },
    default: "heal",
    close: html => {
        if (confirmed) {
            let number = Math.floor(Number(html.find('#num')[0].value));
            if (targetActor.permission !== CONST.ENTITY_PERMISSIONS.OWNER) {
                new Roll(`${number}`).roll().toMessage({
                    speaker: ChatMessage.getSpeaker(),
                    flavor: `${actorData.name} heilt ${targetActor.data.name} für ${number} HP.<br>
                    <p><em>${targetActor.data.name}: Bitte selbst HP updaten.</em></p>` });
            }
            else {
                game.actors.find(a => a._id===targetActor._id).update( {
                    "data.attributes.hp.value" : targetActor.data.data.attributes.hp.value + number });

                actorData.data.data.resources.secondary.value = hhPool - number;
                ChatMessage.create({
                    speaker: ChatMessage.getSpeaker(),
                    content: `${actorData.name} heilt ${targetActor.data.name} für ${number} HP.<br>` });
                }
        }
    }
}).render(true);