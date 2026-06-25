from flask import Flask, render_template

app = Flask(__name__)

HER_NAME = "Anjali"

MESSAGES = [
    {
        "type": "funny",
        "title": "Smooth Criminal (Fail)",
        "description": "I tried to come up with a smooth line for this section, but I got distracted thinking about your smile. So... happy birthday!",
        "icon": "🎯",
        "emoji": "😅"
    },
    {
        "type": "genuine",
        "title": "The Way You Are",
        "description": "You have this quiet way of making people feel seen and valued. Not everyone has that gift — but you do, and it's one of my favorite things about you.",
        "icon": "💛",
        "emoji": "🌸"
    },
    {
        "type": "funny",
        "title": "Bubble Tea Economics",
        "description": "If I had a dollar for every time you crossed my mind, I'd use it to take you out for bubble tea. That's just smart economics.",
        "icon": "🧋",
        "emoji": "😂"
    },
    {
        "type": "genuine",
        "title": "Your Laughter",
        "description": "Your laugh is the kind that stays with you long after the conversation ends. It's impossible not to smile when you do.",
        "icon": "✨",
        "emoji": "💫"
    },
    {
        "type": "funny",
        "title": "Official Warning",
        "description": "Warning: Talking to you may cause excessive smiling, random daydreaming, and an uncontrollable urge to write cheesy birthday websites.",
        "icon": "⚠️",
        "emoji": "🫣"
    },
    {
        "type": "genuine",
        "title": "Extra Loud",
        "description": "You don't need a special day to be celebrated — but since today IS yours, I'm saying it extra loud: you're genuinely amazing.",
        "icon": "🌟",
        "emoji": "🎂"
    }
]

REASONS = [
    {"title": "Kind", "description": "You care about everyone around you", "icon": "💖", "color": "#ff6b9d"},
    {"title": "Smart", "description": "Your mind is incredibly sharp", "icon": "🧠", "color": "#c084fc"},
    {"title": "Funny", "description": "You can make anyone laugh", "icon": "😂", "color": "#fbbf24"},
    {"title": "Inspiring", "description": "You push me to be better", "icon": "🔥", "color": "#fb923c"},
    {"title": "Beautiful", "description": "Inside and out, you shine", "icon": "✨", "color": "#f472b6"}
]


@app.route("/")
def index():
    return render_template(
        "index.html",
        name=HER_NAME,
        reasons=REASONS,
        messages=MESSAGES
    )


@app.route("/messages")
def messages():
    return render_template(
        "messages.html",
        name=HER_NAME,
        messages=MESSAGES
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
