/* globals describe, it, expect */
import renderer from "react-test-renderer";
import React from "react";
import Hello from "../";

describe("Hello component", ()=> {
  it("default args", ()=> {
    const component = renderer.create(
      <Hello />
    );
    expect(component).toMatchSnapshot();
  });

  it("check src args", ()=> {
    const component = renderer.create(
      <Hello src="best-seal.jpg" />
    );
    expect(component).toMatchSnapshot();
  });
});
