import colors from 'tailwindcss/colors';

export enum Experience {
  unknown = 'unknown',
  any = 'any',
  noExperience = 'noExperience',
  between1And3 = 'between1And3',
  between3And6 = 'between3And6',
  moreThan6 = 'moreThan6',
}

export const ExperienceColor: Record<Experience, string> = {
  [Experience.unknown]: colors.gray[400],
  [Experience.any]: colors.gray[200],
  [Experience.noExperience]: colors.yellow[400],
  [Experience.between1And3]: colors.green[400],
  [Experience.between3And6]: colors.cyan[400],
  [Experience.moreThan6]: colors.purple[400],
};
