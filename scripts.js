const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

const patterns = {
  name: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{5,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{7,15}$/
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim(),
  };

  let valid = true;

  // Validaciones
  if (!patterns.name.test(data.name)) showError("name", "Nombre inválido");
  else clearError("name");

  if (!patterns.email.test(data.email)) showError("email", "Email inválido");
  else clearError("email");

  if (!patterns.phone.test(data.phone)) showError("phone", "Teléfono inválido");
  else clearError("phone");

  if (data.subject.length < 4) showError("subject", "Asunto muy corto");
  else clearError("subject");

  if (data.message.length < 10) showError("message", "Mensaje muy corto");
  else clearError("message");

  if (document.querySelectorAll(".error:not(:empty)").length > 0) return;

  try {
    const res = await fetch("https://contacto-api.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      successMessage.textContent = "Mensaje enviado correctamente";
      form.reset();
    } else {
      successMessage.textContent = result.error;
    }
  } catch (err) {
    successMessage.textContent = "Error al enviar";
  }
});

function showError(field, msg) {
  document.querySelector(`#${field} + .error`).textContent = msg;
}

function clearError(field) {
  document.querySelector(`#${field} + .error`).textContent = "";
}
