# responsive-native

<h3>A responsive utility toolkit for React Native </h3> 

## Contents

- [Why use responsive-native ?](#why-use-responsive-native-)
- [Installation](#installation)
- [Provider](#provider)
  - [ScreenProvider](#screenprovider)
    - [baseFontSize](#basefontsize)
- [Hooks](#hooks)
  - [useRem](#userem)
  - [useMediaQuery](#usemediaquery)
  - [useBreakpointValue](#usebreakpointvalue)
  - [useScreen](#usescreen)
- [Integration](#integration)
  - [styled-components](#styled-components)
    - [Typescript](#typescript)
    - [Usage](#usage)
- [Contributing](#contributing)
  - [Contribution Guidelines](#contribution-guidelines)
- [License](#license)


## Why use responsive-native ?

Responsive applications is a big challenge for developers. Mobile devices have different pixel dimensions and density, so using the pixel unit ('px') can cause elements of your application to have different sizes than expected. iPhones, for example, have a higher pixel density than android phones, in practice, if you use `16px` in a text, on android this text will look much larger than on the iPhone.

The **responsive-native** library proposes to solve this problem by converting this value from `px` to `rem`. The value in rem use some variables such as device width and height, thus providing a much more proportional interface, whether on small android devices or iPads.


## Installation

```sh
yarn add responsive-native react-native-safe-area-context
```

_The lib `react-native-safe-area-context` must be installed._


## Provider

### ScreenProvider

**responsive-native** provides the `ScreenProvider`, it should be used at the top of your app. Then all React child components of the provider will be able to consume the provided data.

#### baseFontSize

You can still pass `baseFontSize` as a **prop** to the provider. This prop corresponds to the value of `1rem`, by default `1rem = 16px`, but depending on your layout, if you use multiple spacing of 5, for example, passing `baseFontSize` as `5` might make development easier.

```js
import { ScreenProvider } from 'responsive-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ScreenProvider baseFontSize={16}>
        { ... }
      </ScreenProvider>
    </SafeAreaProvider>
  )
}
```

_**ScreenProvider** depends on  `SafeAreaProvider`, from [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context), then put `SafeAreaProvider` as the ScreenProvider wrapper._

## Hooks

### useRem

Transforms a `pixel` value to `rem`.

`useRem` uses some variables such as the dimensions and accessibility preferences of the device, for the development of more proportional interfaces independent of the device.

`useRem` receives as first param the value in pixel that will be converted. The second value will be the `shouldScale`, it's a boolean that tells if the fontScale should be used in the conversion.

_You can know a little more about `fontScale` [here](https://reactnative.dev/docs/pixelratio#getfontscale)_

```js
export function Component() {
  const rem = useRem();

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: rem(1.5) }]}>Hello World!</Text>
    </View>
  );
}

```

### useMediaQuery

Returns `true` if the conditions match the device.

`useMediaQuery` receive as params:
```ts
{
  platform: 'ios' | 'android' | 'web' | 'windows' | 'macos';
  minBreakpoint: 'sm' | 'md' | 'lg' | 'xlg';
  maxBreakpoint: 'sm' | 'md' | 'lg' | 'xlg';
}
```

### useBreakpointValue

Returns the value for the device's breakpoint.

You can pass different values for your interface to adapt to devices of different sizes. `useBreakpointValue` can take any value, including JSX elements. The `base` value is required and will be returned if the device breakpoint is not set to return.

```js
export function Component() {
  const text = useBreakpointValue({
    base: "I don't know what my BP is :(",
    sm: "I'm a small device",
    md: "I'm a medium device",
    lg: "I'm a large device",
    xlg: "I'm a very large device",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
```

### useScreen

Returns an object with important information for application responsiveness.

```ts
{
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  breakpoint: {
    size: 'sm' | 'md' | 'lg' | 'xlg';
    maxWidth: number;
  };
  pixelRatio: number;
  fontScaleFactor: number;
  baseFontSize: number;
}
```

## Integration

### styled-components

If you use `styled-components`, you can integrate **responsive-native** functionality into your `ThemeProvider`, 
just create a new provider based on this [example](https://gist.github.com/fhugoduarte/60d3c898ee40944e99af57f53121ec90#file-themeprovider-tsx) and use it instead of the standard styled-components `ThemeProvider`.

#### Typescript

If you use **typescript**, you will have to add the new theme properties in the fonts of the stylized components, just follow the [example](https://gist.github.com/fhugoduarte/60d3c898ee40944e99af57f53121ec90#file-styled-d-ts)

#### Usage

```js
import styled from 'styled-components/native';

export const Container = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(12)}px;
`;

```

_I know, this is not a short syntax, so we provide a [snippet](https://gist.github.com/fhugoduarte/60d3c898ee40944e99af57f53121ec90#file-rem-code-snippets) 
that you can add in VSCode, so just type 'rem' and it will complete  for you :v:_

## Contributing

Thank you for being interested in making this package better. We encourage everyone to help improve this project with new features, bug fixes, or performance improvements. Please take a little bit of your time to read our guide to make this process faster and easier.

### Contribution Guidelines

To understand how to submit an issue, commit and create pull requests, check our [Contribution Guidelines](/CONTRIBUTING.md).

## License

MIT License © [Diego Fernandes](https://github.com/diego3g)
