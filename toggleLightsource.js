// Lichtquelle an/ausschalten
let lampeAn = false;
new Dialog({
  title: `Fackel`,
  content: 'Du hältst die Laterne hoch.<br>',
  buttons: {
    ein: {
      icon: "<i class='fas fa-check'></i>",
      label: `Licht entfachen`,
      callback: () => lampeAn = true
    },
    aus: {
      icon: "<i class='fas fa-times'></i>",
      label: `Licht löschen`
    },
  },
  default: "aus",
  close: html => {
    if (lampeAn) {
      token.update({
        dimLight: 40, 
        brightLight: 20});
    }
    else {
      token.update({
        dimLight: 5,
        brightLight: 0});
    }
  }
}).render(true);