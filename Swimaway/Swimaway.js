/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Swimaway extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("swim1", "./Swimaway/costumes/swim1.png", { x: 416, y: 160 }),
      new Costume("swim2", "./Swimaway/costumes/swim2.png", { x: 356, y: 152 }),
      new Costume("swim3", "./Swimaway/costumes/swim3.png", { x: 324, y: 152 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Swimavvay" },
        this.whenIReceiveSwimavvay
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      yield* this.wait(0.1);
      this.costumeNumber += 1;
      yield;
    }
  }

  *whenIReceiveSwimavvay() {
    this.visible = true;
    this.goto(this.sprites["Hook"].x, this.sprites["Hook"].y);
    this.direction = 135;
    this.direction += this.random(-30, 30);
    while (!this.touching(this.sprites[undefined].andClones())) {
      this.move(10);
      yield;
    }
    for (let i = 0; i < 4; i++) {
      this.move(10);
      yield;
    }
    this.visible = false;
  }

  *whenIReceiveStopall() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }
}
