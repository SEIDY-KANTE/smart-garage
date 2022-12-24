import moment from 'moment';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email.trim().toLowerCase());
};

export const getDateAndTime = (timestamp: any): Date => {
  const fireBaseTime = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return fireBaseTime;
};

export const getFormattedDate = (timestamp: Date): string => {
  return timestamp.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getFormattedTime = (timestamp: Date): string => {
  let hours = timestamp.getHours();
  let minutes: number | string = timestamp.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};

export const timeAgo = (time: string) => {
  const now = moment(new Date());
  const then = moment(time);
  return then.diff(now);
};

export const findDiffInMins = (from: Date, to: Date) => {
  const diff = Math.abs(to.getTime() - from.getTime());
  return Math.ceil(diff / (1000 * 60));
}