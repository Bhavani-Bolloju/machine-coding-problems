# Implementation of Debounce and Throttle in vanilla JavaScript

## Debounce

### First attempt - basic delay

**Goal** -  Delay the function execution until user stops triggering an event(e.g., typing in an input field)

```
function debounce(name){
  let delay = 1000;
 setTimeout(()=>{
    console.log(name);
  }, 1000)
}
username.addEventListener("input", function(e){
  debounce(e.target.value);
})
```
❌ Problem - This simply delays function execution by 1sec but does not prevent multiple `timers` from being created. 
As a result, the function still executes for every event trigger just with a delay.

### Second attempt - clearing previous timer

**Goal** - clear any timer that is active and register new `timer` ensuring that the function executes only if user stops triggering event.

```
function debounce(name){
  let timer;
  if(timer){
    clearTimeout(timer);
  }
  timer = setTimeout(()=>{
    console.log(name);
  }, 1000)
}
```

❌ Problem - The function is executed multiple times, creating a new `timer` variable on each call. 
The timer must be preserved across function calls to ensure only the latest execution runs.

<ins>Why do we need to preserve the state between function calls??</ins>

- Each time the function is called, a new `timer` variable is created inside the function.
- If we don't keep track of the `timer` for each event, new timer will be registered and javascript will still execute it after the delay.
- This results in multiple pending timers, leading to frequent function executions.
- Without storing the timer in a persistent variable (outside the function scope), we cannot clear the previous(active) `timer`.
- Clearing the `timer` ensures that only the latest function call gets executed after the delay.


### Final attempt - using Closures to preserve timer

**Goal** - Preserve the `timer` variable(setTimeout) between function calls so that only one active timer exists when the user stops triggering the event.

```
function debounce(){
let timer;
return (text)=>{
   clearTimeout(timer);
   timer = setTimeout(()=> {
   console.log("text")
   }, 1000)
 }
}

const debounceInputUpdate = debounce();

username.addEventListener("input", function (e) {
  debounceInputUpdate(value);
});
```
**✔️ Solution:**

- Closures allow us to maintain the `timer` value(setTimeout)  between multiple function calls.
- Calling `debounce()` once declares the `timer` and the returned function(stored in debounceInputUpdate) is called on each event trigger. 
- This ensurs only the latest event(after inactivity) triggers the function execution.


----
# Throttle

Unlike debounce, which waits for inactivity before executing a function, throttle ensures function executes at a fixed interval when multiple events are triggered continuously.

**For example** if the event is triggered multiple times(mouse movement, window resize) instead of executing function on every event trigger, throttle allows execution only once every 500ms(for example). 

### First Attempt - Basic delay

**Goal** - delay function execution for every event trigger

```
const throttling = function(){
   return (text)=> {
     setTimeout(()=>{
      console.log(text)
     },500);
   } 
}
```

**❌ Problem** - This does delay the function but still executes the function for every event trigger but just with a delay

✔️ What i should i need to do instead:

- The function should executer every 500ms, no matter how many times the event is triggered.
- Any event triggered during the active `timer` should be ignored.
- And need a way to track whether the `timer` is active or not -- use `closures` just like we did with `debounce` to preserve the `state` between multiple function calls.


### Final attempt - using closures to preserve active state 

```
const throttle = function () {
  let isActive = true;
  let outputText;
  return (text) => {
    outputText = text;
    if (!isActive) {
      return;
    }
    isActive = false;
    throttleValue.textContent = text;
    setTimeout(() => {
      isActive = true;
      throttleValue.textContent = outputText;
    }, 1000);
  };
};

const throttleInputUpdate = throttle();
```

**✔️ Solution:**

- Initially `isActive` is set to `true`, meaning function/code can run and register the `timer`.
- **When the event is triggered:**
   - If `isActive` is `false`, we ignore the function call(with `return`);
   - If `isActive` is `true`, we run the function, then immediately set `isActive` to `false` to block futher executions until the timer completes.
- A setTimeout starts(500ms) and when it completes:
  - isActive is set back to true, allowing next execution.
- The `outputText` variable is to ensure that the latest text value is retained and correctly updated when the function executes after the delay.

 
















