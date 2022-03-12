// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];
// <⚠️ /DONT DELETE THIS ⚠️>

/*
✅ The text of the title should change when the mouse is on top of it.
✅ The text of the title should change when the mouse is leaves it.
✅ When the window is resized the title should change.
✅ On right click the title should also change.
✅ The colors of the title should come from a color from the colors array.
✅ DO NOT CHANGE .css, or .html files.
✅ ALL function handlers should be INSIDE of "superEventHandler"
*/
const superEventHandler = {
  onTitleMouseEnter() {
    console.log("onTitleMouseEnter");
    const title = document.querySelector("body h2");
    title.style.color = colors[0];
  },

  onTitleMouseLeave() {
    console.log("onTitleMouseLeave");
    const title = document.querySelector("body h2");
    title.style.color = colors[1];
  },

  onWindowResize() {
    console.log("onWindowResize");
    const title = document.querySelector("body h2");
    title.style.color = colors[2];
  },

  onContextMenu() {
    console.log("onContextMenu");
    const title = document.querySelector("body h2");
    title.style.color = colors[3];
  },
};


title.addEventListener("mouseenter", superEventHandler.onTitleMouseEnter);
title.addEventListener("mouseleave", superEventHandler.onTitleMouseLeave);
title.addEventListener("resize", superEventHandler.onWindowResize);
title.addEventListener("contextmenu", superEventHandler.onContextMenu);
