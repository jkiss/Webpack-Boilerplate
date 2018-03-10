/*
 * @Author: Mr.B 
 * @Date: 2018-02-24 00:21:02 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-02-24 00:45:12
 */

'use strict';

let xlsx = require('node-xlsx'),
    fs = require('fs'),
    xlsx_file = fs.readFileSync(`${__dirname}/wordfrequency.xlsx`)

let excel = xlsx.parse(xlsx_file),
    sheet = excel[1],
    title_row = sheet.data[0],
    data_row = sheet.data.slice(1),
    json_data = {}

title_row.forEach((e, i) => {
    if(i >= 3){
        let year_arr = []

        data_row.forEach(e => {
            year_arr.push({
                value: e[i],
                name: e[1],
                path: e[1]
            })
        });

        json_data[title_row[i]] = year_arr
    }
});

console.log(json_data)