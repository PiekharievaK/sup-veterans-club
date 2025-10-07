export type SocialLink = {
  platform: "instagram" | "facebook" | string;
  url: string;
};

export type LocalizedCoachData = {
  name: string;
  role: string;
  description: string;
};

export type Coach = {
  id: string;
  photo: string[];
  ua: LocalizedCoachData;
  en: LocalizedCoachData;
  socials: SocialLink[];
};
