import { render } from "react-testing-library";
import React from "react";
import sinon from "sinon";
import { Mutate } from "../src/Mutate";
import { ReactSvgInjector } from "../src/ReactSvgInjector";
import * as src from "../src";

describe("index", () => {
  let container;
  let xhr;
  let requests = [];
  const TestImpl = props => (
    <ReactSvgInjector
      src="https://rawgit.com/lifeiscontent/react-svg-injector/master/__fixtures__/logo.svg"
      {...props}
    >
      <Mutate selector="g" fill="red" />
    </ReactSvgInjector>
  );

  beforeEach(() => {
    container = document.body.appendChild(document.createElement("div"));
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = xhr => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    requests = [];
    xhr.restore();
    document.body.removeChild(container);
    jest.clearAllTimers();
  });

  describe("exports", () => {
    it("is expected to export ReactSvgInjector and Mutate", () => {
      expect(src.ReactSvgInjector).toBeDefined();
      expect(src.Mutate).toBeDefined();
    });
  });

  // @TODO: until this is released, we can't actually test the API changes: https://github.com/airbnb/enzyme/pull/1513
  describe("integration", () => {
    test("react-testing-library works!", done => {
      const { container, debug } = render(
        <TestImpl
          callback={svg => {
            console.log(svg);
            done();
          }}
        />
      );
      expect(container.getElementsByTagName("svg")).toHaveLength(1);
      expect(container.getElementsByTagName("g").getAttribute("fill")).toBe(
        "red"
      );
    });
  });
});
