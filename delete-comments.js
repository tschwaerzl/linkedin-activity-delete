function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    let elapsedTime = 0;
    const interval = 100;

    const checkForElement = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (elapsedTime >= timeout) {
        reject(new Error(`Element with selector "${selector}" not found within ${timeout}ms`));
      } else {
        elapsedTime += interval;
        setTimeout(checkForElement, interval);
      }
    };

    checkForElement();
  });
}

async function scrollToBottom(page) {
  window.scrollTo(0, document.body.scrollHeight);
}

async function clickDeleteOption() {
  const groups = document.querySelectorAll('.comment-social-activity__comment-options-dropdown');

  if (!groups.length) {
    console.log('All comments must have been deleted. Terminating.');
    return;
  }

  for (const group of groups) {
    const button = group.querySelector('.comment-options-trigger');


    if (button) {
      console.log('Clicking main button...');
      button.click();

      try {
        const deleteOption = Array.from(document.querySelectorAll('.artdeco-dropdown__item')).find((el) =>
          el.textContent.trim().toLowerCase().includes('delete')
        );

        if (deleteOption) {
          const delay = getRandomDelay(1000, 7000); // Delay in milliseconds
          console.log(`Waiting for ${delay}ms before clicking Delete option...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          console.log('Clicking Delete option...');
          deleteOption.click();

          const deleteConfirmModal = await waitForElement('.artdeco-modal--layer-default.comments-delete-comment-modal');
          const deleteConfirmButton = Array.from(deleteConfirmModal.querySelectorAll('button')).find((btn) =>
            btn.textContent.trim().toLowerCase().includes('delete')
          );

          if (deleteConfirmButton) {
            const delay = getRandomDelay(1000, 7000); // Delay in milliseconds
            console.log(`Waiting for ${delay}ms before clicking Delete confirmation...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            console.log('Clicking Delete confirmation...');
            deleteConfirmButton.click();
          }
        } else {
          console.log('Delete option not found')
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }

    const delay = getRandomDelay(1000, 7000); // Delay in milliseconds
    console.log(`Waiting for ${delay}ms before moving to the next group...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  scrollToBottom()

  const delay = getRandomDelay(1000, 7000);

  console.log(`Waiting for ${delay}ms before deleting more...`);
  await new Promise((resolve) => setTimeout(resolve, delay));
  console.log('Start to delete more...');

  clickDeleteOption()
}

clickDeleteOption()
