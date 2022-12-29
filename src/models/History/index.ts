import { IHistory } from './IHistory';

class History implements IHistory{
  public id: string;
  public device: string;
  public isOpen: boolean;
  public user: string;
  public dateAndTime: Date;
  public constructor(historyData: IHistory) {
    this.id = historyData.id;
    this.device = historyData.device;
    this.isOpen = historyData.isOpen;
    this.user = historyData.user;
    this.dateAndTime = historyData.dateAndTime;
  }
}

export default History;
