/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Line extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Line/costumes/costume2.png", { x: 0, y: 0 }),
      new Costume("costume1", "./Line/costumes/costume1.png", { x: 6, y: 16 })
    ];

    this.sounds = [new Sound("ESPARK1", "./Line/sounds/ESPARK1.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(Trigger.BROADCAST, { name: "shock" }, this.whenIReceiveShock),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.penColor = Color.rgb(0, 0, 0);
    this.penDown = true;
    while (true) {
      this.clearPen();
      this.goto(60, 165);
      this.goto(
        60,
        this.sprites["Hook"].y +
          (this.sprites["Hook"].costumeNumber == 2 ||
            this.sprites["Hook"].costumeNumber == 3) *
            35
      );
      yield* this.wait(0.005);
      yield;
    }
  }

  *whenIReceiveStopall() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.penDown = false;
    this.clearPen();
  }

  *whenIReceiveShock() {
    yield* this.startSound("ESPARK1");
    this.penColor = Color.rgb(255, 232, 73);
    yield* this.wait(1);
    this.penColor = Color.rgb(0, 0, 0);
  }

  *whenIReceiveAnimation() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
    this.penDown = false;
    this.clearPen();
  }

  *whenGreenFlagClicked2() {
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      yield;
    }
  }
}
