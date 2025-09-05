// -------- SELECT ELEMENTS -------- //
const pages = document.querySelectorAll(".main");             
const stepTexts = document.querySelectorAll(".step-content p");   
const progressItems = document.querySelectorAll(".progress-bar li"); 
const stepNumber = document.querySelector(".step-number");   

let currentStep = 0; 

// -------- FUNCTION TO SHOW STEP -------- //
function showStep(n) {
  if (n < 0) n = 0;
  if (n >= pages.length) n = pages.length - 1;

  pages.forEach(page => page.style.display = "none");
  pages[n].style.display = "block";

  stepTexts.forEach((text, index) => {
    text.classList.toggle("active", index === n);
  });

  progressItems.forEach((item, index) => {
    item.classList.toggle("active", index <= n);
  });

  if (stepNumber) {
    stepNumber.textContent = n + 1;
  }

  currentStep = n;
}


// -------- VALIDATION FUNCTION -------- //
function validateStep(stepIndex) {
  const inputs = pages[stepIndex].querySelectorAll("input, select");
  let valid = true;

  inputs.forEach(input => {
    if (input.type !== "file" && input.value.trim() === "") {
      input.style.border = "2px solid red";
      valid = false;
    } else {
      input.style.border = "1px solid #ccc";
    }
  });

  return valid;
}

// -------- NEXT BUTTON -------- //
document.querySelectorAll(".next-button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      showStep(currentStep + 1);
    }
  });
});

// -------- BACK BUTTON -------- //
document.querySelectorAll(".back-button").forEach(btn => {
  btn.addEventListener("click", () => {
    showStep(currentStep - 1);
  });
});

// -------- SUBMIT BUTTON -------- //
document.querySelectorAll(".submit-button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      alert("Form submitted successfully! 🎉");
      showStep(currentStep + 1);
    }
  });
});

// -------- FILE UPLOAD BUTTON -------- //
const uploadBtn = document.getElementById("uploadbtn");
const fileInput = document.querySelector(".drop_box input[type='file']");

if (uploadBtn && fileInput) {
  uploadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      uploadBtn.textContent = fileInput.files[0].name;
    } else {
      uploadBtn.textContent = "Choose File";
    }
  });
}

// -------- START AT STEP 0 -------- //
showStep(0);
