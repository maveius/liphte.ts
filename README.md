![ Liphte ](http://maveius.pl/liphte.ts/img/liphte.ts.png)
# LiphteTS - liphte.ts
liphte.ts - is fork of maveius/liphte library to write HTML tag in TypeScript and JavaScript
Liphte TS is Lightweight & minimalistic HTML Builder/Generator (or maybe Template Engine) for JavaScript and TypeScript

## What is liphte ?
It's lightweight and minimalistic html builder or dom builder based on inspired by projects [rudykocur/pyeve](https://github.com/rudykocur/pyeve) and [rudykocur/breve](https://github.com/rudykocur/breve) which is simplest way to create or generate html from controllers or Angular2 component. 

#### Example (Your HTML file or template):
```html
. . .
  <script type="text/javascript" src="node_modules/liphte.ts/dist/liphte.min.js"></script>
. . .
```
#### Example (Your JavaScript file):
```JavaScript
/** IMPORT **/
requirejs(['node_modules/liphte.ts/dist/liphte.min.js']); // When you are using require.js
...
/** USAGE **/
... 
var T = liphte.tag;

document.write(
    T.ul({id: 'list-id'},
        T.li('First Element'),
        T.li('Second Element'),
        T.li('Third Element')
    )
);
```

#### Output:
```html
<ul id="list-id"><li>First Element</li><li>Second Element</li><li>Third Element</li></ul>
```

## Installing Liphte

#### Composer required:
1. Install by node package manager:

```bash
npm install liphte.ts
```

2. Or download ZIP and unzip from GitHub:

```bash
wget https://github.com/maveius/liphte.ts/archive/master.zip
```

3. Enjoy! Import library and use like in example. 

## Changelog

- v1.0.1 : 11 November 2016:
	- Fix and publish by NPM 
- v1.0.0 : 11 November 2016:
	- Initiated first NMP package and pubilished

## Main Developers

- [maveius](http://maveius.pl)

## Licence
- MIT

## Home Page
https://maveius.pl/liphte.ts/
