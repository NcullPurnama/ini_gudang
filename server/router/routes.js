// frontend
const ReadHTML = require('../read/readHTML')

const Routes = (req, res) => {
  const url = req.url

  // Identifikasi rute yang menghasilkan data JSON
  if (url.startsWith('/api/')) {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
  } else {
    // Rute-rute yang merender halaman HTML
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })

    switch (url) {
      case '/admin/dashboard':
        ReadHTML(
          'html/dashboard.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break

      case '/admin/kwitansi':
        ReadHTML(
          'html/kwitansi.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break

      case '/admin/payment':
        ReadHTML(
          'html/payment.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break

      case '/admin/stock':
        ReadHTML(
          'html/stock.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break

      default:
        ReadHTML(
          'html/index.html',
          'css/style.css',
          'script/script.js',
          'Images/logo.png',
          res
        )
        break
    }
  }
}

module.exports = Routes
