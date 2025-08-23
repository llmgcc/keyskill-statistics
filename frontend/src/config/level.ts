export enum Level {
  Junior = 'Junior',
  'Junior+' = 'Junior+',
  Middle = 'Middle',
  'Middle+' = 'Middle+',
  Senior = 'Senior',
  'Senior+' = 'Senior+',
}

export const LevelDescription = {
  [Level.Junior]: 'Basic level for entry-level professionals',
  [Level['Junior+']]: 'Entry level with minimal experience requirements',
  [Level.Middle]: 'Intermediate level for experienced professionals',
  [Level['Middle+']]: 'Advanced level with extended requirements',
  [Level.Senior]: 'High level for experts',
  [Level['Senior+']]: 'Expert level with high qualification requirements',
};

export const LevelRange = {
  [Level.Junior]: {
    min: 0,
    max: 2.933,
  },
  [Level['Junior+']]: {
    min: 2.933,
    max: 3.8,
  },
  [Level.Middle]: {
    min: 3.8,
    max: 4.514,
  },
  [Level['Middle+']]: {
    min: 4.514,
    max: 5.2,
  },
  [Level.Senior]: {
    min: 5.2,
    max: 6.091,
  },
  [Level['Senior+']]: {
    min: 6.091,
    max: 10,
  },
};
