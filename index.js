import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Hook from "./Hook/Hook.js";
import Line from "./Line/Line.js";
import Penguin from "./Penguin/Penguin.js";
import Fish from "./Fish/Fish.js";
import ScoreRenderer from "./ScoreRenderer/ScoreRenderer.js";
import Swimaway from "./Swimaway/Swimaway.js";
import Shark from "./Shark/Shark.js";
import Can from "./Can/Can.js";
import Krab from "./Krab/Krab.js";
import Fishyfish from "./Fishyfish/Fishyfish.js";
import Knock from "./Knock/Knock.js";
import Mullet from "./Mullet/Mullet.js";

const stage = new Stage({ costumeNumber: 3 });

const sprites = {
  Hook: new Hook({
    x: 60,
    y: -64,
    direction: 90,
    costumeNumber: 4,
    size: 20,
    visible: false
  }),
  Line: new Line({
    x: 60,
    y: -64,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Penguin: new Penguin({
    x: 209,
    y: 94,
    direction: 90,
    costumeNumber: 2,
    size: 95,
    visible: false
  }),
  Fish: new Fish({
    x: 65.23492450537519,
    y: -203.90862405286435,
    direction: 178,
    costumeNumber: 1,
    size: 20.00000000000002,
    visible: false
  }),
  ScoreRenderer: new ScoreRenderer({
    x: -130,
    y: 153,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Swimaway: new Swimaway({
    x: 203.3948202423266,
    y: -182.65121550819623,
    direction: 131,
    costumeNumber: 1,
    size: 20.00000000000002,
    visible: false
  }),
  Shark: new Shark({
    x: -206,
    y: -135,
    direction: 90,
    costumeNumber: 1,
    size: 25,
    visible: false
  }),
  Can: new Can({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 60,
    visible: true
  }),
  Krab: new Krab({
    x: 122,
    y: 57,
    direction: -90,
    costumeNumber: 5,
    size: 35.000000000000014,
    visible: false
  }),
  Fishyfish: new Fishyfish({
    x: -1,
    y: -36,
    direction: -90,
    costumeNumber: 2,
    size: 50.000000000000014,
    visible: false
  }),
  Knock: new Knock({
    x: 30,
    y: -71.2991514893608,
    direction: 83,
    costumeNumber: 1,
    size: 55.00000000000001,
    visible: false
  }),
  Mullet: new Mullet({
    x: 265,
    y: -50,
    direction: -90,
    costumeNumber: 4,
    size: 25,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
