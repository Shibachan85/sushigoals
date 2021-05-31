export const MAX_GOLD_POTION_CAN_HOLD = 9768;
export const MAX_HEIGHT = 280;
export const MAX_GOLD = 9350;
export const BOTTOM_PADDING = 17;
export const LINE_HEIGHT = 4;
export const X_MODIFIER = 1536;
export const Y_MODIFIER = 720;
export const MOBILE_WIDTH = 640;

//const DEV = "http://localhost:1337";
// const PREP = "PREP";
const PROD = process.env.REACT_APP_API_URL;

export const API_URL = PROD;
const SCREEN_WIDTH = window.screen.width;

export const deviceIsMobile = () => {
  if (SCREEN_WIDTH < MOBILE_WIDTH) {
    return true;
  }
  return false;
};

export const calcCurrentAchievement = (data) => {
  const unlocks = data.reduce((acc, cur) => {
    return acc + cur.isAchievement;
  }, 0);
  return unlocks;
};

export const LANTERN_COORDS = [
  { x: 412, y: 584, size: 18, delay: 5 },
  { x: 1160, y: 118, size: 18, delay: 5 },
  { x: 1296, y: 339, size: 18, delay: 4.5 },
  { x: 279, y: 500, size: 7, delay: 4 },
  { x: 738, y: 480, size: 7, delay: 3.7 },
  { x: 613, y: 456, size: 7, delay: 3.5 },
  { x: 751, y: 454, size: 7, delay: 3 },
  { x: 630, y: 446, size: 7, delay: 2.5 },
  { x: 713, y: 434, size: 3, delay: 2.2 },
  { x: 641, y: 433, size: 3, delay: 2 },
  { x: 660, y: 436, size: 3, delay: 1.5 },
  { x: 689, y: 434, size: 3, delay: 1 },
];

export const INTERVAL_VALUE = {
  first: 100,
  second: 250,
  third: 500,
  fourth: 1000,
  fifth: 2500,
  sixth: 5000,
};

export const INTERVAL_GOLD = {
  first: 100,
  second: 350,
  third: 850,
  fourth: 1850,
  fifth: 4350,
  sixth: 9350,
};

export const INTERVAL_TITLE = {
  first: "1ST",
  second: "2ND",
  third: "3RD",
  fourth: "4TH",
  fifth: "5TH",
  sixth: "6TH",
};

export const LINE_ADJUSTMENT = {
  first: 20,
  second: 40,
  third: 60,
  fourth: 70,
  fifth: 60,
  sixth: -10,
};

// export const find = (gold) => {
//   if (gold <= INTERVAL_VALUE.first) {
//     return gold;
//   } else if (gold > INTERVAL_VALUE.first && gold <= INTERVAL_VALUE.second) {
//     return gold - INTERVAL_VALUE.first;
//   } else if (gold > INTERVAL_VALUE.second && gold <= INTERVAL_VALUE.third) {
//     return LINE_ADJUSTMENT.third;
//   } else if (gold > INTERVAL_VALUE.third && gold <= INTERVAL_VALUE.fourth) {
//     return LINE_ADJUSTMENT.fourth;
//   } else if (gold > INTERVAL_VALUE.fourth && gold <= INTERVAL_VALUE.fifth) {
//     return LINE_ADJUSTMENT.fifth;
//   } else if (gold > INTERVAL_VALUE.fifth && gold <= INTERVAL_VALUE.sixth) {
//     return LINE_ADJUSTMENT.sixth;
//   } else if (gold >= INTERVAL_VALUE.sixth) {
//     return LINE_ADJUSTMENT.sixth;
//   } else {
//     console.error("FAILED TO PROCESS GOLD MODIFIER");
//     return 0;
//   }
// };

export const POTION_PIXEL_TARGETS = {
  first: 23,
  second: 50,
  third: 85,
  fourth: 125,
  fifth: 190,
  sixth: 270,
};
