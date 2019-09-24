# virkailija-ui-components

[![Build Status](https://travis-ci.org/Opetushallitus/virkailija-ui-components.svg?branch=master)](https://travis-ci.org/Opetushallitus/virkailija-ui-components)

## 📦 Asennus

```bash
npm i @opetushallitus/virkailija-ui-components
```

Asenna myös tarvittaessa vertaisriippuvuudet `react`, `react-dom` ja `styled-components`:

```bash
npm i react react-dom styled-components
```

## ✨ Ominaisuudet

- Kokoelma [TypeScriptillä](https://www.typescriptlang.org/index.html) toteutettuja modulaarisia [react](https://reactjs.org/)-komponentteja
- Tyylit on toteutettu [styled-components]-kirjastolla, jonka avulla käytettävien komponenttien tyylit ladataan automaattisesti
- [Teema](https://github.com/Opetushallitus/virkailija-ui-components/blob/master/src/createTheme/index.ts)-objektissa määriteltyjä arvoja pystyy muokkaamaan ja niitä pääsee helposti käyttämään komponettien tyyleissä [styled-system](https://styled-system.com)-kirjaston avulla

## 🛠️ Käyttö

### Teeman määrittäminen

```javascript
import { ThemeProvider } from 'styled-components';
import createTheme from '@opetushallitus/virkailija-ui-components/createTheme';

const theme = createTheme();

const App = () => <ThemeProvider theme={theme}>// ...</ThemeProvider>;
```

### Komponenttien käyttö

```javascript
import Button from '@opetushallitus/virkailija-ui-components/Button';

ReactDOM.render(<Button />, mountNode);
```

### [system](https://github.com/Opetushallitus/virkailija-ui-components/blob/master/src/system.ts)-funktiot

```javascript
import {
  space,
  flexbox,
  color,
  layout,
  typography,
  shadow,
} from '@opetushallitus/virkailija-ui-components/system';

const Box = styled.div`
  ${space}
  ${flexbox}
  ${color}
  ${layout}
  ${typography}
  ${shadow}
`;

ReactDOM.render(<Box p={2} bg="primary.main" color="white" />, mountNode);
```

Jos kaipaat lisätietoja, [lue tarkempi dokumentaatio](https://styled-system.com) ja tutustu valmiiseen [Box](https://github.com/Opetushallitus/virkailija-ui-components/blob/master/src/Box/index.tsx)-komponenttiin.
