const {Router} = require('express')
const express = require("express");
const path = require("path");
const catchAsync = require('../utils/catchAsync')

const cps = ["Content-Security-Policy",
             "default-src 'self';" +
             "base-uri 'self';" +
             "block-all-mixed-content;" +
             "font-src 'self' https: data:;form-action 'self';" +
             "frame-ancestors 'self';" +
             "img-src 'self' blob: http: data:;" +
             "object-src 'none';" +
             "script-src 'self';" +
             "script-src-attr 'none';" +
             "style-src 'self' https: 'unsafe-inline';" +
             "upgrade-insecure-requests"]

const router = Router()

router.get('/admin/**', catchAsync(async (req, res) => {
   res.sendFile(path.resolve('admin/build/index.html'))
}))

router.get('*', catchAsync(async (req, res) => {
   res.sendFile(path.resolve('client/build/index.html'))
}))

module.exports = router