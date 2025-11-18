// MENU ORDER CALCULATOR
const calcBtn = document.getElementById("calcTotal");
const totalDisplay = document.getElementById("totalDisplay");

if (calcBtn && totalDisplay) {
  calcBtn.addEventListener("click", () => {
    const qtyInputs = document.querySelectorAll(".menu-qty");
    let total = 0;
    qtyInputs.forEach((input) => {
      const price = parseFloat(input.dataset.price);
      const qty = parseInt(input.value) || 0;
      total += price * qty;
    });
    totalDisplay.textContent = `Estimated total: £${total.toFixed(2)}`;
  });
}

// CONTACT FORM FEEDBACK
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

if (contactForm && feedback) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      feedback.textContent = "Please fill in all required fields.";
      feedback.style.color = "#b91c1c";
    } else {
      feedback.textContent =
        "Thanks for reaching out – this is a demo site so no real bookings are made.";
      feedback.style.color = "#15803d";
      contactForm.reset();
    }
  });
}
// REVIEW FORM + RATING STARS
const reviewForm = document.getElementById("reviewForm");
const reviewGrid = document.getElementById("reviewGrid");
const reviewFeedback = document.getElementById("reviewFeedback");
const ratingStars = document.querySelectorAll(".rating-star");
const ratingInput = document.getElementById("reviewRating");

// MENU TABS – scroll to sections
const menuTabs = document.querySelectorAll(".menu-tab");

if (menuTabs.length) {
  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetSelector = tab.dataset.target;
      const target = document.querySelector(targetSelector);

      if (target) {
        // update active state
        menuTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // smooth scroll to section
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// handle star clicks
if (ratingStars.length && ratingInput) {
  ratingStars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = parseInt(star.dataset.value, 10);
      ratingInput.value = value;

      ratingStars.forEach((s) => {
        const starValue = parseInt(s.dataset.value, 10);
        if (starValue <= value) {
          s.classList.add("selected");
        } else {
          s.classList.remove("selected");
        }
      });
    });
  });
}

// handle form submit
if (reviewForm && reviewGrid && reviewFeedback && ratingInput) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const item = document.getElementById("reviewItem").value.trim();
    const text = document.getElementById("reviewText").value.trim();
    const rating = parseInt(ratingInput.value, 10);

    if (!name || !item || !text || !rating) {
      reviewFeedback.textContent =
        "Please complete all fields and choose a rating from 1 to 5.";
      reviewFeedback.style.color = "#b91c1c";
      return;
    }

    // create new review card
    const card = document.createElement("article");
    card.className = "card";

    const nameDiv = document.createElement("div");
    nameDiv.className = "review-name";
    nameDiv.textContent = name;

    const ratingDiv = document.createElement("div");
    ratingDiv.className = "review-rating";

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    ratingDiv.textContent = `${stars} • ${item}`;

    const textP = document.createElement("p");
    textP.textContent = `"${text}"`;

    card.appendChild(nameDiv);
    card.appendChild(ratingDiv);
    card.appendChild(textP);

    // add new review to the TOP of the grid
    reviewGrid.prepend(card);

    reviewFeedback.textContent = "Thanks for your review! It now appears above.";
    reviewFeedback.style.color = "#15803d";

    // reset form + stars
    reviewForm.reset();
    ratingInput.value = "";
    ratingStars.forEach((s) => s.classList.remove("selected"));
  });
}
