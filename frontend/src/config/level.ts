import colors from 'tailwindcss/colors';

export enum Level {
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
}

export const LevelDescription = {
  [Level.Junior]: 'Typical for entry-level positions',
  [Level.Middle]: 'Common for mid-level roles',
  [Level.Senior]: 'Expected for senior positions',
};

export const LevelColor = {
  [Level.Junior]: colors.sky[400],
  [Level.Middle]: colors.emerald[400],
  [Level.Senior]: colors.rose[400],
};
