import { mount } from "enzyme";
import * as lib from "../lib";
import { ReactSVGInjector } from "../lib/ReactSvgInjector";
import { Mutate } from "../lib/Mutate";
import fs from "fs";
import path from "path";
import React from "react";
import sinon from "sinon";

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
    it("is expected to export ReactSVGInjector and Mutate", () => {
      expect(lib.ReactSVGInjector).toBeDefined();
      expect(lib.Mutate).toBeDefined();
    });
  });

  // @TODO: until this is released, we can't actually test the API changes: https://github.com/airbnb/enzyme/pull/1513
});
