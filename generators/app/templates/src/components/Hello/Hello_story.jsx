import React from "react";
import { storiesOf } from "@kadira/storybook";
import Hello from ".";

storiesOf("Hello", module)
  .add("Hello", () => (
    <Hello />
  ))
  .add("Hello with src", ()=> (
    <Hello src={"http://placehold.it/350x150"} />
  ));
