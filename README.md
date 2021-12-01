# virkailija-ui-components

[![Build Status](https://travis-ci.org/Opetushallitus/virkailija-ui-components.svg?branch=master)](https://travis-ci.org/Opetushallitus/virkailija-ui-components)

## Kirjastoa käyttävät Opintopolun palvelut

- [Kouta-ui](https://github.com/opetushallitus/kouta-ui)
- [Varda-rekisterointi](https://github.com/Opetushallitus/varda-rekisterointi)
- [Ehoks-ui](https://github.com/Opetushallitus/ehoks-ui)
- [Uusi Organisaatiopalvelu](https://github.com/Opetushallitus/organisaatio)

## 📦 Asennus

Virkailija-ui-components julkaistaan [OPH:n Nexus-pakettivarastoon](https://artifactory.opintopolku.fi/artifactory/repository/oph-opintopolku-npm/). Npm täytyy konfiguroida käyttämään kyseistä pakettivarastoa OPH:n paketeille. Lisää projektisi [`.npmrc`-tiedostoon](https://docs.npmjs.com/configuring-npm/npmrc.html) rivi:

```bash
@opetushallitus:registry=https://artifactory.opintopolku.fi/artifactory/repository/oph-opintopolku-npm/
```

Nyt kaikki `@opetushallitus`-["skoopin"](https://docs.npmjs.com/using-npm/scope.html) paketit asennetaan Nexus-pakettivarastosta, ja kaikki muut npm:n omasta pakettivarastosta. Virkailija-ui-components asennetaan komennolla:

```bash
npm i @opetushallitus/virkailija-ui-components
```

Asenna myös tarvittaessa vertaisriippuvuudet `react`, `react-dom` ja `styled-components`:

```bash
npm i react react-dom styled-components
```

## ✨ Ominaisuudet

- Kokoelma [TypeScriptillä](https://www.typescriptlang.org/index.html) toteutettuja modulaarisia [react](https://reactjs.org/)-komponentteja
- Tyylit on toteutettu [styled-components](https://www.styled-components.com/)-kirjastolla, jonka avulla käytettävien komponenttien tyylit ladataan automaattisesti
- [Teema](https://github.com/Opetushallitus/virkailija-ui-components/blob/master/src/createTheme/index.ts)-objektissa määriteltyjä arvoja pystyy muokkaamaan ja niitä pääsee helposti käyttämään komponettien tyyleissä [styled-system](https://styled-system.com)-kirjaston avulla

## 📖 Storybook

- Master: https://dev-files.ops.opintopolku.fi/storybooks/virkailija-ui-components/master/index.html

## 🛠️ Käyttö

### Teeman määrittäminen

```javascript
import { ThemeProvider } from 'styled-components';
import createTheme from '@opetushallitus/virkailija-ui-components/createTheme';

const theme = createTheme();

const App = () => <ThemeProvider theme={theme}>/* ... */</ThemeProvider>;
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

### Lokaalikehitys: 

```bash
npm i
npm start
```

Storybook löytyy tämän jälkeen portista 6006.
