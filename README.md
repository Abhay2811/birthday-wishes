# Birthday Surprise 🎂

A beautiful, interactive Flask web application designed to surprise your crush on her birthday. Features glassmorphism design, animations, confetti, music player, and more.

## Quick Start

```bash
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000 in your browser.

## Customization

### Change the name
Edit `HER_NAME` in `app.py` (line 6).

### Add photos
Replace placeholder images in `static/images/` with your own photos. Update the gallery section in `templates/index.html` if needed.

### Add music
Place an MP3 file in `static/music/` and update `MUSIC_SOURCE` in `static/js/script.js` (line 8).

### Change the message
Edit the message text in the `#message` section of `templates/index.html`.

### Edit memories
Modify the `MEMORIES` list in `app.py` (lines 8-47).

### Edit reasons
Modify the `REASONS` list in `app.py` (lines 49-56).

### Edit the secret letter
Edit the letter content in the `#secret-letter` section of `templates/index.html`.

## Features

- Glassmorphism UI design
- Pink, purple, white, and gold palette
- Floating hearts animation
- Background particles
- Confetti effects
- Dark mode toggle
- Music player
- Secret letter reveal
- Memory timeline
- Photo gallery
- Animated reason cards
- Surprise button with modal
- Fireworks animation
- Loading screen
- Mobile responsive
- Smooth scrolling

## Project Structure

```
birthday-surprise/
├── app.py
├── requirements.txt
├── static/
│   ├── css/style.css
│   ├── js/script.js
│   ├── images/    (add your photos here)
│   └── music/     (add your MP3 here)
├── templates/
│   ├── index.html
│   └── memories.html
└── README.md
```
