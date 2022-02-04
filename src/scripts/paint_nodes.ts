export enum PaintMode {
  Blank = "blank",
  Start = "start",
  End = "end",
  Wall = "wall",
}

export default class PaintManager {
  static mode = PaintMode.Blank;

  constructor() {
    this.init();
  }

  init() {
    document.addEventListener("keypress", (e: KeyboardEvent) => {
      switch (e.code) {
        case "Digit1":
          PaintManager.mode = PaintMode.Blank;
          break;
        case "Digit2":
          PaintManager.mode = PaintMode.Start;
          break;
        case "Digit3":
          PaintManager.mode = PaintMode.End;
          break;
        case "Digit4":
          PaintManager.mode = PaintMode.Wall;
          break;
      }
    });
  }
}
