const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

if (!menuBtn || !menu) {
  console.warn('menu-btn of menu niet gevonden. Controleer id\'s en dat dit script NA de HTML geladen is (of gebruik defer).');
} else {
  function toggleMenu() {
    const isOpen = menu.classList.toggle('open');
    menuBtn.classList.toggle('open');
    menu.setAttribute('aria-hidden', (!isOpen).toString());
  }

  menuBtn.addEventListener('click', toggleMenu);

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      menuBtn.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target;

    if (!menu.contains(target) && !menuBtn.contains(target)) {
      menu.classList.remove('open');
      menuBtn.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
    }
  });


  menuBtn.addEventListener('keydown', (e) => {

    const isEnter = e.key === 'Enter' || e.code === 'Enter';
    const isSpace = e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space';
    if (isEnter || isSpace) {
      e.preventDefault();
      toggleMenu();
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const messageBox = document.createElement("div");
  messageBox.classList.add("form-message");

  if (form) {
    form.appendChild(messageBox);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(form);

      // Versturen naar Formspree
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        messageBox.textContent = "Your message has been sent succesfully!";
        messageBox.classList.add("success");
        messageBox.classList.remove("error");
        messageBox.style.display = "block";
        form.reset();
      } else {
        messageBox.textContent = "Something went wrong, try again please!";
        messageBox.classList.add("error");
        messageBox.classList.remove("success");
        messageBox.style.display = "block";
      }
    });
  }
});
