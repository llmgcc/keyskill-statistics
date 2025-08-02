export enum Level {
  Junior = 'Junior',
  'Junior+' = 'Junior+',
  Middle = 'Middle',
  'Middle+' = 'Middle+',
  Senior = 'Senior',
  'Senior+' = 'Senior+',
}

export const LevelDescription = {
  [Level.Junior]: 'Mostly needed in entry-level positions',
  [Level['Junior+']]: 'Common for early-career roles',
  [Level.Middle]: 'Standard level for professionals',
  [Level['Middle+']]: 'For specialists with broader responsibilitiess',
  [Level.Senior]: 'For experts and complex tasks',
  [Level['Senior+']]: 'For top experts and leadership roles',
};

export const LevelRange = {
  [Level.Junior]: {
    min: 0,
    max: 2,
  },
  [Level['Junior+']]: {
    min: 2,
    max: 5,
  },
  [Level.Middle]: {
    min: 5,
    max: 6,
  },
  [Level['Middle+']]: {
    min: 6,
    max: 7.5,
  },
  [Level.Senior]: {
    min: 7.5,
    max: 9,
  },
  [Level['Senior+']]: {
    min: 9,
    max: 10,
  },
};
