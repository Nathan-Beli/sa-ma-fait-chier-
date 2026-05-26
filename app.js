const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1";
const API_TOKEN = "VOTRE_TOKEN_ICI"; // Va sur Hugging Face, crée un compte, et génère un token "Read"

document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('prompt').value;
    const status = document.getElementById('status');
    const img = document.getElementById('imageResult');

    status.innerText = "Génération en cours via serveur...";
    
    const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
    });

    const blob = await response.blob();
    img.src = URL.createObjectURL(blob);
    img.style.display = "block";
    status.innerText = "Image prête !";
});
