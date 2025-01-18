const openModal = document.querySelector(".open-modal");

const closeModal = document.querySelector(".close-modal");

const modalBox = document.querySelector(".modal-box");

const overlay = document.querySelector(".modal-overlay");

const modalToggle = function functionName() {
  overlay?.classList.toggle("modal-view");

  modalBox?.classList.toggle("box-view");
};

openModal?.addEventListener("click", modalToggle);

closeModal?.addEventListener("click", modalToggle);

overlay?.addEventListener("click", modalToggle);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const activeOverlay = overlay?.classList.contains("hidden");

    if (!activeOverlay) {
      modalToggle();
    }
  }
});

