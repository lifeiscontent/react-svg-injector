# ReactSVGInjector

## Example

```jsx
import React from 'react';
import { ReactSVGInjector, Mutate } from 'react-svg-injector';
import logo from './logo.svg';

const Logo = props => (
  <ReactSVGInjector src={logo} className="App-logo">
    <Mutate selector="g" fill="#BADA55" />
  </ReactSVGInjector>
);

export default Logo;
```

## API

ReactSVGInjector exports 2 React Components `ReactSVGInjector` and `Mutate`.

### ReactSVGInjector

#### props

| name          | type     | description                                                                                                                   |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| callback(svg) | function | callback which passes the svg element once it's been loaded                                                                   |
| evalScripts   | string   | option to tell ReactSVGInjector to eval scripts inside the svg element options are: `always`, `once`, `never` default: `once` |
| \*            | any      | all other props that are passed will be merged into the svg element                                                           |

### Mutate

#### props

| name     | type   | description                                                                               |
| -------- | ------ | ----------------------------------------------------------------------------------------- |
| selector | string | the selector of the node to modify                                                        |
| \*       | any    | all other props that are passed will be merged into the element that matches the selector |
