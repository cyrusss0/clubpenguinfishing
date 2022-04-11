/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Krab extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("krab1", "./Krab/costumes/krab1.png", { x: 277, y: 88 }),
      new Costume("krab2", "./Krab/costumes/krab2.png", { x: 306, y: 69 }),
      new Costume("krab3", "./Krab/costumes/krab3.png", { x: 296, y: 78 }),
      new Costume("crabREACH", "./Krab/costumes/crabREACH.png", {
        x: 306,
        y: 69
      }),
      new Costume("crabBITE", "./Krab/costumes/crabBITE.png", { x: 306, y: 69 })
    ];

    this.sounds = [new Sound("pop", "./Krab/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (!(this.stage.vars.endStatus == "soon")) {
      yield* this.wait(this.random(5, 6));
      if (!(this.stage.vars.endStatus == "soon")) {
        this.costume = "krab1";
        this.goto(-252 + this.random(0, 1) * 504, 57);
        this.visible = true;
        if (this.x == -252) {
          this.direction = 90;
          while (!(Math.round(this.x / 10) * 10 == 0)) {
            this.move(5);
            if (this.costumeNumber == 1 || this.costumeNumber == 2) {
              this.costumeNumber += 1;
            } else {
              this.costume = "krab1";
            }
            yield;
          }
          this.costume = "krab3";
          if (this.stage.vars.hookStatus == "Active") {
            yield* this.wait(0.5);
            this.costume = "crabREACH";
            yield* this.wait(0.5);
            this.costume = "crabBITE";
            if (
              this.sprites["Hook"].y < 57 &&
              this.stage.vars.hookStatus == "Active"
            ) {
              this.broadcast("cut");
            }
            yield* this.wait(0.5);
            this.costume = "krab3";
          }
          while (!(Math.round(this.x / 10) * 10 == -250)) {
            this.move(-5);
            if (this.costumeNumber == 1 || this.costumeNumber == 2) {
              this.costumeNumber += 1;
            } else {
              this.costume = "krab1";
            }
            yield;
          }
        } else {
          this.direction = -90;
          while (!(Math.round(this.x / 10) * 10 == 120)) {
            this.move(5);
            if (this.costumeNumber == 1 || this.costumeNumber == 2) {
              this.costumeNumber += 1;
            } else {
              this.costume = "krab1";
            }
            yield;
          }
          this.costume = "krab3";
          if (this.stage.vars.hookStatus == "Active") {
            yield* this.wait(0.5);
            this.costume = "crabREACH";
            yield* this.wait(0.5);
            this.costume = "crabBITE";
            if (
              this.sprites["Hook"].y < 57 &&
              this.stage.vars.hookStatus == "Active"
            ) {
              this.broadcast("cut");
            }
            yield* this.wait(0.5);
            this.costume = "krab3";
          }
          while (!(Math.round(this.x / 10) * 10 == 250)) {
            this.move(-5);
            if (this.costumeNumber == 1 || this.costumeNumber == 2) {
              this.costumeNumber += 1;
            } else {
              this.costume = "krab1";
            }
            yield;
          }
        }
        this.visible = false;
      }
      this.visible = false;
      yield;
    }
  }

  *whenIReceiveStopall() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }

  *whenIReceiveAnimation() {
    this.visible = false;
  }
}
