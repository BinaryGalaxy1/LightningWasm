// Simple Web Audio API piano note player
window.playPianoNote = function(note) {
    const ctx = window._pianoAudioCtx || (window._pianoAudioCtx = new (window.AudioContext || window.webkitAudioContext)());
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = getFrequency(note);
    gain.gain.value = 0.2;
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
};
// Map note names to frequencies (C4 = 261.63 Hz)
function getFrequency(note) {
    // note format: e.g. A2, C#4, F5
    const noteRegex = /^([A-G]#?)(\d)$/;
    const semitones = {
        'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
    };
    const match = note.match(noteRegex);
    if (!match) return 261.63;
    const [_, n, o] = match;
    const octave = parseInt(o, 10);
    // A4 = 440Hz, MIDI 69
    const midi = (octave + 1) * 12 + semitones[n];
    return 440 * Math.pow(2, (midi - 69) / 12);
}


// Keyboard mapping for the piano (avoid redeclaration)
if (!window.keyToNote) {
    window.keyToNote = {
        // QWERTY row (white keys)
        'q': 'A2', 'w': 'B2', 'e': 'C3', 'r': 'D3', 't': 'E3', 'y': 'F3', 'u': 'G3',
        'i': 'A3', 'o': 'B3', 'p': 'C4', '[': 'D4', ']': 'E4', '\\': 'F4',
        // Number row (black keys)
        '2': 'A#2', '3': 'C#3', '4': 'D#3', '6': 'F#3', '7': 'G#3', '8': 'A#3', '0': 'C#4', '-': 'D#4',
        // zxcvbnm, ,./' (white keys)
        'z': 'G4', 'x': 'A4', 'c': 'B4', 'v': 'C5', 'b': 'D5', 'n': 'E5', 'm': 'F5', ',': 'G5', '.': 'A5', '/': 'B5', "'": 'C6',
        // asdfghjk (black keys)
        'a': 'G#4', 's': 'A#4', 'd': 'C#5', 'f': 'D#5', 'g': 'F#5', 'h': 'G#5', 'j': 'A#5', 'k': 'C#6'
    };
}

window.pianoWireUpKeys = function(dotNetRef) {
    if (window._pianoKeyHandler) return; // Only wire up once
    window._pianoKeyHandler = function(e) {
        const note = window.keyToNote[e.key];
        if (note) {
            window.playPianoNote(note);
            if (dotNetRef) {
                dotNetRef.invokeMethodAsync('SetPressedFromJs', note);
                setTimeout(() => dotNetRef.invokeMethodAsync('SetPressedFromJs', null), 120);
            }
            e.preventDefault();
        }
    };
    window.addEventListener('keydown', window._pianoKeyHandler);
};
window.pianoUnwireKeys = function() {
    if (window._pianoKeyHandler) {
        window.removeEventListener('keydown', window._pianoKeyHandler);
        window._pianoKeyHandler = null;
    }
};
