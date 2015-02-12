# countdown-timer
A dead simple, date-based hh:mm:ss countdown timer (529 bytes minified + gzipped)

Consider this countdown timer if you need a countdown for relatively short durations in your project. 
This countdown timer is built around the JS ```Date()``` API, so it can handle both relative and absolute timespans.

## Requirements
A Browser supporting the ```Date()``` API.

## Using 
Build a nice HTML structure for the CountDown:
```html
<div class="countdown-timer">
	<span id="h" class="number">00</span>
	<span class="sep">:</span>
	<span id="m" class="number">00</span>
	<span class="sep">:</span>
	<span id="s" class="number">00</span>
</div>
```

Now, initialize the CountDown:
```js

var fireMissiles = function(){
	console.log("Booooooom!")
}

// Example: targetDate is midnight
midnight = new Date();
midnight.setHours(24);
midnight.setMinutes(0);
midnight.setSeconds(0);

var countDown = new CountDown({
	// Required Settings:
	// When to fire the Countdown...
	targetDate: midnight,

	// Where to put the CountDown? 
	hours:   document.getElementById("h"),
	minutes: document.getElementById("m"),
	seconds: document.getElementById("s"),

	// Function that should fire when countdown expires
	onCountDownExpired: fireMissiles
});
// Starts the Countdown
countDown.set();
```
If you're lucky, the countdown should now begin to count down!

## Exceptions
```js 
throw "CountDownTimerConstructurException: Missing required option!"
/* One of these require arguments not supplied to the constructor:
    options.targetDate
    options.hours
    options.minutes
    options.seconds */

throw "CountDownTimerDateException: TargetDate is behind Date.now()"
/* options.targetDate is behind Date.now() */
```

## Some use cases
- Supplying absolute Dates
```js
var countDown = new CountDown({
  // ...
  // Beware: Date()'s month is 0-based, so the date below is
  // actually 2015-02-12 (instead of 2015-01-12)
  targetDate: new Date(2015,01,12,21,24,00),
  // ...
});
```
- Supplying relative Dates
```js
in30Secs = new Date();
in30Secs.setSeconds( in30Secs.getSeconds() + 30 );

var countDown = new CountDown({
  // ...
  targetDate: in30Secs,
  // ...
});
```

- Having an awesome release party:
```js
var countDown = new CountDown({
  // ...
  targetDate: new Date(2015,01,01,24,00,00),
  onCountDownExpired: function(){
    // Reload the page on countdown expiry
    location.reload(true);
  }
  // ...
});
```
```bash
# Hypothetical Serverside code:
deployServer ~/nice-website-webroot $ echo "mv actual_index.html index.html" | at 2359 feb 1
```

## API Docs
```js
// Constructor
CountDown(options);

// where default options are:
options = {
  // Supply me pls:
  targetDate: undefined,
  hours: undefined,
  minutes: undefined,
  seconds: undefined,

  // Relative to what should the targetDate be?
  getStartDate: function(){
    return Date.now();
  },
  
  // Note that this options has nothing to do with how fast the timer is running:
  // it just defined how many times the CountDown timer updates its internal state (and the DOM)
  duration: 1000,
  
  // Do awesome things here!
  onCountDownExpired: function(){},
}

// Starts the CountDown
CountDown.prototype.set();

// Stops the CountDown, note that this is done automatically 
// for you when the CountDown elapses naturally
CountDown.prototype.stop();

bool CountDown.prototype.hasElapsed();
```
