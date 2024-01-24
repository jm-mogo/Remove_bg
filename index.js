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
    console.log(await response.json());
}

// document.getElementById("upload").addEventListener("click", () => {
//     console.log("upload");
//     uploadImg();
//     get_image();
// });

const fileInput = document.querySelector("#filechooser");
fileInput.addEventListener("change", () => {
    console.log("upload");
    uploadImg();
    get_image();
});

document.getElementById("set-model").addEventListener("change", async (e) => {
    const model_name = e.target.id;
    model = models[model_name];
    const fileInput = document.querySelector("#filechooser");
    if (fileInput.files[0]) {
        get_image();
    }
});
