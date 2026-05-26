import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.14.0';

const btn = document.getElementById('btnLancer');
const statusDiv = document.getElementById('status');

btn.addEventListener('click', async () => {
    const file = document.getElementById('imageInput').files[0];
    const prompt = document.getElementById('promptInput').value;

    if (!file || !prompt) return alert("Remplis tout !");

    statusDiv.innerText = "Téléchargement et traitement...";
    
    try {
        // Utilisation d'un modèle de classification plus léger pour éviter les erreurs 403
        const classifier = await pipeline('image-classification', 'Xenova/resnet-50');
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            const result = await classifier(e.target.result);
            statusDiv.innerText = "IA : Je pense que c'est un " + result[0].label;
        };
        reader.readAsDataURL(file);
    } catch (err) {
        statusDiv.innerText = "Erreur : " + err.message;
    }
});
