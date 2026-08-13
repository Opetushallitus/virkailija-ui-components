# virkailija-ui-components

[![virkailija-ui-components](https://github.com/Opetushallitus/virkailija-ui-components/actions/workflows/build.yml/badge.svg)](https://github.com/Opetushallitus/virkailija-ui-components/actions/workflows/build.yml)

## Kirjastoa käyttävät Opintopolun palvelut

- [Kouta-ui](https://github.com/opetushallitus/kouta-ui)
- [Varda-rekisterointi](https://github.com/Opetushallitus/varda-rekisterointi)
- [Ehoks-ui](https://github.com/Opetushallitus/ehoks-ui)
- [Uusi Organisaatiopalvelu](https://github.com/Opetushallitus/organisaatio)

## 📦 Asennus

Versiosta 0.4.8 lähtien komponenttikirjasto on julkaistu Github Packagesiin.

Asentamista varten tarvitaan todennustoken, jonka luontiohjeet löytyvät [täältä](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic).

Kun token on luotu, se täytyy ottaa vielä käyttöön npm-paketeille. Lisää kotihakemistoosi `.npmrc`-tiedostoon seuraavanlainen rivi:

```
//npm.pkg.github.com/:_authToken=todennustoken
```

Korvaa "todennustoken" luomasi tokenin merkkijonolla.

Tämän jälkeen täytyy vielä konfiguroida npm käyttämään Github Packagesin pakettivarastoa `@opetushallitus`-skoopin paketeille. Lisää projektisi `.npmrc`-tiedostoon rivi:

```
@opetushallitus:registry=https://npm.pkg.github.com
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
