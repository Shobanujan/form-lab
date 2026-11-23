const form = document.getElementById("reg-form");
const statusMsg = document.getElementById("status");

// Task B2: validation functions
function validateName(value) {
  if (value.trim() === "") return "Please enter your full name.";
  if (value.trim().length < 3) return "Your name must be at least 3 characters.";
  return "";
}
function validateStudentId(value) {
  return /^HD\d-\d{3}$/.test(value) ? "" : "Use the format HD3-017.";
}
function validateEmail(value) {
  if (value.trim() === "") return "Please enter your email.";
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter an email like name@example.com.";
}
function validatePhone(value) {
  return /^07\d{8}$/.test(value) ? "" : "Enter 10 digits starting with 07, e.g. 0771234567.";
}
function validateWorkshop(value) {
  return value !== "" ? "" : "Please choose a workshop.";
}
function validateGuests(value) {
  const n = Number(value);
  const ok = value.trim() !== "" && Number.isInteger(n) && n >= 0 && n <= 3;
  return ok ? "" : "Guests must be a whole number from 0 to 3.";
}

// Challenge B3.2: "valid" green border for touched fields with no error
function showError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  errorEl.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.classList.toggle("valid", message === "" && Boolean(input.dataset.touched));
  input.setAttribute("aria-invalid", message !== "");
}

const rules = {
  "full-name": validateName,
  "student-id": validateStudentId,
  "email": validateEmail,
  "phone": validatePhone,
  "workshop": validateWorkshop,
  "guests": validateGuests
};

function checkField(input) {
  const message = rules[input.id](input.value);
  showError(input, message);
  return message === "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstBad = null;
  for (const id in rules) {
    const input = document.getElementById(id);
    input.dataset.touched = "yes";
    if (!checkField(input) && firstBad === null) firstBad = input;
  }
  if (firstBad) {
    firstBad.focus(); // take the user to the first problem
    statusMsg.textContent = "Please fix the errors shown in red.";
    return;
  }
  statusMsg.textContent = "Registration complete!";
  form.reset();
  for (const id in rules) {
    const input = document.getElementById(id);
    delete input.dataset.touched;
    input.classList.remove("valid", "invalid");
  }
});

// Task B3 + B4: live feedback and accessible errors
for (const id in rules) {
  const input = document.getElementById(id);
  input.setAttribute("aria-describedby", `${id}-error`);
  input.addEventListener("blur", () => {
    input.dataset.touched = "yes";
    checkField(input);
  });
  input.addEventListener("input", () => {
    if (input.dataset.touched) checkField(input);
  });
}
