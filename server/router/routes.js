const Routes = (req, res) => {
  const url = req.url

  // Identifikasi rute yang menghasilkan data JSON
  try {
    if (url.startsWith('/api/')) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
    }
  } catch (err) {
    console.error(err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end('Terjadi kesalahan Content Type ' + err)
  }

  try {
    if (url.startsWith('/') || url.startsWith('/admin')) {
      // Rute-rute yang merender halaman HTML
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
    }
  } catch (err) {
    console.error(err)
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end('Terjadi kesalahan Content Type ' + err)
  }
}

module.exports = Routes
