/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Knock extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("bUt", "./Knock/costumes/bUt.png", { x: 154, y: 140 }),
      new Costume("costume1", "./Knock/costumes/costume1.png", {
        x: 172,
        y: 160
      })
    ];

    this.sounds = [new Sound("pop", "./Knock/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "KnockGo" },
        this.whenIReceiveKnockgo
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      )
    ];

    this.vars.direction = 5;
    this.vars.driftvalue2 = -1.657260733190924;
    this.vars.startingy = -67;
    this.vars.multiplier = -8.598302978721588;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      yield* this.wait(this.random(3, 10));
      this.broadcast("KnockGo");
      yield;
    }
  }

  *whenIReceiveStopall() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (
        this.touching(this.sprites["Hook"].andClones()) &&
        (this.sprites["Hook"].costumeNumber == 2 ||
          this.sprites["Hook"].costumeNumber == 3)
      ) {
        this.broadcast("Knock");
      }
      yield;
    }
  }

  *whenIReceiveKnockgo() {
    if (this.stage.vars.endStatus == "not happened yet!") {
      this.costume = this.random(1, 2);
      this.goto(-252 + this.random(0, 1) * 504, this.random(-100, 20));
      this.direction += this.random(-179, 180);
      if (
        Math.round(this.x / 40) * 40 == -200 ||
        Math.round(this.x / 40) * 40 == -240
      ) {
        this.vars.direction = 5;
      } else {
        this.vars.direction = -5;
      }
      this.visible = true;
      this.vars.startingy = this.y;
      this.vars.multiplier = this.random(-30.5, 30.5);
      while (!!this.touching(this.sprites[undefined].andClones())) {
        this.x += this.vars.direction;
        this.y =
          Math.sin(this.scratchToRad(this.x)) * this.vars.multiplier +
          this.vars.startingy;
        if (this.y > 20 || this.y < -140) {
          if (this.y > 20) {
            this.y = 20;
          } else {
            this.y = -140;
          }
        }
        yield;
      }
      while (!this.touching(this.sprites[undefined].andClones())) {
        this.x += this.vars.direction;
        this.y =
          Math.sin(this.scratchToRad(this.x)) * this.vars.multiplier +
          this.vars.startingy;
        if (this.y > 20 || this.y < -140) {
          if (this.y > 20) {
            this.y = 20;
          } else {
            this.y = -140;
          }
        }
        yield;
      }
      this.visible = false;
    }
  }

  *whenIReceiveAnimation() {
    this.visible = false;
  }
}
