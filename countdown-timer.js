var date = new Date();
var curHour = date.getHours();
var curMin  = date.getMinutes();
var curSec  = date.getSeconds();

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
			expire = _this.options.targetDate.getTime() / 1000 
			    - _this.options.getStartDate() / 1000;

			remainingSecs = Math.round(expire % 60) - 1;
			if (remainingSecs == -1) remainingSecs = 59;
			remainingMins = Math.floor(expire / 60);
			remainingHrs  = Math.floor(expire / 3600);

			CountDown.set(_this.options.seconds, remainingSecs);
			CountDown.set(_this.options.minutes, remainingMins);
			CountDown.set(_this.options.hours, remainingHrs);

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
	if (!this.hasElapsed()){
		throw "CountDownTimerDateException: Starting Date is behind Date.now()"
	}
	CountDown.intervalFunc(this)();
	this.iID = setInterval(CountDown.intervalFunc(this) , this.options.duration);
}

CountDown.prototype.stop = function(){
	clearInterval(this.iID);
}


