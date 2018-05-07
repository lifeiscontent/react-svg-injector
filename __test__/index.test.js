import { mount } from 'enzyme';
import { ReactSVGInjector, Mutate } from '../lib';
import fs from 'fs';
import path from 'path';
import React from 'react';
import sinon from 'sinon';

describe('index', () => {
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

  describe('exports', () => {
    it('is expected to export ReactSVGInjector and Mutate', () => {
      expect(ReactSVGInjector).toBeDefined();
      expect(Mutate).toBeDefined();
    });
  });
});
