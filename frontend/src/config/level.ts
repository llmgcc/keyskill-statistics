export enum Level {
  Junior = 'Junior',
  'Junior+' = 'Junior+',
  Middle = 'Middle',
  'Middle+' = 'Middle+',
  Senior = 'Senior',
  'Senior+' = 'Senior+',
}

export const LevelDescription = {
  [Level.Junior]: 'Typical for entry-level positions',
  [Level['Junior+']]: 'Typical for entry-level positions',
  [Level.Middle]: 'Common for mid-level roles',
  [Level['Middle+']]: 'Common for mid-level roles',
  [Level.Senior]: 'Expected for senior positions',
  [Level['Senior+']]: 'Expected for senior positions',
};
