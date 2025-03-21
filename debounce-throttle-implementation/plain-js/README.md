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
## Throttle

Instead of waiting for inactivity from the user before allowing function execution, throttle ensures a function is executed at certain fixed interval when multiple events are triggered continuously.

suppose if the event is triggered continuously we have to excute the fuction for every 500ms at fixed interval instead of executing it every event trigger

### First Attempt - Basic delay

**Goal** - Is to delay the function execution for every event tigger

```
const throttling = function(){
   return (text)=> {
     setTimeout(()=>{
      console.log(text)
     },2000);
   } 
}
```




















