export type EventType = {
  id: string;
  date: string; // 'YYYY-MM-DD'
  type: string;
  timeStart: string; // 'HH:mm'
  timeEnd: string;
  instructors: string[];
  slots: number;
  location: string;
  preRegistration?: boolean;
};
