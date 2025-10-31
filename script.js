const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const preview = document.getElementById('preview');
const downloadLink = document.getElementById('downloadLink');

let mediaRecorder;
let recordedChunks = [];

async function initCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
    preview.srcObject = stream;
    return stream;
}