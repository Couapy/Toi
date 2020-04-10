function openNav() {
  document.querySelector('.nav-links').style.right = '0px'
  document.querySelector('.nav-overlay').style.right = '0'
}

function closeNav() {
  document.querySelector('.nav-links').style.right = '-250px'
  document.querySelector('.nav-overlay').style.right = '-100vw'
}

document.querySelector('.nav-menu-button').addEventListener('click', openNav)
document.querySelector('.nav-close').addEventListener('click', closeNav)
document.querySelector('.nav-overlay').addEventListener('click', closeNav)
