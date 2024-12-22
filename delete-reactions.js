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
 * to delete differnt kinds of reactions.
 */

async function clickElementsWithRandomDelay() {
  const like_elements = document.querySelectorAll('button[aria-label*="Unreact Like"]');
  const celebrate_elements = document.querySelectorAll('button[aria-label*="Unreact Celebrate"]');
  const support_elements = document.querySelectorAll('button[aria-label*="Unreact Support"]');
  const love_elements = document.querySelectorAll('button[aria-label*="Unreact Love"]');
  const insightful_elements = document.querySelectorAll('button[aria-label*="Unreact Insightful"]');
  const funny_elements = document.querySelectorAll('button[aria-label*="Unreact Funny"]');

  // combine all elements
  const elements = [
    ...like_elements,
    ...celebrate_elements,
    ...support_elements,
    ...love_elements,
    ...insightful_elements,
    ...funny_elements
  ];

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
