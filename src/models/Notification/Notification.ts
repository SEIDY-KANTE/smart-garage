import NotificationType from './NotificationType';

class Notification {
  id: string;
  title: string;
  description: string;
  time: Date;
  isUnread: boolean = true;
  constructor(notification: NotificationType) {
    this.id = notification.id;
    this.title = notification.title;
    this.description = notification.description;
    this.time = notification.time;
    this.isUnread = notification.isUnread;
  }
}

export default Notification;
