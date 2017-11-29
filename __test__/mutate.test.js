import React from 'react';
import { shallow } from 'enzyme';
import ReactSVGInjector from '../lib/react-svg-injector';
import Mutate from '../lib/mutate';

describe('Mutate', () => {
  it('renders null', () => {
    const mutate = shallow(<Mutate selector="g" />);
    expect(mutate.equals(null)).toBeTruthy();
  });

  it('renders null', () => {
    const onClick = jest.fn();
    const mutate = shallow(<Mutate selector="g" onClick={onClick} />);
    expect(mutate.equals(null)).toBeTruthy();
  });
});
