require('babel-core/register')({
    "presets": ["es2015", "react", "stage-1"]
});

import React from 'react';
import { expect } from 'react';
import jsdom from "jsdom";

const dom = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = dom.defaultView;

global.document = dom;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});

global.React = React;
global.expect = expect;