/*
 * @Author: Nokey 
 * @Date: 2018-03-09 09:50:22 
 * @Last Modified by: Mr.B
 * @Last Modified time: 2018-04-20 15:08:35
 */
'use strict'; 

const fs     = require('fs')
const _path  = require('path')
const S3     = require('aws-sdk/clients/s3')
const config = require('../config')
const colors = require('colors')
const log    = require('single-line-log').stdout
const mime   = require('mime')

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
const BUCKET_NAME   = process.env.BUCKET_NAME
const STATIC_FOLDER = config.public_path.slice(1)
const TEST_URL = process.env.TEST_URL
const BUILD_PATH    = _path.resolve(__dirname, '../build')

console.log('📦 Bundle base:', BUILD_PATH.info)
console.log('Test URL: ', (TEST_URL+config.public_path+'/index.html').debug)

let _s3 = new S3({
        accessKeyId: process.env.S3_ID,
        secretAccessKey: process.env.S3_KEY,
        apiVersion: '2006-03-01',
        region: process.env.REGION
    }),
    S3_files = [],
    ALL_FILES_LEN = 0,
    Loaded_len = 0

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

    ALL_FILES_LEN += stat.size

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

/**
 * Prepare objects
 */
let S3_OBJECTS = S3_files.map((e)=>{
    let s3_obj = e.replace(new RegExp(BUILD_PATH), '')
    return {
        key_name: STATIC_FOLDER + s3_obj,
        file_path: e
    }
})
// console.log(S3_OBJECTS)

S3_OBJECTS.forEach((e)=>{
    let buffer = fs.readFileSync(e.file_path),
        params = {
            Bucket: BUCKET_NAME,
            Key: e.key_name,
            Body: buffer,
            ContentType: mime.getType(e.file_path)
        }

    let uploader = _s3.upload(params)

    uploader.on('httpUploadProgress', (progress)=>{
        Loaded_len += progress.loaded
        let prog = Math.ceil(Loaded_len * 100 / ALL_FILES_LEN)
        log(('Progress: ' + prog + '%\n').warn)

        if(prog == 100){
            // console.log('!'.warn)
            console.log('🎉 Deploy Success:', (TEST_URL+config.public_path).debug)
        }
    })

    uploader.send((err, data)=>{
        if(err){
            console.log(('Error: ' + e.key_name).error, err)
        }else{
            // console.log((e.key_name + 'Successfully').info)
        }
    })
})
