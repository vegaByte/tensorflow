import * as tf from "@tensorflow/tfjs";

document.getElementById("hola").innerText = "Hello Tensorflow!";

// Use modelo secuencial para regresion lineal
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Seleccionamos perdida y optimizador para modelo
model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

// Datos de entrenamiento
// random data height
const xs = tf.tensor2d([1.47, 1.50, 1.52, 1.55, 1.57, 1.60, 1.63, 1.65, 1.68, 1.70, 1.73, 1.75, 1.78, 1.80, 1.83], [15, 1]);
// random data weight
const ys = tf.tensor2d([52.21, 53.12, 54.48, 55.84, 57.20, 58.57, 59.93, 61.29, 63.11, 64.47, 66.28, 68.10, 69.92, 72.19, 74.46], [15, 1]);

const input = document.getElementById("height");
const button = document.getElementById("predict");
const result = document.getElementById("result");

// Entrenamos el modelo
result.innerText = "Trainning...";
model.fit(xs, ys, { epochs: 500 }).then(() => {
  // Usamos el modelo para predecir
  result.innerText = "Trained!";
});


button.addEventListener("click", () => {
  const height = parseFloat(input.value);
  if (height > 0){
    const output = model.predict(tf.tensor2d([height], [1, 1]));
    result.innerText = output.dataSync()[0].toFixed(2);
  } else {
    alert("Please enter a valid height");
  }
});