/**
 * Author: Mr.B
 * Date: 2017/7/7-17:21
 * Last Modified by: Nokey
 */
'use strict';

const path = require('path');

const PAGE_PATH = [
    // config you page path here
    'page1/index'

    ,'page2/index'

], ENTRY = {};

PAGE_PATH.forEach((page) => {
    ENTRY[page.split("/").join(".")] = path.resolve(__dirname, '../src/pages/' + page + '.js');
});

module.exports = ENTRY;