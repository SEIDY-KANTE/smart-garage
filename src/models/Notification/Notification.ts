import INotification from './INotification';

class Notification {
  id: string;
  title: string;
  description: string;
  time: Date;
  isUnread: boolean = true;
  constructor(notification: INotification) {
    this.id = notification.id;
    this.title = notification.title;
    this.description = notification.description;
    this.time = notification.time;
    this.isUnread = notification.isUnread;
  }
}

export default Notification;
