function sanitizeText(array) {
  array.map(string => string.trim())

  title = array[0]
    .replace(/\d+\.\ds/g, '')
    .replace(/\ds/g, '')
    .trim()
  time = Number(array[0].trim().split('  ')[1].replace('s', ''))

  return { title, time }
}

var cardInNodeList = document.querySelectorAll('.card.tight.bg-w')

var cardTransformed = Array.from(cardInNodeList)

var cardTextsSplitted = cardTransformed.map(card =>
  card.textContent.split('\n')
)

var titles = cardTextsSplitted.map(card => sanitizeText(card).title)
var times = cardTextsSplitted.map(card => sanitizeText(card).time)
var links = cardTransformed.map(card => {
  link = card.children[0].attributes.href.textContent

  return `https://getyarn.io${link}`
})

var subtitle = cardTransformed.map(card => {
  sub = card.lastChild.innerText.replace(/\"|!|\\|\.|-|,|\#/gm, '').trim()

  return sub
})

newCardOrganized = []

for (var i = 0; i < titles.length; i++) {
  if (times[i] > 0) {
    newCardOrganized.push({
      id: i,
      title: titles[i],
      subtitle: subtitle[i],
      time: times[i],
      links: links[i],
    })
  }
}

function filterBadYarns(yarns) {
  withoutBars = yarns.filter(yarn => !yarn.subtitle.includes('['))
  minSize = withoutBars.filter(yarn => yarn.subtitle.length > 10)

  return minSize
}

console.log(filterBadYarns(newCardOrganized))

copy(filterBadYarns(newCardOrganized))

// newCardOrganized
