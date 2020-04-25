// Get all accordions wrappers on page
const accordionWrappers = document.querySelectorAll('[data-accordions]');

// Check if accordion wrappers exist
if(accordionWrappers.length > 0) {
  // Loop through wrappers
  accordionWrappers.forEach(wrapper => {
    // Get accordions, duration and check if close accordions option is set(if data-close-accordions attribute is set)
    // if it is set we want to close opened accordion when new one is clicked
    const accordions = wrapper.querySelectorAll('[data-accordion]');
    const duration = +wrapper.dataset.duration || 300;
    const closeAccordions = wrapper.dataset.closeAccordions;
    
    // Loop through accordions
    accordions.forEach(accordion => {
      // Get accordion trigger and content
      const trigger = accordion.querySelector('[data-trigger]');
      const content = accordion.querySelector('[data-content]');

      // Add click event type on trigger with toggleAccordion listener function
      trigger.addEventListener('click', toggleAccordion.bind(accordion, content, duration, closeAccordions, accordions));
    });
  });
}

// Toggle accordion
function toggleAccordion(content, duration, close, accordions) {
  // Set duration of the animation
  // Add class disable-click to accordion to show the ::after
  // so that you cannot click the trigger when animation is in progress
  content.style.transitionDuration = duration + 'ms';
  this.classList.add('disable-click');

  // If accordion is opened, close it
  if(this.classList.contains('active')) {
    closeAccordion(this, content, duration);
  }else { // If accordion is not opened, open it and close opened accordion
    openAccordion(this, content, duration);
    if(close !== undefined) {
      closeActiveAccordion(accordions, this);
    }
  }
}

// Open accordion
function openAccordion(accordion, content, duration) {
  // Set accordions display property to block
  // Calculate height of the content and store it in a variable
  // Set content height to 0
  // Add active class to accordion
  content.style.display = 'block';
  const height = content.offsetHeight;
  content.style.height = 0;
  accordion.classList.add('active');

  // Set height of the content equal to height variable
  setTimeout(() => {
    content.style.height = height + 'px';
  }, 20);

  // After the animation is completed set the height of the content to auto
  // because we don't want it to have fixed height, in case we resize the browser height may change
  // Remove disable-click class from accordion to remove ::after to allow user to click again on trigger element
  setTimeout(() => {
    content.style.height = 'auto';
    accordion.classList.remove('disable-click');
  }, duration);
}

// Close accordion
function closeAccordion(accordion, content, duration) {
  // Change the content height property from auto to fixed height
  // Remove active class from accordion
  content.style.height = content.offsetHeight + 'px';
  accordion.classList.remove('active');

  // Set content height to 0 to animate the height
  setTimeout(() => {
    content.style.height = 0;
  }, 20);

  // After the animation is completed set content display property to none
  // and remove height property from content because it is set to 0 at this point
  // and when we try to open it again we don't want 0 but the actual height of the content
  // Remove disable-click class from accordion to remove ::after to allow user to click again on trigger element
  setTimeout(() => {
    content.style.display = 'none';
    content.style.height = null;
    accordion.classList.remove('disable-click');
  }, duration);
}

// Close active accordion
function closeActiveAccordion(accordions, current) {
  accordions.forEach(accordion => {
    // If current accordion in the loop is not the clicked accordion
    // and if it has active class it means it is opened so we want to close it
    if(accordion !== current && accordion.classList.contains('active')) {
      const content = accordion.querySelector('[data-content]');
      const duration = +accordion.parentElement.dataset.duration || 300;
      closeAccordion(accordion, content, duration);
    }
  });
}