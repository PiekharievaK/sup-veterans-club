interface Contact {
  title: string;
  url: string;
  description?: string;
}

interface PartnerText {
  name: string;
  description: string;
}

export interface Partner {
  id: string;
  image: string;
  contacts: Contact[];
  ua: PartnerText;
  en: PartnerText;
}
