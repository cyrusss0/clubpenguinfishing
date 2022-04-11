/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Thumbnail", "./Stage/costumes/Thumbnail.png", {
        x: 480,
        y: 360
      }),
      new Costume("backdrop1", "./Stage/costumes/backdrop1.png", {
        x: 480,
        y: 360
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.png", {
        x: 480,
        y: 360
      }),
      new Costume("backdrop3", "./Stage/costumes/backdrop3.png", {
        x: 480,
        y: 360
      }),
      new Costume("backdrop4", "./Stage/costumes/backdrop4.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet1", "./Stage/costumes/mullet1.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet2", "./Stage/costumes/mullet2.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet3", "./Stage/costumes/mullet3.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet4", "./Stage/costumes/mullet4.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet5", "./Stage/costumes/mullet5.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet6", "./Stage/costumes/mullet6.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet7", "./Stage/costumes/mullet7.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet8PULL", "./Stage/costumes/mullet8PULL.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet8PULL2", "./Stage/costumes/mullet8PULL2.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet8PULL3", "./Stage/costumes/mullet8PULL3.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet8PULL4", "./Stage/costumes/mullet8PULL4.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet8PULL5", "./Stage/costumes/mullet8PULL5.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet8PULL6", "./Stage/costumes/mullet8PULL6.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet8PULL7", "./Stage/costumes/mullet8PULL7.png", {
        x: 480,
        y: 360
      }),
      new Costume("mullet8PULL8", "./Stage/costumes/mullet8PULL8.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("Ice Fishing", "./Stage/sounds/Ice Fishing.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      )
    ];

    this.vars.prevy = -64;
    this.vars.score = 9;
    this.vars.hookStatus = "Cut";
    this.vars.lives = 0;
    this.vars.caughtthefish = 0;
    this.vars.endStatus = "Out of lives!";
  }

  *whenGreenFlagClicked() {
    this.costume = "backdrop1";
    this.vars.score = 0;
    while (true) {
      yield* this.playSoundUntilDone("Ice Fishing");
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.vars.endStatus = "Not happened yet!";
    this.vars.caughtthefish = 0;
    this.restartTimer();
    while (
      !(
        this.timer > 120 ||
        (this.vars.lives == 0 && !(this.vars.hookStatus == "Active"))
      )
    ) {
      yield;
    }
    if (this.vars.lives == 0) {
      this.vars.endStatus = "Out of lives!";
      /* TODO: Implement looks_switchbackdroptoandwait */ null;
    } else {
      if (this.vars.caughtthefish == 1) {
        this.vars.endStatus = "Caught the big fish!";
        /* TODO: Implement looks_switchbackdroptoandwait */ null;
      } else {
        this.vars.endStatus = "Too late!";
        /* TODO: Implement looks_switchbackdroptoandwait */ null;
      }
    }
    this.broadcast("stopall");
  }

  *whenIReceiveAnimation() {
    this.costume = "mullet1";
    for (let i = 0; i < 14; i++) {
      yield* this.wait(0.2);
      this.costumeNumber += 1;
      yield;
    }
  }
}
