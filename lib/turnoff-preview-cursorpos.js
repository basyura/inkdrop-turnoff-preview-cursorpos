"use babel";

module.exports = {
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

    const isPreview = editor.classList.contains("editor-viewmode-preview");
    console.log("turnoff > isPreview : " + isPreview);

    if (isPreview) {
      return;
    }

    window.setTimeout(() => {
      const { cm } = inkdrop.getActiveEditor();
      const top = cm.doc.scrollTop;
      const height = cm.getScrollInfo().clientHeight;
      const line1 = cm.coordsChar({ left: 0, top: top }, "local").line;
      const line2 = cm.coordsChar({ left: 0, top: top + height }, "local").line;

      console.log("top:" + top + ", height:" + height);
      console.log("line1:" + line1 + ", line2:" + line2);
      console.log("line:" + Math.floor(line1 + (line2 - line1) / 2));
      cm.setCursor(Math.floor(line1 + (line2 - line1) / 2), 0);
    }, 50);
  },
};
