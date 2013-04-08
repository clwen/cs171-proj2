### CS171 Project 2: Commuting Modalities at MIT

#### About
---
* Authors: Chunglin Wen, Amy Zhao (sorted by lastname)
* Please see `https://github.com/clwen/cs171-proj2` for a github flavored markdown version of the `README`

#### How to run the visualization
---

1. Run the Python SimpleHTTPServer under project directory
    * `python -m SimpleHTTPServer 8000`
2. Open `index.html` in browser with the URL `http://localhost:8000/index.html`

#### Mapping between visual components and code
---

There are mainly three parts of the visualization: map, bar chart and area chart.

* Map
    * County paths defined in `index.html`
    * Interactions defined in `main.js`
    * Styles defined in `style.css`
* Bar chart
    * Menus and svg defined in `index.html`
    * Interactions defined in `barchart.js`
    * Styles defined in `style.css`
* Area chart
    * Menus and svg defined in `index.html`
    * Interactions defined in `area.js`
    * Styles defined in `area.css`

#### Libraries used
---

* [D3](http://d3js.org/)
    * Use hosted version `http://d3js.org/d3.v3.min.js`
* [jQuery](http://jquery.com/)
    * Use hosted version `http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js`
* [Bootstrap](http://twitter.github.io/bootstrap/)
    * Use local version under `js` and `css` directories
* [Underscore](http://underscorejs.org/)
    * Use local version under `js` directory

#### Date files and import methods
--- 

`data/mit-commuter-data.csv` is used in the code. It is imported by `d3.csv` method.

