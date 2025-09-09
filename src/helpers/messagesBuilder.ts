export interface SignInData {
  owner: {
    name: string;
    email: string;
    phone?: string;
    adress?: string;
  };
  date: string;
  time: string;
  type: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
}

export const createSignInMessage = (data: SignInData): string => {
  return `<b>Реєстрація на тренування</b>\n
<b>Час реєстрації : </b>${new Date().toLocaleString()}\n
<b>Ім'я: </b>${data.owner.name || data.owner.email}\n
<b>Пошта: </b>${data.owner.email}\n
<b>Телефон: </b>${data.owner.phone || "-"}\n
<b>Тип тренування: </b> ${data.type}\n
<b>Дата і час: </b> ${data.date}, ${data.time} \n
<b>Час: </b> \n${data.time}\n`;
};

export const createContactMessage = (data: ContactData): string => {
  return `<b>Повідомлення з сайту</b>\n
<b>Дата створення: </b>${data.date}\n
<b>Відправник: </b>${data.name}\n
<b>Пошта: </b>${data.email}\n
<b>Телефон: </b>${data.phone || "-"}\n
${data.message.trim() ? `<b>Повідомлення: </b>${data.message}\n` : ""}`;
};
