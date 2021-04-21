const holdTimeInMinutes = 0.3; //20;
const monitorPeriodInMinutes = 0.1; //1.5;
const checkTempInMinutes = 0.1; //1;

const timerElements = document.querySelectorAll(".timerLabel");
const addButton = document.querySelector(".addTimerButton");
const main = document.getElementById("timerMain");
const monitored = document.getElementById("monitoredTimers");

const timers = [];

const aSecond = new Date(0);
aSecond.setSeconds(1);

let inter = setInterval(() => {
  console.log(timers);
  timers.forEach((timer) => timer.updateTime());
}, 500);

class Timer {
  static id = 0;

  constructor(
    name,
    element,
    maxHoldTime = holdTimeInMinutes,
    monitorPeriod = monitorPeriodInMinutes
  ) {
    this.maxHoldTime = new Date(0);
    this.maxHoldTime.setSeconds(maxHoldTime * 60);

    this.monitorPeriod = new Date(0);
    this.monitorPeriod.setSeconds(monitorPeriod * 60);

    this.startTime = Date.now();
    this.name = name;
    this.tempChecked = false;
    this.element = element;

    this._tempTime = new Date(0);
    this._tempTime.setSeconds((monitorPeriod + checkTempInMinutes) * 60);

    this.elapsedTime = new Date(0);

    this.status = "monitor";

    this.disableHandler = {
      handleEvent: () => {
        this.disableElementHandler.call(this);
      },
    };
    this.changeTempHandler = {
      handleEvent: () => {
        this.changeTempStatus.call(this);
      },
    };

    element.addEventListener("click", this.disableHandler);
  }

  disableElementHandler() {
    console.log(this);
    this.element.classList.add("disabled");
    this.element.removeEventListener("click", this.disableHandler);
    setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
      timers.splice(timers.indexOf(this), 1);
    }, 400);
  }

  changeTempStatus() {
    this.tempChecked = true;
    this.element.classList.remove("needTemp");
    this.element.classList.add("serve");
    this.status = "serve";
    this.element.removeEventListener("click", this.changeTempHandler);
    this.element.addEventListener("click", this.disableHandler);
    this.updateTime();
  }

  getTimeRemainingStr() {
    if (this.elapsedTime < this.monitorPeriod) {
      return this._timeToTimeStr(
        new Date(this.monitorPeriod - this.elapsedTime)
      );
    }
    if (!this.tempChecked && this.elapsedTime < this._tempTime) {
      return this._timeToTimeStr(new Date(this._tempTime - this.elapsedTime));
    }
    if (this.elapsedTime < this.maxHoldTime) {
      return this._timeToTimeStr(new Date(this.maxHoldTime - this.elapsedTime));
    }
    return (
      "-" + this._timeToTimeStr(new Date(this.elapsedTime - this.maxHoldTime))
    );
  }

  updateStatus() {
    if (this.status == "monitor" && this.elapsedTime >= this.monitorPeriod) {
      this.status = "needTemp";
      this.element.classList.remove("monitor");
      this.element.classList.add("needTemp");
      this.element.addEventListener("click", this.changeTempHandler);
      this.element.removeEventListener("click", this.disableHandler);
      console.log("changed need temp", this);
    }
    if (this.status == "needTemp" && this.elapsedTime >= this._tempTime) {
      // this.status = "serve";
      // this.element.classList.remove("needTemp");
      // this.element.classList.add("serve");
      this.changeTempStatus();
    }
    if (this.status == "serve" && this.elapsedTime >= this.maxHoldTime) {
      this.status = "expired";
      this.element.classList.remove("serve");
      this.element.classList.add("expired");
    }
  }

  updateTime() {
    this.elapsedTime = new Date(Date.now() - this.startTime);
    this.updateStatus();
    this.element.children[0].innerText = this.getTimeRemainingStr();
  }

  _timeToTimeStr(time) {
    return time.toISOString().substr(14, 5);
  }
}

timerElements.forEach((timer) => {
  timer.addEventListener("click", () => {
    timer.classList.add("disabled");
    setTimeout(() => {
      timer.parentElement.removeChild(timer);
    }, 400);
  });
});

addButton.addEventListener("click", () => {
  addNewTimer();
});

function addNewTimer() {
  let timerEl = document.createElement("div");
  timerEl.classList.add("timerLabel", "filets", "monitor");

  let timer = new Timer("FILETS 2", timerEl);
  timers.unshift(timer);
  timerEl.innerHTML = `FILETS 2
  <div class="timeDisplay">${timer.getTimeRemainingStr()}</div>`;

  monitored.prepend(timerEl);
}
