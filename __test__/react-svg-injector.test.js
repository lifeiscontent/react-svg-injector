import { mount } from 'enzyme';
import { sourceSVG, renderedSVG, updatedSVG } from '../__mocks__/svg';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactSVGInjector from '../lib/react-svg-injector';
import sinon from 'sinon';

global.SVGSVGElement = HTMLUnknownElement;

jest.useFakeTimers();
describe('ReactSVGInjector', () => {
  let container;
  let xhr;
  let requests = [];

  beforeEach(() => {
    container = document.body.appendChild(document.createElement('div'));
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

  it('loads the correct SVG and adds the injected-svg class', done => {
    expect(() =>
      mount(
        <ReactSVGInjector
          src="logo.svg"
          callback={svg => {
            expect(svg.parentNode.innerHTML).toEqual(renderedSVG);
            done();
          }}
        />,
        { attachTo: container }
      )
    ).not.toThrow();
    requests[0].respond(200, {}, sourceSVG);
    jest.runAllTimers();
  });

  it('loads and adds the proper class and load from cache', done => {
    expect(() =>
      mount(
        <ReactSVGInjector
          src="logo.svg"
          className="updated-class"
          callback={svg => {
            expect(svg.parentNode.innerHTML).toEqual(updatedSVG);
            done();
          }}
        />,
        { attachTo: container }
      )
    ).not.toThrow();
    expect(requests).toEqual([]);
    jest.runAllTimers();
  });
});
