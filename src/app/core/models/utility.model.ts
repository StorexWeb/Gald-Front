
export class Action {
  public action?: String;
  public _id?: String;
  constructor(_id: String, action: String) {
    this._id = _id || null;
    this.action = action || null;
  }
}

export class NotaAzione {
    nota?: String;
    azione?: Action;
}

export class FileAzione {
    file?: File;
    azione?: Action;
}
