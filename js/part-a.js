console.log("Forms lab ready");

const form = document.getElementById("reg-form");
const nameInput = document.getElementById("full-name");
const guestsInput = document.getElementById("guests");
const workshopSelect = document.getElementById("workshop");
const laptopBox = document.getElementById("laptop");
const statusMsg = document.getElementById("status");
const summary = document.getElementById("summary");

// Task A1: submit event
// Task A3: registration summary
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const workshopText = workshopSelect.options[workshopSelect.selectedIndex].text;
  const session = document.querySelector('input[name="session"]:checked').value;
  const guests = Number(guestsInput.value);
  const laptop = laptopBox.checked;

  summary.textContent = "";
  const h2 = document.createElement("h2");
  h2.textContent = "Registration received";
  const ul = document.createElement("ul");
  [
    `Name: ${name}`,
    `Workshop: ${workshopText}`,
    `Session: ${session}`,
    `Guests: ${guests}`,
    `Own laptop: ${laptop ? "Yes" : "No"}`
  ].forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.append(li);
  });
  summary.append(h2, ul);

  statusMsg.textContent = `Thank you, ${name}!`;
  console.log(Object.fromEntries(new FormData(form))); // before the reset
  form.reset();
});
