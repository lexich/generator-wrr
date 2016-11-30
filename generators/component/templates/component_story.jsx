"use strict";

import React from "react";
import { storiesOf } from "@kadira/storybook";
import <%= props.componentName %> from ".";

storiesOf("Component <%= props.componentName %>", module)
  .addWithInfo("<%= props.componentName %> with default props", ()=> (
    <<%= props.componentName %> />
  ));
