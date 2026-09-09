const stingForm = document.getElementById("stingForm");
const submitBtn = document.getElementById("submitBtn");


stingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitBtn.innerText = "Loading...";
  const slugInput = document.getElementById("slugInput");
  console.log("Form submitted", slugInput.value);

  fetch("https://cheatnote.onrender.com/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startString: slugInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.redirect) {
        sessionStorage.setItem("startString", slugInput.value);
        window.location.href = "./textpage.html"
        submitBtn.innerText = "Submit";
      }
      if (data.success) {
        sessionStorage.setItem("startString", slugInput.value);
        window.location.href = "./textpage.html";
        submitBtn.innerText = "Submit";
      }
    })
    .catch((error) => {
      alert("Error submitting vote:", error);
      submitBtn.innerText = "Submit";
    });
});

