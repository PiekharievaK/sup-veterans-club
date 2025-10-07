export type Program = {
  id: string;
  schedule: string;
  category: string;
  image: string;
  icon: string;
  benefits: Benefit[];
  ua: LanguageContent;
  en: LanguageContent;
};

export type LanguageContent = {
  title: string;
  description: string;
};

type Benefit = {
  icon: string;
  ua: string;
  en: string;
};
