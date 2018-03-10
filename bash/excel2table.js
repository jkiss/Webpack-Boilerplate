/*
 * @Author: Mr.B 
 * @Date: 2018-02-24 00:21:02 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-02-24 00:45:12
 */

'use strict';

let xlsx = require('node-xlsx'),
    fs = require('fs'),
    xlsx_file = fs.readFileSync(`${__dirname}/words.xlsx`)

let excel = xlsx.parse(xlsx_file),
    sheet = excel[1],
    title_row = sheet.data[0],
    data_row = sheet.data.slice(1),
    table = []

data_row.forEach(e => {
    table.push({
        name: e[1],
        type: 'word',
        'year_2013': e[title_row.indexOf('year_2013')],
        'year_2014': e[title_row.indexOf('year_2014')],
        'year_2015': e[title_row.indexOf('year_2015')],
        'year_2016': e[title_row.indexOf('year_2016')],
        'year_2017': e[title_row.indexOf('year_2017')],
        'year_max': e[title_row.indexOf('year_max')]
    })
})

console.log(table)