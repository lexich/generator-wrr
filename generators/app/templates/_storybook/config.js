import { configure, setAddon } from "@kadira/storybook";
import infoAddon from "@kadira/react-storybook-addon-info";

const req = require.context("../src/components", true, /_story\.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

setAddon(infoAddon);
configure(loadStories, module);
