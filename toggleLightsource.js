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
      if (token.data.brightLight == 0) {
        token.update({
          dimLight: 40, 
          brightLight: 20});
      }
      else {
        ui.notifications.warn(`Die Lampe ist bereits an.`);
      }
    }
    else {
      token.update({
        dimLight: 5,
        brightLight: 0});
    }
  }
}).render(true);