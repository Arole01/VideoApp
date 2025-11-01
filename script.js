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

startBtn.onclick = async () => {
    const stream = await initCamera();
    recordedChunks=[];
    mediaRecorder = new
    MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => {
        if(e.data.size > 0)
            recordedChunks.push(e.data);
    }

    mediaRecorder.onstop = () => {
        const blob = newBlob(recordedChunks,{type:'video/webm'});
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'recording.webm';
        downloadLink.style.display = 'inline-block';
    };

    mediaRecorder.start()
    startBtn.disabled = true;
    stopBtn.disabled = false;
    downloadLink.style.display = 'none';
};

    stopBtn.onclick = () => {
        mediaRecorder.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }