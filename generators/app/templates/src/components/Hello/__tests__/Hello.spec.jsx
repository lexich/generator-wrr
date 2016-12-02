/* globals describe, it, expect */
import renderer from "react-test-renderer";
import React from "react";
import Hello from "../";

function createNodeMock(element) {
  return {
    setAttribute(name, value) {}
  }
}

describe("Hello component", ()=> {
  it("default args", ()=> {
    const component = renderer.create(
      <Hello />, { createNodeMock }
    );
    expect(component).toMatchSnapshot();
  });

  it("check src args", ()=> {
    const component = renderer.create(
      <Hello src="best-seal.jpg" />, { createNodeMock }
    );
    expect(component).toMatchSnapshot();
  });
});
