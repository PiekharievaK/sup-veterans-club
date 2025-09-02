export type Program = {
  category: string;
  icon: string;
  image: string;
  ua: LanguageContent;
  en: LanguageContent;
};

export type LanguageContent = {
  title: string;
  description: string;
  benefits: string[];
  schedule: string;
};
