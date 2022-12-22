import { HistoryType } from './HistoryType';

class History {
  public id: string | undefined;
  public device: string;
  public isOpen: boolean;
  public user: string;
  public dateAndTime: Date;
  public constructor(historyData: HistoryType) {
    this.id = historyData.id || undefined;
    this.device = historyData.device;
    this.isOpen = historyData.isOpen;
    this.user = historyData.user;
    this.dateAndTime = historyData.dateAndTime;
  }
}

export default History;
