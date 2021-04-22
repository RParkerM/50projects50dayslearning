const curBEPEl = document.getElementById("curBp");
const curLvlEl = document.getElementById("curLvl");
const dailyMissionList = document.querySelector("#dailyMissions .missionList");
const weeklyMissionList = document.querySelector(
  "#weeklyMissions .missionList"
);
const periodMissionList = document.querySelector(
  "#periodMissions .missionList"
);
const missionLists = document.querySelectorAll(".missionList");

const goalBEPEl = document.querySelector("#goalBP .bepText");
const tabsContent = document.querySelectorAll(".tab");
const tabs = document.querySelectorAll(".missionTab");

curBEPEl.addEventListener("change", bindInputWithinRange);
curLvlEl.addEventListener("change", bindInputWithinRange);
curBEPEl.addEventListener("change", updateGoalBep);
curLvlEl.addEventListener("change", updateGoalBep);

console.log(tabs);

tabs.forEach((tab) => tab.addEventListener("click", (e) => selectTab(e)));

function selectTab(e) {
  tabs.forEach((tab) => tab.classList.remove("active"));
  e.target.classList.add("active");
  updateMissionListVisibility(e.target.id);
}

function updateMissionListVisibility(tab) {
  console.log(tab);
  missionLists.forEach((mission) =>
    mission.parentElement.classList.remove("active")
  );
  if (tab == "dailyMissionTab")
    dailyMissionList.parentElement.classList.add("active");
  else if (tab == "weeklyMissionTab")
    weeklyMissionList.parentElement.classList.add("active");
  else if (tab == "periodMissionTab")
    periodMissionList.parentElement.classList.add("active");
  console.log(missionLists);
}

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

const periodMissions = [
  ["Make a total of 50 wishes", 1500],
  ["Gain a total of 12 stars in the Spiral Abyss", 2250],
  ["[Event] Reach 2,600 points in Bullseye Balloons: Tower Waltz", 1500],
  ["[Event] Reach 3,000 points in Floral Freefall: Windrise", 1500],
  [
    "[Event] Reach 2,200 points in Ballads of Breeze: Fondest Strength on Pro Mode",
    1500,
  ],
  [
    "[Event] Complete all Peculiar Conqueror tasks in Peculiar Wonderland",
    2250,
  ],
  ['[Event] Completing all challenges in "Contending Tides"', 1500],
  ['[Event] Complete "Life Flows On (II)" and obtain Endora', 1200],
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

  initMissionList(periodMissionList, periodMissions);
}

function initMissionList(missionListElement, missionList) {
  missionListElement.innerHTML = "";
  missionList.forEach((mission) => {
    let missionEl = document.createElement("li");
    missionEl.innerHTML = `<small>${mission[0]}</small>
      <div class="bepCounter"><div class="bepText">${mission[1]}</div></div>`;
    missionListElement.append(missionEl);
  });
}

initMissions();
