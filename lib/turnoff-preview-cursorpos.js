"use babel";

import Settings from "./settings";

module.exports = {
  /*
   * config
   */
  config: {
    position: {
      title: "position of cursor",
      type: "string",
      default: "top",
      enum: ["top", "middle", "bottom"],
    },
    interval: {
      title: "interval to invoke setCursor",
      type: "number",
      default: 50,
    },
    adjustline: {
      title: "line number to adjust position",
      type: "number",
      default: 5,
    },
  },
  /*
   *
   */
  activate() {
    const editor = inkdrop.getActiveEditor();
    if (editor != null) {
      this.attatchEvents(editor);
    } else {
      inkdrop.onEditorLoad((e) => this.attatchEvents(e));
    }
  },
  /*
   *
   */
  deactivate() {
    this.observer.disconnect();
  },
  /*
   *
   */
  attatchEvents() {
    const editor = document.querySelector(".editor");
    const preview = editor.querySelector(".mde-preview");
    this.observer = new MutationObserver((_) => {
      this.handlePreviewUpdate();
    });
    this.observer.observe(preview, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  },
  /*
   *
   */
  handlePreviewUpdate() {
    const editor = document.querySelector(".editor");
    if (editor == null) {
      return;
    }

    const oldValue = this.isPreview;
    this.isPreview = editor.classList.contains("editor-viewmode-preview");
    console.log("turnoff > isPreview : " + oldValue + " -> " + this.isPreview);

    if (this.isPreview && !oldValue) {
      const { cm } = inkdrop.getActiveEditor();
      this.prevTop = cm.doc.scrollTop;
      this.prevCursor = cm.getCursor();
      return;
    }

    if (this.isPreview || !oldValue) {
      return;
    }

    window.setTimeout(() => {
      const { cm } = inkdrop.getActiveEditor();
      const top = cm.doc.scrollTop;
      if (Math.abs(this.prevTop - top) < 10) {
        cm.setCursor(this.prevCursor.line, 0);
        return;
      }
      const height = cm.getScrollInfo().clientHeight;
      const line1 = cm.coordsChar({ left: 0, top: top }, "local").line;
      const line2 = cm.coordsChar({ left: 0, top: top + height }, "local").line;

      console.log(
        `turnoff > position: ${Settings.position}, interval: ${Settings.interval}`
      );

      let pos = Math.floor(line1 + (line2 - line1) / 2);
      if (Settings.position == "top") {
        pos = line1 + Settings.adjustline;
      } else if (Settings.position == "bottom") {
        pos = line2 - Settings.adjustline;
      }
      cm.setCursor(pos, 0);
    }, Settings.interval);
  },
};
