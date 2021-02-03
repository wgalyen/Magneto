<h1 align="center">
  <a href="https://github.com/wgalyen/magneto"><img width="200" src="/docs/assets/img/magneto.png">
  </a>
   <br>
   Magneto
 </h1>

## Getting started

### Download

[download](https://github.com/wgalyen/magneto/archive/master.zip).

### Installation

#### Import

```javascript
import Magneto from 'magneto';
```

### Require

```javascript
const magneto = require('magneto');
```

#### File include

Link `magneto.min.js` in your HTML :

```html
<script src="magneto.min.js"></script>
```

### Basic usage

```javascript
let m = new Magnetic({
    magnet: {
        element: '.magnet'
    }
});

m.init();
```
