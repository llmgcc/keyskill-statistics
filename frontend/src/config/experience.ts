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
  [Experience.unknown]: colors.slate[300],
  [Experience.any]: colors.slate[400],
  [Experience.noExperience]: colors.zinc[400],
  [Experience.between1And3]: colors.emerald[300],
  [Experience.between3And6]: colors.amber[300],
  [Experience.moreThan6]: colors.rose[400],
};
