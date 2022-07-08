# AsciiMath to LaTex converter

[AsciiMath](http://asciimath.org/) to [LaText](https://www.latex-project.org/) converter.


## Installation

```
yarn add asciimath-to-latex
```


## Usage

```javascript
const asciimath2latex = require('asciimath-to-latex')
const asciimath = '2=(((3-x)xx2)/(3-x))'
console.log(`asciimath: ${asciimath}`)
const latex = asciimath2latex(asciimath)
console.log(`latex: ${latex}`)
```
