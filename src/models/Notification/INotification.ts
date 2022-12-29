export interface INotification {
  id: string;
  title: string;
  description: string;
  time: Date;
  isUnread: boolean;
}

export default INotification;