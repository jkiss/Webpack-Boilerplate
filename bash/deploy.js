/*
 * @Author: Nokey 
 * @Date: 2018-03-09 09:50:22 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-03-09 14:51:17
 */
'use strict'; 

const fs     = require('fs')
const _path  = require('path')
const S3     = require('aws-sdk/clients/s3')
const uuidv4 = require('uuid/v4')
const config = require('../config')
const colors = require('colors')

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
})

// S3 config
const BUCKET_NAME   = 'cctvnews-test-cms-pub-resource'
const STATIC_FOLDER = 'event/2018'
const BUILD_PATH    = _path.resolve(__dirname, '../build')

console.log('📦  打包目录：', BUILD_PATH.info)

let _s3 = new S3({
        apiVersion: '2006-03-01',
        region: 'cn-north-1'
    }),
    project_folder_path = config.public_path.slice(1),
    S3_files = [],
    files_params = []

/**
 * Read all files from build/ folder recursively
 */
function readDir(path){
    let sub = fs.readdirSync(path)

    // ignore hide files
    sub = sub.filter((e)=>{
        return e.indexOf('.') !== 0
    })

    // complete path
    sub = sub.map((e)=>{
        return _path.resolve(path, e)
    })

    if(sub.length === 0){
        console.log('😫  build文件夹下没有文件！'.error)
    }else{
        return sub
    }
}
// Read files recursively
function readPath(path){
    // Determine whether the path is dir or not
    let stat = fs.statSync(path)

    if(stat.isFile()){
        S3_files.push(path)
    }else if(stat.isDirectory()){
        let sub_children = readDir(path)

        sub_children.forEach((e)=>{
            readPath(e)
        })
    }
}
readPath(BUILD_PATH)
let info = 'Follow files will upload to S3: [ ' + S3_files.length + ' files ]\n'
console.log(info.warn, S3_files)

/**
 * 
 */
function setFilesParams(){

}

/**
 * Upload
 */
// let params = {
//     Bucket: BUCKET_NAME, 
//     Key: keyName, 
//     Body: 'Hello World!'
// }

// _s3.putObject(params, (err, data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Successfully uploaded data to " + bucketName + "/" + keyName)
//     }
// })
