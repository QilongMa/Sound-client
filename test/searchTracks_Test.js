
require('babel-core/register')({
    "presets":["es2015","react", "stage-0"]
});

import {searchTracks} from '../src/actions/searchActions';
var assert = require("assert");

describe("Tests for search tracks actions", function () {
    it("should run this function", function () {
        
        const URL = "https://api.soundcloud.com/tracks?client_id=a281614d7f34dc30b665dfcaa3ed7505&linked_partitioning=1&limit=50&q=summer";
        // assert.equal(50,search.searchTracks(URL).length);
    })
});