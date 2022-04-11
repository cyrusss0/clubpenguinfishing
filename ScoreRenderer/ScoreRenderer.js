/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ScoreRenderer extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("0", "./ScoreRenderer/costumes/0.png", { x: 13, y: 20 }),
      new Costume("1", "./ScoreRenderer/costumes/1.png", { x: 9, y: 15 }),
      new Costume("2", "./ScoreRenderer/costumes/2.png", { x: 19, y: 13 }),
      new Costume("3", "./ScoreRenderer/costumes/3.png", { x: 14, y: 14 }),
      new Costume("costume1", "./ScoreRenderer/costumes/costume1.png", {
        x: 15,
        y: 14
      }),
      new Costume("costume2", "./ScoreRenderer/costumes/costume2.png", {
        x: 13,
        y: 15
      }),
      new Costume("costume3", "./ScoreRenderer/costumes/costume3.png", {
        x: 14,
        y: 16
      }),
      new Costume("costume4", "./ScoreRenderer/costumes/costume4.png", {
        x: 17,
        y: 18
      }),
      new Costume("costume5", "./ScoreRenderer/costumes/costume5.png", {
        x: 15,
        y: 14
      }),
      new Costume("costume6", "./ScoreRenderer/costumes/costume6.png", {
        x: 13,
        y: 13
      })
    ];

    this.sounds = [new Sound("pop", "./ScoreRenderer/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "message1" },
        this.whenIReceiveMessage1
      )
    ];

    this.vars.counter = 1;
    this.vars.prevscore = 9;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      while (!!(this.stage.vars.score == this.vars.prevscore)) {
        yield;
      }
      this.broadcast("message1");
      this.vars.counter = 0;
      this.goto(-145, 153);
      yield* this.wait(0.1);
      for (let i = 0; i < this.stage.vars.score.length; i++) {
        this.vars.counter += 1;
        this.createClone();
        this.x += 15;
        yield;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.vars.prevscore = "an incorrect value";
    while (true) {
      yield* this.wait(0.05);
      this.vars.prevscore = this.stage.vars.score;
      yield;
    }
  }

  *startAsClone() {
    this.costume = this.stage.vars.score[this.vars.counter - 1] + 1;
    this.visible = true;
  }

  *whenIReceiveMessage1() {
    this.deleteThisClone();
  }
}
