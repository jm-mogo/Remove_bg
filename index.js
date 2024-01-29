const models = {
    silueta: "silueta",
    general: "u2netp",
    general2: "isnet-general-use",
    human: "u2net_human_seg",
};

let model = models.general;

async function get_image() {
    const response = await fetch(
        `http://127.0.0.1:8800/remove_background/${model}`
    );
    const image = await response.blob();
    document.getElementById("img-after").src = URL.createObjectURL(image);
}

async function uploadImg() {
    const fileInput = document.querySelector("#filechooser");

    if (!fileInput.files[0]) {
        console.log("Not file");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    const options = {
        method: "POST",
        body: formData,
    };
    const response = await fetch("http://127.0.0.1:8800/upload_img", options);
    document.getElementById("img-before").src = URL.createObjectURL(
        fileInput.files[0]
    );
    return response;
}

const fileInput = document.querySelector("#filechooser");
fileInput.addEventListener("change", async () => {
    console.log("upload");
    uploadImg().then(() => {
        get_image();
    });
});

document.getElementById("set-model").addEventListener("change", async (e) => {
    const model_name = e.target.id;
    model = models[model_name];
    if (!document.getElementById("img-before").src.includes("#")) {
        get_image();
    }
});

document.getElementById("download-btn").addEventListener("click", () => {
    let ruta = document.getElementById("img-after").src;

    if (ruta.includes("#")) return;

    let enlace = document.createElement("a");
    enlace.href = ruta;
    enlace.download = "no_bg.png";
    document.body.appendChild(enlace);
    enlace.click();

    //Borrrar el elemento
    enlace.parentNode.removeChild(enlace);
});
