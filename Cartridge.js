export class Cartridge {
  static onReset({ pads, speakers, screens }) {
    this.pads = pads;
    this.speakers = speakers;
    this.screens = screens;

    this.screens[0].setViewBox(0, 0, 64, 48);

    this.msg0 = this.screens[0].addText("first-cartridge", {
      x: 2,
      y: 32,
      colorIds: [null, Math.floor(Math.random() * 7) + 9],
    });

    this.msg1 = this.screens[0].addText("ex-nanaco", {
      x: 2,
      y: 40,
      colorIds: [null, Math.floor(Math.random() * 7) + 1],
    });
  }

  static onFrame() {
    if (this.sfx?.ended) {
      delete this.sfx;
    }
    if (this.pads[0].buttons.b0.pressed) {
      this.msg0.y -= 2;
      if (!this.sfx) {
        this.sfx = this.speakers[0].play([
          [
            { noteNumber: [0, 4, 7, 11, 12][Math.floor(Math.random() * 5)], duration: 8 },
          ]
        ]);
      }
    }
    this.msg0.y += 1;
    this.msg0.y = Math.min(this.msg0.y, 32);

    if (this.pads[0].buttons.b1.pressed) {
      this.msg1.y -= 2;
      if (!this.sfx) {
        this.sfx = this.speakers[0].play([
          [
            { noteNumber: [0, 4, 7, 10, 12][Math.floor(Math.random() * 5)] - 5, duration: 8 },
          ]
        ]);
      }
    }
    this.msg1.y += 1;
    this.msg1.y = Math.min(this.msg1.y, 40);
  }
}
