/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Mullet extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("open1", "./Mullet/costumes/open1.png", { x: 428, y: 226 }),
      new Costume("open2", "./Mullet/costumes/open2.png", { x: 456, y: 226 }),
      new Costume("open3", "./Mullet/costumes/open3.png", { x: 388, y: 226 }),
      new Costume("reg1", "./Mullet/costumes/reg1.png", { x: 428, y: 226 }),
      new Costume("reg2", "./Mullet/costumes/reg2.png", { x: 456, y: 226 }),
      new Costume("reg2BLINK", "./Mullet/costumes/reg2BLINK.png", {
        x: 456,
        y: 226
      }),
      new Costume("reg3", "./Mullet/costumes/reg3.png", { x: 388, y: 226 }),
      new Costume("reg4", "./Mullet/costumes/reg4.png", { x: 388, y: 226 }),
      new Costume("reg5", "./Mullet/costumes/reg5.png", { x: 388, y: 226 })
    ];

    this.sounds = [new Sound("pop", "./Mullet/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.restartTimer();
    this.visible = false;
    this.size = 25;
    this.effects.ghost = 90;
    this.costume = "reg1";
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
    this.goto(305, -50);
    this.direction = -90;
    yield* this.wait(90);
    if (!(this.stage.vars.lives == 0)) {
      this.stage.vars.endStatus = "soon";
      this.visible = true;
      for (let i = 0; i < 35; i++) {
        this.move(15);
        yield* this.wait(0.1);
        if (this.costumeNumber == 4 || this.costumeNumber == 7) {
          this.costumeNumber += 1;
        } else {
          if (this.costumeNumber == 5) {
            this.costume = "reg3";
          } else {
            this.costume = "reg1";
          }
        }
        yield;
      }
      this.visible = false;
      this.stage.vars.caughtthefish = 0.5;
      this.size = 50;
      this.effects.ghost = 60;
      /* TODO: Implement looks_goforwardbackwardlayers */ null;
      this.goto(-305, -60);
      this.direction = 90;
      yield* this.wait(2);
      this.visible = true;
      for (let i = 0; i < 35; i++) {
        this.move(15);
        yield* this.wait(0.1);
        if (this.costumeNumber == 4 || this.costumeNumber == 7) {
          this.costumeNumber += 1;
        } else {
          if (this.costumeNumber == 5) {
            this.costume = "reg3";
          } else {
            this.costume = "reg1";
          }
        }
        yield;
      }
      this.visible = false;
      this.size = 100;
      this.effects.ghost = 0;
      /* TODO: Implement looks_goforwardbackwardlayers */ null;
      this.goto(350, -240);
      this.direction = -90;
      yield* this.wait(2);
      this.visible = true;
      for (let i = 0; i < 70; i++) {
        this.move(10);
        yield;
      }
      this.visible = false;
      this.size = 100;
      this.effects.ghost = 0;
      /* TODO: Implement looks_goforwardbackwardlayers */ null;
      this.goto(-350, -60);
      this.direction = 90;
      yield* this.wait(2);
      this.visible = true;
      for (let i = 0; i < 10; i++) {
        this.move(10);
        yield* this.wait(0.1);
        if (this.costumeNumber == 4 || this.costumeNumber == 7) {
          this.costumeNumber += 1;
        } else {
          if (this.costumeNumber == 5) {
            this.costume = "reg3";
          } else {
            this.costume = "reg1";
          }
        }
        yield;
      }
      this.costume = "reg2BLINK";
      for (let i = 0; i < 2; i++) {
        this.move(10);
        yield* this.wait(0.1);
        yield;
      }
      this.costume = "reg1";
      for (let i = 0; i < 50; i++) {
        this.move(10);
        yield* this.wait(0.1);
        if (
          this.costumeNumber == 4 ||
          this.costumeNumber == 7 ||
          this.costumeNumber == 1 || this.costumeNumber == 2
        ) {
          this.costumeNumber += 1;
        } else {
          if (this.costumeNumber == 5) {
            this.costume = "reg3";
          } else {
            if (this.costumeNumber == 8) {
              this.costume = "reg1";
            } else {
              this.costume = "open1";
            }
          }
        }
        if (
          Math.hypot(
            this.sprites["Hook"].x - this.x,
            this.sprites["Hook"].y - this.y
          ) < 300 &&
          (this.sprites["Hook"].costumeNumber == 2 ||
            this.sprites["Hook"].costumeNumber == 3) &&
          this.costumeNumber > 3
        ) {
          this.costume = "open1";
        }
        if (
          this.costumeNumber < 4 &&
          this.touching(this.sprites["Hook"].andClones())
        ) {
          this.stage.vars.caughtthefish = 1;
          this.broadcast("animation");
          this.visible = false;
          this.stage.vars.score += 25;
          return;
        }
        yield;
      }
      this.costume = "reg2BLINK";
      for (let i = 0; i < 2; i++) {
        this.move(10);
        yield* this.wait(0.1);
        yield;
      }
      this.visible = false;
    }
  }
}
