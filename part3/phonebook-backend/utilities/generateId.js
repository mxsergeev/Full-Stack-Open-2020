function generateId() {
  const id = Math.floor(Math.random() * 10000)

  return id.toString().padStart(6, '0')
}

module.exports = generateId
