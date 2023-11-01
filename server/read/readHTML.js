const fs = require('fs')
const path = require('path')

const ReadHTML = (htmlPath, cssPath, jsPath, logoPath, res, req) => {
  fs.readFile(htmlPath, 'utf8', (err, htmlData) => {
    if (err) {
      res.writeHead(404)
      res.write('Error File HTML Tidak ditemukan..')
      res.end()
    } else {
      fs.readFile(cssPath, 'utf8', (err, cssData) => {
        if (err) {
          res.writeHead(404)
          res.write('Error File CSS Tidak ditemukan..')
          res.end()
        } else {
          fs.readFile(jsPath, 'utf8', (err, jsData) => {
            if (err) {
              res.writeHead(404)
              res.write('Error File JavaScript Tidak ditemukan..')
              res.end()
            } else {
              fs.readFile(logoPath, (err, logoData) => {
                if (err) {
                  res.writeHead(404)
                  res.write('Error File Logo Tidak ditemukan..')
                  res.end()
                } else {
                  // Gantikan tag <link> dengan isi CSS
                  htmlData = htmlData.replace(
                    '<link rel="stylesheet" type="text/css" href="/css/style.css" />',
                    `<style>${cssData}</style>`
                  )

                  // Masukkan script JavaScript
                  htmlData = htmlData.replace(
                    '<script src="/script/script.js"></script>',
                    `<script>${jsData}</script>`
                  )

                  // Masukkan gambar (logo)
                  htmlData = htmlData.replace(
                    '<img src="/Images/logo.png" alt="Logo" />',
                    '<img src="/Images/profile.jpg" alt="Profile" />',
                    `<img src="data:image/png;base64,${logoData.toString(
                      'base64'
                    )}" alt="Logo" />`
                  )

                  res.write(htmlData)
                  res.end()
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports = ReadHTML
