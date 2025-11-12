import React from "react";
import "./ActionButtons.css";

function ActionButtons() {
  // 1. Throw an uncaught JS error
  const throwError = () => {
    throw new Error("This is a demo uncaught JavaScript error!");
  };

  // 2. Print something in the console
  const printConsole = () => {
    console.error("This is a demo console error!");
  };

  // 3. Reload the page super slowly (simulate slow LCP)
  const reloadSlowly = () => {
    // Show a blocking overlay for 4 seconds, then reload
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(255,255,255,0.95)";
    overlay.style.zIndex = 9999;
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.fontSize = "2rem";
    overlay.style.color = "#222";
    overlay.innerText = "Simulating a slow page load...";
    document.body.appendChild(overlay);
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  // 4. Trigger a page load error (try to load a missing image)
  const triggerPageLoadError = () => {
    const img = document.createElement("img");
    img.src = "/this-image-does-not-exist.png";
    img.alt = "Broken";
    img.style.display = "none";
    document.body.appendChild(img);
  };

  // 5. Trigger a layout shift (CLS) with reload, wait, shift, remove
  const triggerLayoutShift = () => {
    // Store a flag in sessionStorage to trigger the shift after reload
    sessionStorage.setItem("triggerLayoutShift", "true");
    window.location.reload();
  };

  // On page load, check for the flag and trigger the shift after 2s
  React.useEffect(() => {
    if (sessionStorage.getItem("triggerLayoutShift") === "true") {
      sessionStorage.removeItem("triggerLayoutShift");
      setTimeout(() => {
        const shiftDiv = document.createElement("div");
        shiftDiv.id = "layout-shift-demo";
        shiftDiv.style.width = "100%";
        shiftDiv.style.height = "120px";
        shiftDiv.style.background =
          "linear-gradient(90deg, #FFD93B 60%, #FFC700 100%)";
        shiftDiv.style.display = "flex";
        shiftDiv.style.alignItems = "center";
        shiftDiv.style.justifyContent = "center";
        shiftDiv.style.fontSize = "1.5rem";
        shiftDiv.style.fontWeight = "600";
        shiftDiv.style.color = "#222";
        shiftDiv.innerText = "👀 Layout Shift Happening!";
        document.body.prepend(shiftDiv);
        setTimeout(() => {
          shiftDiv.remove();
        }, 5000);
      }, 2000);
    }
  }, []);

  return (
    <div className="teaching-buttons-container">
      <button className="teaching-btn" onClick={throwError}>
        Throw JS Error
      </button>
      <button className="teaching-btn" onClick={printConsole}>
        Print to Console
      </button>
      <button className="teaching-btn" onClick={reloadSlowly}>
        Reload Slowly (LCP)
      </button>
      <button className="teaching-btn" onClick={triggerPageLoadError}>
        Trigger Page Load Error
      </button>
      <button className="teaching-btn" onClick={triggerLayoutShift}>
        Trigger Layout Shift (CLS)
      </button>
    </div>
  );
}

export default ActionButtons;
