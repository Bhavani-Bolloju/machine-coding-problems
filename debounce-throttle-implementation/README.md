# Debounce and Throttle

Debounce and Throttle are two different optimization techniques used to improve performance by controlling how often a function executes.

## Debounce
- It is technique that is used to limit the number of times a function is executed with a given time.
- It is useful when a function is triggered frequently by events like keypress, scroll etc.
- Instead of executing the function immediately on every event trigger, debounce waits for a specified delay before executing the function
- Each time the event is triggered within the delay period, the timer resets, ensuring that the function runs only once after the user stops triggering the event.

**Example** - Imagine a search bar where users type to search for country names, If we trigger an API for every keystroke or character user enters, it would be so inefficient and could cause excessive network issues. 
  Instead with debounce we would wait for the user to stop typing for a certain period(1 min) before making the API call.

  ----

  ## Throttle
  Throttle may seem similar to debounce, but the key difference lies in how they handle event execution. 
  While debounce waits for inactivity, throttle ensures that a function runs at most once in a fixed time interval, no matter how many times the event is triggered.

  - Like debounce, throttle is used to control how often a function is executed.
  - However, throttle does not wait for user inactivity, instead, it guarantees that the function executes at regular intervals (e.g., once every 100ms).
  - Any event triggered within the waiting period is ignored until the next allowed execution time.
  - It is useful for scenarios where continuous event triggers need to be handled efficiently, such as scrolling, mouse movement, or window resizing

**Example** - Imagine we implement a custom cursor that follows the user's mouse movement, each time the mouse moves, multiple events are fired continuously.

- without throttling evey time movement would trigger a state update, leading to performance issue
- with throttle we ensure state updates at a fixed interval(like every 100ms) ignoring every other even in between. This way, we smoothly update the cursor without unnecessary updates. 

  

