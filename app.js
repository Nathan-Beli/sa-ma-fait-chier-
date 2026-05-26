import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0';

const btn = document.getElementById('btnLancer');
const statusDiv = document.getElementById('status');

btn.addEventListener('click', async () => {
    const fileInput = document.getElementById('imageInput');
    if (!fileInput.files[0]) return alert("Choisis une image !");

    statusDiv.innerText = "Analyse en cours...";
    
    try {
        // Utilisation d'un modèle de classification ultra-stable
        const detector = await pipeline('image-classification', 'Xenova/mobilenetv2-1.0');
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            const result = await detector(e.target.result);
            statusDiv.innerText = "L'IA voit : " + result[0].label;
        };
        reader.readAsDataURL(fileInput.files[0]);
    } catch (err) {
        statusDiv.innerText = "Erreur : " + err.message;
    }
});
