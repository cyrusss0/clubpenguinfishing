/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Shark extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("fin", "./Shark/costumes/fin.png", { x: 246, y: -112 }),
      new Costume("mouthCLOSED", "./Shark/costumes/mouthCLOSED.png", {
        x: 456,
        y: 224
      }),
      new Costume("mouthOPEN", "./Shark/costumes/mouthOPEN.png", {
        x: 456,
        y: 224
      })
    ];

    this.sounds = [new Sound("Rain.mp3", "./Shark/sounds/Rain.mp3.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
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
    while (!(this.stage.vars.endStatus == "soon")) {
      this.visible = false;
      yield* this.wait(this.random(10, 15));
      if (!(this.stage.vars.endStatus == "soon")) {
        this.costume = "fin";
        this.goto(264, -135);
        this.size = 25;
        this.visible = true;
        yield* this.startSound("Rain.mp3");
        while (!(this.x < -200)) {
          this.x += -10;
          yield;
        }
        this.visible = false;
        yield* this.wait(1);
        this.costume = "mouthCLOSED";
        this.size = 50;
        this.goto(-350, this.random(-90, 0));
        this.visible = true;
        yield* this.startSound("Rain.mp3");
        for (let i = 0; i < 70; i++) {
          this.x += 10;
          if (
            Math.hypot(
              this.sprites["Hook"].x - this.x,
              this.sprites["Hook"].y - this.y
            ) < 200 &&
            this.stage.vars.hookStatus == "Active"
          ) {
            this.costume = "mouthOPEN";
          } else {
            this.costume = "mouthCLOSED";
          }
          yield;
        }
      }
      this.visible = false;
      yield;
    }
  }

  *whenIReceiveAnimation() {
    this.visible = false;
  }
}
