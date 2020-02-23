import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "days", "hours", "minutes", "seconds" ]

  connect() {
    const deadline = new Date("2020-05-02 16:00");
    this.initializeClock(deadline);
  }


  initializeClock = (endtime) => {
    // var clock = this.element;
    var daysSpan = this.daysTarget;
    var hoursSpan = this.hoursTarget;
    var minutesSpan = this.minutesTarget;
    var secondsSpan = this.secondsTarget;

    const updateClock = () => {
      var t = this.getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  getTimeRemaining = (endtime) => {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
}
