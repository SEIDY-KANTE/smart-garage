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
  return timestamp.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};