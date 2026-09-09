// Textarea Statistics (line & character counting)
const editor = document.getElementById("clipboard-editor");
const charCount = document.getElementById("char-count");
const lineCount = document.getElementById("line-count");
const copyBtn = document.getElementById("quick-copy-btn");
const copyToast = document.getElementById("copy-toast");
const lockToggleBtn = document.getElementById("lock-toggle-btn");
const saveBtn = document.getElementById("save-btn");
const saveText = document.getElementById("save-text");
const routeSpan = document.getElementById("routeSpan");

let isLocked = false;

const routeis = sessionStorage.getItem("startString") || "defaultSlug";
routeSpan.textContent = `/${routeis}`;



console.log("Hi");

editor.addEventListener("input", () => {
  const val = editor.value;
  charCount.textContent = val.length;
  lineCount.textContent = val ? val.split("\n").length : 1;
});

// Copy to clipboard handler
copyBtn.addEventListener("click", async () => {
  if (!editor.value) return;
  try {
    await navigator.clipboard.writeText(editor.value);
    copyToast.classList.remove("opacity-0");
    setTimeout(() => {
      copyToast.classList.add("opacity-0");
    }, 1600);
  } catch (err) {
    console.error("Failed to copy", err);
  }
});

// Save visual feedback
saveBtn.addEventListener("click", () => {
  const originalHtml = saveBtn.innerHTML;
  saveText.textContent = "Saving...";
  fetch("https://cheatnote.onrender.com/api/user/addtext", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startString: sessionStorage.getItem("startString") || "defaultSlug",
      textString: editor.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      saveText.textContent = "Save";
      // Optionally, you can show a success message or redirect the user
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to save text. Please try again.");
      saveText.textContent = "Save";

      // Optionally, you can show an error message to the user
    });
});

fetch("https://cheatnote.onrender.com/api/user/gettext", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    startString: sessionStorage.getItem("startString") || "defaultSlug",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Fetched text:", data);
    console.log("Fetched textString:", data.text);
    console.log("data.success", data.success);
    console.log("previosly", data.previously);
    if (data.success === false || data.previously === null) {
      window.location.href = "./index.html";
    }
    editor.innerHTML = data.text || "";
  })
  .catch((error) => {
    console.error("Error fetching text:", error);
    window.location.href = "./index.html";
  });

  document.addEventListener('keydown', (event) => {
    // Example: Ctrl + S (or Cmd + S on Mac)
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
       const originalHtml = saveBtn.innerHTML;
  saveText.textContent = "Saving...";
  fetch("https://cheatnote.onrender.com/api/user/addtext", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startString: sessionStorage.getItem("startString") || "defaultSlug",
      textString: editor.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      saveText.textContent = "Save";
      // Optionally, you can show a success message or redirect the user
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to save text. Please try again.");
      saveText.textContent = "Save";

      // Optionally, you can show an error message to the user
    });
    }
});