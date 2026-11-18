// ===== PERSONALISE THIS SECTION =====
// Set the birthday date below in YYYY-MM-DD format.
// Example: "2026-12-05". Use the next upcoming birthday year.
const BIRTHDAY_DATE = "2026-11-30";

// Music starts only after the visitor taps the Music button (browser rule).
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }

  // Birthday countdown
  const countdown = document.getElementById("countdown");
  if (countdown) {
    const target = new Date(`${BIRTHDAY_DATE}T00:00:00`);
    const note = document.getElementById("countdownNote");
    if (Number.isNaN(target.getTime())) {
      note.textContent = "Please enter a valid birthday date in js/script.js.";
    } else {
      const updateCountdown = () => {
        const now = new Date();
        let distance = target - now;
        if (distance < 0) {
          note.textContent = "It’s Ayushi’s birthday! Have the happiest celebration! 🎉";
          countdown.innerHTML = "<div><strong>🎂</strong><span>Today!</span></div>";
          return;
        }
        const days = Math.floor(distance / 86400000);
        const hours = Math.floor((distance % 86400000) / 3600000);
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);
        countdown.innerHTML = `
          <div><strong>${days}</strong><span>Days</span></div>
          <div><strong>${hours}</strong><span>Hours</span></div>
          <div><strong>${minutes}</strong><span>Minutes</span></div>
          <div><strong>${seconds}</strong><span>Seconds</span></div>`;
      };
      updateCountdown();
      setInterval(updateCountdown, 1000);
    }
  }

  // Background music button
  const music = document.getElementById("bgMusic");
  const musicButton = document.querySelector(".music-toggle");
  if (music && musicButton) {
    musicButton.addEventListener("click", async () => {
      try {
        if (music.paused) {
          await music.play();
          musicButton.classList.add("playing");
          musicButton.innerHTML = "♫ <span>Playing</span>";
        } else {
          music.pause();
          musicButton.classList.remove("playing");
          musicButton.innerHTML = "♫ <span>Music</span>";
        }
      } catch (error) {
        alert("Add your audio file at music/birthday-song.mp3, then try again.");
      }
    });
  }

  // Confetti buttons
  const confettiButton = document.getElementById("confettiBtn");
  if (confettiButton) confettiButton.addEventListener("click", launchConfetti);
  const celebrateButton = document.getElementById("celebrateBtn");
  if (celebrateButton) celebrateButton.addEventListener("click", () => {
    launchConfetti();
    document.getElementById("celebrateMessage").textContent = "Yay! May every wish you make find its way to you, Ayushi! 💖";
  });

  // Surprise reveal
  const revealButton = document.getElementById("revealBtn");
  if (revealButton) revealButton.addEventListener("click", () => {
    document.getElementById("hiddenSurprise").classList.add("show");
    revealButton.textContent = "Surprise opened! 💗";
    revealButton.disabled = true;
    launchConfetti();
  });
});

function launchConfetti() {
  const symbols = ["🎉", "💖", "✨", "🌸", "🎊"];
  for (let i = 0; i < 65; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (14 + Math.random() * 18) + "px";
    piece.style.animationDuration = (2.2 + Math.random() * 2.2) + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}
