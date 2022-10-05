import LoggerError from './err/Error';

interface Disk {
  save: (key: string, value: string) => Promise<void>;
  load: (key: string) => Promise<void>;
  delete: (key: string) => Promise<void>;
}

export default class Storage {
  private _prefix?: string;
  private _disk?: Disk;

  set prefix(prefix: string) {
    this._prefix = prefix;
  }

  set disk(disk: Disk) {
    this._disk = disk;
  }

  async save(value: string) {
    try {
      this.checkEssential();
      await this._disk!.save(`${this._prefix}`, value);
    } catch (e) {
      throw e;
    }
  }

  async load(): Promise<any> {
    try {
      this.checkEssential();
      return await this._disk!.load(`${this._prefix}`);
    } catch (e) {
      throw e;
    }
  }

  async delete() {
    try {
      this.checkEssential();
      await this._disk!.delete(`${this._prefix}`);
    } catch (e) {
      throw e;
    }
  }

  checkEssential(): void {
    if (!this._prefix) {
      throw new LoggerError().needPrefix();
    }

    if (!this._disk) {
      throw new LoggerError().diskNotConfigured('save');
    }
  }

  private static instance: Storage;

  static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
}
