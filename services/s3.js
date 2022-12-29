const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
//import { AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } from './config.js'
const fs = require('fs')
const {getSignedUrl}  = require('@aws-sdk/s3-request-presigner')
require('dotenv').config();

const client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
})

async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)
}

async function getFiles() {
    const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME
    })
    return await client.send(command)
}

async function getFile(filename) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    })
    return await client.send(command)
}

async function downloadFile(filename) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    })
    const result = await client.send(command)
    console.log(result)
    result.Body.pipe(fs.createWriteStream(`./images/${filename}`))
}

async function getFileURL(filename) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    })
    return await getSignedUrl(client, command, { expiresIn: 3600 })
}

module.exports = {
    uploadFile,
    getFiles,
    getFile,
    downloadFile,
    getFileURL
}