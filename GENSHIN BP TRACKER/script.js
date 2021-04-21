const curBEPEl = document.getElementById("curBp");
const curLvlEl = document.getElementById("curLvl");
const dailyMissionList = document.querySelector("#dailyMissions .missionList");
const weeklyMissionList = document.querySelector(
  "#weeklyMissions .missionList"
);
const goalBEPEl = document.querySelector("#goalBP .bepText");
const tabs = document.querySelectorAll(".tab");

curBEPEl.addEventListener("change", bindInputWithinRange);
curLvlEl.addEventListener("change", bindInputWithinRange);
curBEPEl.addEventListener("change", updateGoalBep);
curLvlEl.addEventListener("change", updateGoalBep);

console.log(tabs);

tabs.forEach((tab) =>
  tab.addEventListener("click", () => tab.classList.toggle("active"))
);

function updateGoalBep() {
  let curLvl = curLvlEl.value;
  let curBEP = curBEPEl.value;

  let bpRemaining = (50 - curLvl) * 1000 - curBEP;

  goalBEPEl.innerHTML = Math.max(0, bpRemaining);
}

const dailyMissions = [
  ["Log in", 120],
  ["Complete 4 Daily Commissions", 150],
  ["Mine 10 items", 150],
  ["Use a total of 150 Original Resin", 225],
];

const weeklyMissions = [
  ["Cook 20 dishes", 360],
  ["Forge 20 items", 360],
  ["Collect 100 Mondstadt local specialties", 450],
  ["Collect 100 Liyue local specialties", 450],
  ["Complete 15 Domain Challenges", 450],
  ["Complete Ley Line deposit challenges 20 times", 450],
  ["Defeat boss enemies 10 times", 450],
  ["Spend a total of 500,000 Mora", 450],
  ["Complete 3 Requests", 450],
  ["Complete 3 Bounties", 450],
  ["Use a total of 1,200 Original Resin", 675],
  ["Complete the Stormterror Domain Challenge", 675],
  ["Complete the Wolf of the North Challenge", 675],
  ["Complete the Golden House Challenge", 675],
];

function bindInputWithinRange(e) {
  if (!e || !e.target || !e.target.min || !e.target.max) return;
  let max = e.target.max;
  let min = e.target.min;
  e.target.value = Math.min(Math.max(min, e.target.value), max);
}

function initMissions() {
  dailyMissionList.innerHTML = "";
  dailyMissions.forEach((mission) => {
    let missionEl = document.createElement("li");
    missionEl.innerHTML = `<small>${mission[0]}</small>
      <div class="bepCounter"><div class="bepText">${mission[1]}</div></div>`;
    dailyMissionList.append(missionEl);
  });

  weeklyMissionList.innerHTML = "";
  weeklyMissions.forEach((mission) => {
    let missionEl = document.createElement("li");
    missionEl.innerHTML = `<small>${mission[0]}</small>
      <div class="bepCounter"><div class="bepText">${mission[1]}</div></div>`;
    weeklyMissionList.append(missionEl);
  });
}

initMissions();
