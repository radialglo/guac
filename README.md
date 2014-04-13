<!--
    This is README is written in Markdown
    Please refer to here for an introduction to Markdown
    http://daringfireball.net/projects/markdown/
-->
[![Build Status](https://travis-ci.org/radialglo/guac.svg?branch=master)](https://travis-ci.org/radialglo/guac)
Guac
====

Guac is a delicious and exploratory JavaScript Framework.

How to setup the Guac Development Environment
---------------------------------------------

Clone a copy of the main Guac repo

```bash
git clone https://github.com/radialglo/guac
```
### Install Node.js

[https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

### Install Dependencies

```
npm install
```

### Install Grunt Command Line Interface

[Grunt](http://gruntjs.com/getting-started) is a Javscript Task Runner that lets you automate minification, compilation, unit testing, linting (checking your code usage) , etc.

```
npm install -g grunt-cli
```
The job of the Grunt CLI is simple: run the version of Grunt which has been installed next to a Gruntfile

Testing
------------------
```grunt connect mocha``` or ```npm test``` at top level directory


