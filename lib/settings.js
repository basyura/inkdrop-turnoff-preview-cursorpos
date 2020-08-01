"use babel";

class Settings {
  /*
   *
   */
  constructor() {
    // position
    inkdrop.config.observe("turnoff-preview-cursorpos.position", (newValue) => {
      if (newValue == null || newValue == "") {
        newValue = "middle";
      }
      this.position = newValue;
    });
    // interval
    inkdrop.config.observe("turnoff-preview-cursorpos.interval", (newValue) => {
      if (newValue == null || newValue == "") {
        newValue = 50;
      }
      this.interval = newValue;
    });
    // adjustline
    inkdrop.config.observe(
      "turnoff-preview-cursorpos.adjustline",
      (newValue) => {
        if (newValue == null || newValue == "") {
          newValue = 5;
        }
        this.adjustline = newValue;
      }
    );
  }
}

export default new Settings();
