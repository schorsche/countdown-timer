var CountDown = function(options){
	if (    !options.targetDate
		 || !options.hours
		 || !options.minutes
		 || !options.seconds){
		throw "CountDownTimerConstructorException: Missing required option!"
	}

	if (!options.getStartDate){
		options.getStartDate = function(){
			return Date.now();
		}
	}

	if (!options.duration){
		options.duration = 1000;
	}

	if (!options.onCountDownExpired){
		options.onCountDownExpired = function(){};
	}

	this.options = options;
}

CountDown.set = function(selector, value){
	value = value.toString();
	if (value.length == 1)
		value = "0" + value;
	selector.innerHTML = value;
}

CountDown.intervalFunc = function(_this){
	return function(){
		// Seconds to expire
		expire = _this.options.targetDate.getTime() / 1000 
		    - _this.options.getStartDate() / 1000;

		// Convert Seconds to expire to hh:mm:ss
		remainingSecs = Math.round(expire % 60) - 1;
		if (remainingSecs == -1) remainingSecs = 59;
		remainingMins = Math.floor((expire-1) / 60) % 60;
		remainingHrs  = Math.floor((expire-1) / 3600);

		// Display tick
		CountDown.set(_this.options.seconds, remainingSecs);
		CountDown.set(_this.options.minutes, remainingMins);
		CountDown.set(_this.options.hours, remainingHrs);

		// Detect countdown expiry
		if (remainingSecs == 0 && remainingMins == 0 && remainingHrs == 0){
			_this.options.onCountDownExpired();
			clearInterval(_this.iID);
		}
	}
}

CountDown.prototype.hasElapsed = function(){
	return this.options.targetDate.getTime() - this.options.getStartDate() > 0 
}

CountDown.prototype.set = function(){
	if (!(this.hasElapsed())){
		throw "CountDownTimerDateException: TargetDate is behind Date.now()"
	}
	CountDown.intervalFunc(this)();
	this.iID = setInterval(CountDown.intervalFunc(this) , this.options.duration);
}

CountDown.prototype.stop = function(){
	clearInterval(this.iID);
}


