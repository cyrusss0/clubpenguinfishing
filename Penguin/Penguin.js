/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Penguin extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume4", "./Penguin/costumes/costume4.png", {
        x: 319,
        y: 181
      }),
      new Costume("costume2", "./Penguin/costumes/costume2.png", {
        x: 319,
        y: 181
      }),
      new Costume("SHOCKED", "./Penguin/costumes/SHOCKED.png", {
        x: 356,
        y: 204
      }),
      new Costume("SHOCKED2", "./Penguin/costumes/SHOCKED2.png", {
        x: 332,
        y: 194
      }),
      new Costume("costume5", "./Penguin/costumes/costume5.png", {
        x: 319,
        y: 181
      })
    ];

    this.sounds = [new Sound("pop", "./Penguin/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "HappyPenguin" },
        this.whenIReceiveHappypenguin
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(Trigger.BROADCAST, { name: "shock" }, this.whenIReceiveShock),
      new Trigger(Trigger.BROADCAST, { name: "Oh!" }, this.whenIReceiveOh),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      )
    ];
  }

  *whenIReceiveHappypenguin() {
    this.costume = "costume2";
    yield* this.wait(0.2);
    this.costume = "costume3";
  }

  *whenGreenFlagClicked() {
    this.goto(209, 94);
    this.visible = true;
    this.costume = "costume3";
  }

  *whenIReceiveStopall() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }

  *whenIReceiveShock() {
    for (let i = 0; i < 5; i++) {
      this.costume = "SHOCKED";
      yield* this.wait(0.1);
      this.costume = "SHOCKED2";
      yield* this.wait(0.1);
      yield;
    }
    this.costume = "costume4";
    while (!(this.stage.vars.hookStatus == "Active")) {
      yield;
    }
    this.costume = "costume3";
  }

  *whenIReceiveOh() {
    this.costume = "costume4";
    while (!(this.stage.vars.hookStatus == "Active")) {
      yield;
    }
    this.costume = "costume3";
  }

  *whenIReceiveAnimation() {
    this.visible = false;
  }
}
