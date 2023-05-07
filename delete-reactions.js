function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clickElementWithDelay(element, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      element.click();
      resolve()
    }, delay);
  })
}

async function scrollToBottom(page) {
  window.scrollTo(0, document.body.scrollHeight);
}

/**
 * Replace --like in "[class*="--like"]" to delete different kinds of reactions, such as
 * --like
 * --celebrate
 * --support
 * --love
 * --insightful
 * --funny
 * --entertainment
 * to delete differnt kinds of reactions.
 */

async function clickElementsWithRandomDelay() {
  const elements = document.querySelectorAll('[class*="--like"]');

  for (const element of elements) {
    const delay = getRandomDelay(1000, 7000);
    await clickElementWithDelay(element, delay);
  }

  scrollToBottom()

  const delayBeforeNextBatch = 7000

  await new Promise((resolve) => setTimeout(resolve, delayBeforeNextBatch))

  clickElementsWithRandomDelay()
}

clickElementsWithRandomDelay();


