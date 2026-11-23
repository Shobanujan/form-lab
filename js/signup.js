// ===== Data =====
const takenUsernames = ["admin", "nimali", "kavin"]; // pretend the server sent these

// ===== Page elements =====
const form = document.getElementById("signup-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmBox = document.getElementById("confirm");
const terms = document.getElementById("terms");
const showBtn = document.getElementById("show-btn");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");
const strengthEl = document.getElementById("strength");
const capsWarning = document.getElementById("caps-warning");
const ruleItems = {
  length: document.getElementById("rule-length"),
  number: document.getElementById("rule-number"),
  upper: document.getElementById("rule-upper"),
  symbol: document.getElementById("rule-symbol")
};

function showError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  errorEl.textContent = message;
  input.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "");
}

// TODO 1
function checkUsername(value) {
  if (!/^\w{3,15}$/.test(value)) return "Use 3 to 15 letters, numbers or _.";
  if (takenUsernames.includes(value.toLowerCase())) return "That username is taken. Try another.";
  return "";
}

// TODO 2
function checkEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Enter an email like name@example.com.";
}

// TODO 3 (+ Challenge C: strength word)
function checkPasswordRules(value) {
  const results = {
    length: value.length >= 8,
    number: /\d/.test(value),
    upper: /[A-Z]/.test(value),
    symbol: /[^A-Za-z0-9]/.test(value)
  };
  for (const key in results) {
    ruleItems[key].classList.toggle("met", results[key]);
  }
  const metCount = Object.values(results).filter(Boolean).length;
  if (value === "") strengthEl.textContent = "";
  else if (metCount <= 2) strengthEl.textContent = "Strength: Weak";
  else if (metCount === 3) strengthEl.textContent = "Strength: Fair";
  else strengthEl.textContent = "Strength: Strong";
  return metCount === 4;
}

// TODO 4
function checkConfirm() {
  if (confirmBox.value === "") return "Please type your password again.";
  if (confirmBox.value !== password.value) return "Passwords do not match.";
  return "";
}

function updateForm() {
  if (username.value !== "") showError(username, checkUsername(username.value));
  if (email.value !== "") showError(email, checkEmail(email.value));
  if (confirmBox.value !== "") showError(confirmBox, checkConfirm());
  const pwOk = checkPasswordRules(password.value);
  const allOk = checkUsername(username.value) === "" &&
                checkEmail(email.value) === "" &&
                pwOk && checkConfirm() === "" && terms.checked;
  submitBtn.disabled = !allOk;
}

[username, email, password, confirmBox, terms].forEach((el) => {
  el.addEventListener("input", updateForm);
});

// TODO 5
showBtn.addEventListener("click", () => {
  const hidden = password.type === "password";
  password.type = hidden ? "text" : "password";
  showBtn.textContent = hidden ? "Hide" : "Show";
});

// Challenge C: Caps Lock warning
password.addEventListener("keydown", (e) => {
  capsWarning.textContent = e.getModifierState("CapsLock") ? "Caps Lock is on" : "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  updateForm();
  if (submitBtn.disabled) return;
  result.textContent = `Welcome, ${username.value.trim()}! Your account is ready.`;
  form.hidden = true;
  form.reset();
});
