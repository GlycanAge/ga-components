export class Service {
  getReport(): Promise<any> {
    return Promise.resolve(true);
  }

  getScatterData(type: string, gender: string): Promise<any> {
    return Promise.resolve(true);
  }

  getLineData(type: string, gender: string): Promise<any> {
    return Promise.resolve(true);
  }

  getOverTimeData(): Promise<any> {
    return Promise.resolve(true);
  }
}
