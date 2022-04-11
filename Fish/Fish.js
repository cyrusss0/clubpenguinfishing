/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Fish extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("swim1", "./Fish/costumes/swim1.png", { x: 416, y: 160 }),
      new Costume("swim2", "./Fish/costumes/swim2.png", { x: 356, y: 152 }),
      new Costume("swim3", "./Fish/costumes/swim3.png", { x: 324, y: 152 }),
      new Costume("eat1", "./Fish/costumes/eat1.png", { x: 416, y: 160 }),
      new Costume("eat2", "./Fish/costumes/eat2.png", { x: 356, y: 152 }),
      new Costume("eat3", "./Fish/costumes/eat3.png", { x: 324, y: 267 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone3)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      yield* this.wait(1 + (this.stage.vars.endStatus == "soon") * 2);
      if (this.stage.vars.caughtthefish == 0) {
        this.createClone();
      }
      yield;
    }
  }

  *startAsClone() {
    while (true) {
      for (let i = 0; i < 2; i++) {
        yield* this.wait(0.1);
        this.costumeNumber += 1;
        yield;
      }
      for (let i = 0; i < 2; i++) {
        yield* this.wait(0.1);
        this.costume = this.costumeNumber - 1;
        yield;
      }
      if (
        Math.hypot(
          this.sprites["Hook"].x - this.x,
          this.sprites["Hook"].y - this.y
        ) < 200 &&
        this.stage.vars.hookStatus == "Active"
      ) {
        this.costume = "eat1";
      } else {
        this.costume = "swim1";
      }
      yield;
    }
  }

  *whenIReceiveStopall() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }

  *whenIReceiveAnimation() {
    this.visible = false;
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *startAsClone2() {
    while (true) {
      if (
        this.touching(this.sprites["Hook"].andClones()) &&
        (this.sprites["Hook"].costumeNumber == 4 ||
          this.sprites["Hook"].costumeNumber == 5)
      ) {
        this.broadcast("Putafish");
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveStopall2() {
    this.deleteThisClone();
  }

  *startAsClone3() {
    this.goto(-280, this.random(-163, 40));
    this.direction = 90;
    this.visible = true;
    while (!(this.x > 240)) {
      this.x += 5;
      yield;
    }
    this.deleteThisClone();
  }
}
