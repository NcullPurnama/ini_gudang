const body = document.querySelector('body'),
  modeToggle = body.querySelector('.mode-toggle')
sidebar = body.querySelector('nav')
sidebarToggle = body.querySelector('.fa-sliders')

let getMode = localStorage.getItem('mode')
if (getMode && getMode === 'dark') {
  body.classList.toggle('dark')
}

let getStatus = localStorage.getItem('status')
if (getStatus && getStatus === 'close') {
  sidebar.classList.toggle('close')
}

modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark')
  if (body.classList.contains('dark')) {
    localStorage.setItem('mode', 'dark')
  } else {
    localStorage.setItem('mode', 'light')
  }
})

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('close')
  if (sidebar.classList.contains('close')) {
    localStorage.setItem('status', 'close')
  } else {
    localStorage.setItem('status', 'open')
  }
})

// api user login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form')

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const userData = { username, password }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (response.status === 200) {
        window.location.href = '/admin/dashboard'
      } else {
        const data = await response.json()
        alert(data.message)
      }
    } catch (error) {
      console.error('Failed to log in:', error)
    }
  })
})
// end api user login
