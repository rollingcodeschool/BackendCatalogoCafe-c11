import cloudinary from "./cloudinary.js";

const subirImagenACloudinary = (buffer) => {
  return new Promise((resolve, reject) => {

const stream = cloudinary.uploader.upload_stream(
      { folder: "catalogo" }, //guardamos la img en la carpeta productos o nombre que deseen
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    stream.end(buffer); 
  });
};

export default subirImagenACloudinary;