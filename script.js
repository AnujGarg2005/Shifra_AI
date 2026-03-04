const btn = document.querySelector("#btn");
const content = document.querySelector("#content");

function speak(text) {
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = "en-GB";
    window.speechSynthesis.speak(utterance);
}
function wishMe() {
    const hour = new Date().getHours();

    if (hour < 12) {
        speak("Good Morning Sir");
    } else if (hour < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener("load", wishMe);


const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Speech Recognition not supported. Please use Google Chrome.");
} else {
    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    recognition.onend = () => {
        content.innerText = "Start the conversation";
    };

    recognition.onerror = () => {
        content.innerText = "Click to speak again";
    };

    btn.addEventListener("click", () => {
        recognition.start();
        content.innerText = "Listening...";
    });
}


function takeCommand(message) {

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you?");
    }

    else if (
        message.includes("who are you") ||
        message.includes("tell me about yourself") ||
        message.includes("describe yourself")
    ) {
        speak("Hello sir, I am Shifra, a virtual assistant");
    }

    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    }

    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    }

    else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
    }

    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
    }

    else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString();
        speak(`The time is ${time}`);
    }

    else {
        const searchText = message.replace("shifra", "").trim();
        speak(`This is what I found on the internet regarding ${searchText}`);
        window.open(
            `https://www.google.com/search?q=${message.replace("shifra","")}`,
            "_blank"
        );
    }

}
