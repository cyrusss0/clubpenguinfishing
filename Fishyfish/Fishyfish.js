/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Fishyfish extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("swim2", "./Fishyfish/costumes/swim2.png", { x: 299, y: 50 }),
      new Costume("swim1", "./Fishyfish/costumes/swim1.png", { x: 248, y: 50 })
    ];

    this.sounds = [new Sound("pop", "./Fishyfish/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      )
    ];
  }

  *whenIReceiveStopall() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    yield* this.wait(3);
    while (!(this.stage.vars.endStatus == "soon")) {
      yield* this.wait(this.random(4, 5));
      this.costume = "swim1";
      this.goto(-252 + this.random(0, 1) * 504, this.random(-130, 26));
      if (
        Math.round(this.x / 40) * 40 == -200 ||
        Math.round(this.x / 40) * 40 == -240
      ) {
        this.direction = 90;
      } else {
        this.direction = -90;
      }
      this.visible = true;
      while (!(Math.round(this.x / 5) * 5 == 60)) {
        this.move(15);
        yield* this.wait(0.3);
        this.costumeNumber += 1;
        yield;
      }
      if (
        this.sprites["Hook"].y < this.y &&
        this.stage.vars.hookStatus == "Active"
      ) {
        this.broadcast("shock");
      }
      while (!this.touching(this.sprites[undefined].andClones())) {
        this.move(15);
        yield* this.wait(0.3);
        this.costumeNumber += 1;
        yield;
      }
      this.visible = false;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (Math.round(this.x / 20) == 12 && this.direction == 90) {
        this.visible = false;
      }
      if (Math.round(this.x / 20) == -12 && this.direction == -90) {
        this.visible = false;
      }
      yield;
    }
  }

  *whenIReceiveAnimation() {
    this.visible = false;
  }
}
