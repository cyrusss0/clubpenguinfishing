/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Can extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("empty", "./Can/costumes/empty.png", { x: 268, y: 236 }),
      new Costume("worms1", "./Can/costumes/worms1.png", { x: 268, y: 236 }),
      new Costume("worms2", "./Can/costumes/worms2.png", { x: 268, y: 236 }),
      new Costume("worms3", "./Can/costumes/worms3.png", { x: 268, y: 236 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      )
    ];

    this.vars.driftvalue = 0;
  }

  *whenGreenFlagClicked() {
    this.size = 30;
    this.visible = true;
    this.stage.vars.lives = 3;
    while (true) {
      this.costume = this.stage.vars.lives + 1;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.goto(0, 100);
    while (true) {
      yield* this.wait(this.random(140, 150) / 10);
      if (this.stage.vars.lives < 3) {
        this.createClone();
      }
      yield;
    }
  }

  *whenIReceiveStopall() {
    this.deleteThisClone();
  }

  *whenIReceiveStopall2() {
    /* TODO: Implement stop other scripts in sprite */ null;
    if (this.stage.vars.endStatus == "Out of lives!") {
      this.size = 60;
      this.goto(0, 0);
    } else {
      this.visible = false;
    }
  }

  *startAsClone() {
    this.costume = "worms1";
    this.goto(-240, this.random(51, -158));
    this.vars.driftvalue = 0;
    this.visible = true;
    while (!(this.x > 230)) {
      this.x += 6;
      this.vars.driftvalue += this.random(-2, 2);
      this.y += this.vars.driftvalue;
      if (this.y > 40) {
        this.y += this.vars.driftvalue * -1;
      }
      if (this.touching(this.sprites["Hook"].andClones())) {
        this.stage.vars.lives += 1;
        this.deleteThisClone();
      }
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveAnimation() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }
}
