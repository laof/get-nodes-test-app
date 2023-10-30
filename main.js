const nodes = []
function main(res) {
  const labels = []

  let total = 0
  res.list.forEach((obj) => {
    let str = obj.data

    res.decode.forEach((o) => {
      str = str.replaceAll(o[1], o[0])
    })

    // for (const [k, v] of Object.entries(res.decode)) {
    //   str = str.replaceAll(k, v)
    // }
    const arr = str.split(',')
    const datetime = reverse(obj.datetime)
    total += obj.length
    labels.push(createEle(obj.name, obj.length, datetime))
    arr.length && nodes.push(...arr)
  })

  labels.push(createEle('total', total, res.update))
  document.querySelector('table').innerHTML = labels.join('')
  const ele = document.querySelector('.nodes')
  ele.innerHTML = nodes.map((str) => reverse(str)).join('')
}

function createEle(name, size, datetime) {
  const [date, time] = datetime.split(' ')
  return `<tr><td>${name}<td/><td>${size}<td/><td>${date}</td><td class="time">${time}</td></tr>`
}

fetch('json/data.json')
  .then((res) => res.json())
  .then((res) => main(res))

function copy() {
  if (!nodes.length) {
    alert('No data!')
    return
  }

  navigator.clipboard
    .writeText(nodes.join('\n'))
    .then(() => ok())
    .catch(() => alert('Error copying text to clipboard'))
}

function refresh() {
  document.body.innerHTML = ''
  location.reload(true)
}

let timer
function ok() {
  const c = 'copy'
  const ele = document.querySelector('.nodes')
  ele.classList.add(c)
  clearTimeout(timer)
  timer = setTimeout(() => ele.classList.remove(c), 1500)
}

function reverse(str) {
  return str.split('').reverse().join('')
}
