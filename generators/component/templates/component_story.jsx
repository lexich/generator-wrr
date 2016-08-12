import React from "react";
import { storiesOf } from "@kadira/storybook";
import <%= props.componentName %> from ".";

storiesOf("<%= props.componentName %>", module)
  .add("<%= props.componentName %> with default props", ()=> (
    <<%= props.componentName %> />
  ));
