# Dropdown Menu Feature

## Overview
This feature enables users to navigate through a dropdown menu using their keyboard, this enhances accessibility and provides a smooth user experience.

---

## Key Features

1. **Keyboard Navigation**
   - Users can navigate the dropdown menu using the `ArrowUp` and `ArrowDown` keys(these two are keys on the keyboard users use to nagivate).
   - The `keydown` event is used to listen to keypresses.

2. **Event Delegation**
   - Instead of attaching event listeners to each individual menu item, a single `keydown` event listener is added to the parent element of the menu list. This is to avoid adding event on every single item.

3. **Focus Management**
   - The `focus()` method is called on the currently active item, ensuring users can see which menu item is highlighted as they navigate.

4. **Dataset Attribute**
   - The `data-*` attributes are used to identify the currently focused element. This is when users move through the menu using the `Tab` key.

---

## Fun Facts

- **Not All Events Bubble:** 
  Events like `focus` and `blur` do not bubble, which means you can't use event delegation for them. Instead, you may need to handle these events directly on individual elements.
  
- **Focus Support for Non-Focusable Elements:** 
  By default, elements like `<div>` and `<span>` cannot receive focus, however, we can make them focusable by adding the `tabindex` attribute. This allows us to call the `focus()` method on these elements from JavaScript.

  Example:
  ```html
  <div tabindex="0">Focusable Div</div>
