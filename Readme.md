# ReactSvgInjector

## Example

```jsx
import React from "react";
import { ReactSvgInjector, Mutate } from "react-svg-injector";
import logo from "./logo.svg";

const Logo = props => (
  <ReactSvgInjector src={logo} className="App-logo">
    <Mutate selector="g" fill="#BADA55" />
  </ReactSvgInjector>
);

export default Logo;
```

## API

ReactSvgInjector exports 2 React Components `ReactSvgInjector` and `Mutate`.

### ReactSvgInjector

#### props

| name          | type     | description                                                                                                                   |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| callback(svg) | function | callback which passes the svg element once it's been loaded                                                                   |
| evalScripts   | string   | option to tell ReactSvgInjector to eval scripts inside the svg element options are: `always`, `once`, `never` default: `once` |
| \*            | any      | all other props that are passed will be merged into the svg element                                                           |

### Mutate

#### props

| name     | type   | description                                                                               |
| -------- | ------ | ----------------------------------------------------------------------------------------- |
| selector | string | the selector of the node to modify                                                        |
| \*       | any    | all other props that are passed will be merged into the element that matches the selector |
