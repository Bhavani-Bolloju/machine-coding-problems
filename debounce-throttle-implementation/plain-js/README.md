# Implementation of Debounce and Throttle in Vanilla JavaScript

## Debounce

### Frist Attempy - Basic delay

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
❌ Problem - This simply delays function execution by 1sec but does not prevent multiple timers from being created. 
As a result, the function still executes for every event trigger just with a delay.

### Second Attempt - Clearing previous timer

**Goal** - clear any timer that is active and register new timer ensuring that the function executes only if user stops triggering event.

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

❌ Problem - The function is executed multiple times, creating a new timer variable on each call. 
The timer must be preserved across function calls to ensure only the latest execution runs.

**Why do we need to preserve the state between function calls??**

- Each time the function is called, a new timer variable is created inside
- JavaScript will still execute the setTimeout after the delay, even if a newer event has already triggered another timer.
- This results in multiple pending timers, causing frequent function executions.
- But if we don’t store the timer in a persistent variable (outside the function scope), we cannot access the previous timer to clear it.
- Clearing the timer ensures that only the latest function call gets executed after the delay.


### Final Attempt - Using Closures to preserve timer

**Goal** - Preserve the `setTimeout`(the timer variable) between function calls so that only one active timer exists when the user stops triggering the event.

```
function debounce(){
let timer;
return (text)=>{
	clearTimeout(timer);
	timer = setTimeout(()=>{
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

- Closures allow us to maintain the `timer` variable between multiple function calls.
- Calling `debounce()` once declares the `timer` and the returned function(stored in debounceInputUpdate) is called on each event trigger. 
- This ensurs only the latest event(after inactivity) triggers the function execution.



----
## Throttle




