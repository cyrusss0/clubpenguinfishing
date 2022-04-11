/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Hook extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Hook/costumes/costume1.png", {
        x: 100,
        y: 18
      }),
      new Costume("costume2", "./Hook/costumes/costume2.png", {
        x: 346,
        y: 358
      }),
      new Costume("costume3", "./Hook/costumes/costume3.png", {
        x: 196,
        y: 358
      }),
      new Costume("costume4", "./Hook/costumes/costume4.png", {
        x: 100,
        y: 18
      }),
      new Costume("costume5", "./Hook/costumes/costume5.png", { x: 152, y: 18 })
    ];

    this.sounds = [new Sound("bite", "./Hook/sounds/bite.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Putafish" },
        this.whenIReceivePutafish
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4),
      new Trigger(
        Trigger.BROADCAST,
        { name: "stopall" },
        this.whenIReceiveStopall
      ),
      new Trigger(Trigger.BROADCAST, { name: "cut" }, this.whenIReceiveCut),
      new Trigger(Trigger.BROADCAST, { name: "shock" }, this.whenIReceiveShock),
      new Trigger(Trigger.BROADCAST, { name: "Knock" }, this.whenIReceiveKnock),
      new Trigger(
        Trigger.BROADCAST,
        { name: "animation" },
        this.whenIReceiveAnimation
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.hookStatus = "Active";
    this.size = 20;
    while (true) {
      if (
        this.mouse.y <
          161 - (this.costumeNumber == 2 || this.costumeNumber == 3) * 35 &&
        this.mouse.y > -150 &&
        !(this.stage.vars.hookStatus == "Cut")
      ) {
        this.goto(60, this.mouse.y);
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      yield* this.wait(0.05);
      this.stage.vars.prevy = this.y;
      yield;
    }
  }

  *whenIReceivePutafish() {
    this.costume = "costume2";
  }

  *whenGreenFlagClicked3() {
    while (true) {
      yield* this.wait(0.1);
      if (this.costumeNumber == 2) {
        this.costumeNumber += 1;
      }
      yield* this.wait(0.1);
      if (this.costumeNumber == 3) {
        this.costume = "costume2";
      }
      yield;
    }
  }

  *whenGreenFlagClicked4() {
    this.visible = true;
    this.costume = "costume4";
    while (true) {
      if (this.costumeNumber == 4 || this.costumeNumber == 5) {
        if (this.y < this.stage.vars.prevy) {
          this.costume = "costume5";
        } else {
          this.costume = "costume4";
        }
      }
      if (
        this.mouse.down &&
        (this.costumeNumber == 2 || this.costumeNumber == 3)
      ) {
        this.costume = "costume4";
        if (this.touching(Color.rgb(255, 255, 255))) {
          this.broadcast("HappyPenguin");
          this.stage.vars.score += 1;
        } else {
          if (this.stage.vars.hookStatus == "Active") {
            this.broadcast("Swimavvay");
          }
        }
      }
      if (
        this.touching(this.sprites["Shark"].andClones()) &&
        this.sprites["Shark"].costumeNumber == 3
      ) {
        yield* this.startSound("bite");
        this.costume = "costume4";
        this.visible = false;
        this.stage.vars.hookStatus = "Gone";
        this.broadcast("Oh!");
        while (!(this.y > 70 && this.mouse.down)) {
          yield;
        }
        this.stage.vars.lives += -1;
        this.visible = true;
        this.stage.vars.hookStatus = "Active";
      }
      yield;
    }
  }

  *whenIReceiveStopall() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }

  *whenIReceiveCut() {
    if (this.costumeNumber == 3 || this.costumeNumber == 2) {
      this.broadcast("Swimavvay");
    }
    this.visible = false;
    this.stage.vars.hookStatus = "Cut";
    yield* this.wait(0.05);
    while (!this.mouse.down) {
      this.goto(60, 30);
      yield;
    }
    this.stage.vars.lives += -1;
    this.visible = true;
    this.stage.vars.hookStatus = "Active";
    this.costume = "costume2";
  }

  *whenIReceiveShock() {
    this.costume = "costume1";
    this.stage.vars.hookStatus = "Wormless";
    while (!(this.y > 70 && this.mouse.down)) {
      yield;
    }
    this.stage.vars.lives += -1;
    this.costume = "costume4";
    this.stage.vars.hookStatus = "Active";
  }

  *whenIReceiveKnock() {
    this.costume = "costume4";
    this.broadcast("Swimavvay");
  }

  *whenIReceiveAnimation() {
    this.visible = false;
  }
}
