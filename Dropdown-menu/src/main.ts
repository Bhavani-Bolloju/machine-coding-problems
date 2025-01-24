const dropdown_btn = document.querySelector(".dropdown-btn") as HTMLElement;

const dropdown_list = document.querySelector(".dropdown-list") as HTMLElement;

const dropdown_items = dropdown_list.querySelectorAll("a");

let focusedItemIndex = 0;

let toggleCount = 0;

//toggling the drop down button
dropdown_btn?.addEventListener("click", function () {
  dropdown_list.classList.toggle("hidden");
  toggleCount = 1;
});

//open the list with the keydown and focus on the first time when keydown is pressed twice
dropdown_btn?.addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") {
    dropdown_list.classList.remove("hidden");
    toggleCount += 1;
  }

  if (toggleCount > 1) {
    dropdown_items[0].focus();
    focusedItemIndex = 1;
    toggleCount = 0;
  }
});

//listening to item that is currently focused in case if the user uses tab to navigate
dropdown_items.forEach((el) => {
  el.addEventListener("focus", (e: Event) => {
    const element = e.target as HTMLElement;

    const id = element.dataset.id;

    if (id) {
      focusedItemIndex = +id;
    }
  });
});

//event delegation, listening to keydown even on the parent element and incrementing and decrementing the focusedItemIndex based on whether user is navigating up or down
dropdown_list?.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    dropdown_list.classList.add("hidden");
  }

  const length = dropdown_items.length;

  if (e.key === "ArrowDown") {
    focusedItemIndex < length
      ? (focusedItemIndex += 1)
      : (focusedItemIndex = length);
  }

  if (e.key === "ArrowUp") {
    focusedItemIndex <= 1 ? (focusedItemIndex = 1) : (focusedItemIndex -= 1);
  }

  dropdown_items[focusedItemIndex - 1].focus();
});

