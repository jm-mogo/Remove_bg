async function get_image() {
    const response = await fetch("http://127.0.0.1:8800/remove_background");
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

document.getElementById("set-model").addEventListener("change", (e) => {
    const options = {
        method: "post",
        body: { model: "human" },
        "Content-Type": "application/json",
    };
    fetch("http://127.0.0.1:8800/set_model", options);
});
