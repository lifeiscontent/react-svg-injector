import { renderIntoDocument, wait } from "react-testing-library";
import React from "react";
import sinon from "sinon";
import { Mutate } from "../src/Mutate";
import { ReactSvgInjector } from "../src/ReactSvgInjector";
import * as src from "../src";

describe("index", () => {
  let container;
  let xhr;
  let requests = [];

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
    it("renders an SVG", async () => {
      const { container, debug } = renderIntoDocument(
        <ReactSvgInjector src="../__fixtures__/logo.svg">
          <Mutate fill="red" selector="g" />
        </ReactSvgInjector>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
