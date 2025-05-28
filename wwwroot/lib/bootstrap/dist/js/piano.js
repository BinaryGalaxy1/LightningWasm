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
    const notes = {
        'C': 261.63,
        'C#': 277.18,
        'D': 293.66,
        'D#': 311.13,
        'E': 329.63,
        'F': 349.23,
        'F#': 369.99,
        'G': 392.00,
        'G#': 415.30,
        'A': 440.00,
        'A#': 466.16,
        'B': 493.88,
        'C2': 523.25
    };
    return notes[note] || 261.63;
}


// Keyboard mapping for the piano (avoid redeclaration)
if (!window.keyToNote) {
    window.keyToNote = {
        'a': 'C', 'w': 'C#', 's': 'D', 'e': 'D#', 'd': 'E', 'f': 'F', 't': 'F#',
        'g': 'G', 'y': 'G#', 'h': 'A', 'u': 'A#', 'j': 'B', 'k': 'C2'
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
