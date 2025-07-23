// Lista completa de ramos con relaciones
const ramos = [
  // Primer año - 1° Semestre
  { nombre: "Vivencias de la medicina 1", semestre: "1° Semestre", abre: ["Vivencias de la medicina 2", "Psicología médica"] },
  { nombre: "Bases científicas de la medicina", semestre: "1° Semestre", abre: ["Bases estructurales y funcionales 1", "Bioestadística"] },
  { nombre: "Mecanismos celulares en salud y enfermedad", semestre: "1° Semestre", abre: ["Bases estructurales y funcionales 1"] },
  { nombre: "Pensamiento crítico", semestre: "1° Semestre" },
  { nombre: "Técnicas avanzadas de aprendizaje", semestre: "1° Semestre" },
  { nombre: "Inglés general 1", semestre: "1° Semestre", abre: ["Inglés general 2"] },

  // Primer año - 2° Semestre
  { nombre: "Vivencias de la medicina 2", semestre: "2° Semestre", reqs: ["Vivencias de la medicina 1"] },
  { nombre: "Psicología médica", semestre: "2° Semestre", reqs: ["Vivencias de la medicina 1"], abre: ["Introducción a la práctica clínica", "Bioética"] },
  { nombre: "Bases estructurales y funcionales 1", semestre: "2° Semestre", reqs: ["Bases científicas de la medicina", "Mecanismos celulares en salud y enfermedad"], abre: ["Bases estructurales y funcionales 2", "Bases estructurales y funcionales 3"] },
  { nombre: "Inglés general 2", semestre: "2° Semestre", reqs: ["Inglés general 1"], abre: ["Inglés general 3"] },
  { nombre: "Curso de formación general 1", semestre: "2° Semestre" },
  { nombre: "Curso de formación general 2", semestre: "2° Semestre" },

  // Segundo año - 3° Semestre
  { nombre: "Introducción a la práctica clínica", semestre: "3° Semestre", reqs: ["Psicología médica"], abre: ["Introducción al razonamiento clínico", "Bases estructurales y funcionales 3", "Semiología"] },
  { nombre: "Bases estructurales y funcionales 2", semestre: "3° Semestre", reqs: ["Bases estructurales y funcionales 1"], abre: ["Morfofisiopatología 1"] },
  { nombre: "Bioestadística", semestre: "3° Semestre", reqs: ["Bases científicas de la medicina"], abre: ["Epidemiología"] },
  { nombre: "Bioética", semestre: "3° Semestre", reqs: ["Psicología médica"], abre: ["Semiología", "Metodología de la investigación clínica 1", "Salud pública", "Salud sexual"] },
  { nombre: "Inglés general 3", semestre: "3° Semestre", reqs: ["Inglés general 2"] },
  { nombre: "Curso de formación general 3", semestre: "3° Semestre" },

  // Segundo año - 4° Semestre
  { nombre: "Epidemiología", semestre: "4° Semestre", reqs: ["Bioestadística"], abre: ["Metodología de la investigación clínica 1", "Salud pública", "Administración y gestión en salud 1"] },
  { nombre: "Morfofisiopatología 1", semestre: "4° Semestre", reqs: ["Bases estructurales y funcionales 2"], abre: ["Morfofisiopatología 2", "Electivo 2"] },
  { nombre: "Introducción al razonamiento clínico", semestre: "4° Semestre", reqs: ["Introducción a la práctica clínica"], abre: ["Integrado médico quirúrgico 1", "Electivo 1", "Electivo 2"] },
  { nombre: "Bases estructurales y funcionales 3", semestre: "4° Semestre", reqs: ["Bases estructurales y funcionales 1", "Introducción a la práctica clínica"], abre: ["Semiología", "Electivo 1", "Electivo 2"] },
  { nombre: "Curso de formación general 4", semestre: "4° Semestre" },
  { nombre: "Curso de formación general 5", semestre: "4° Semestre" },

  // Tercer año - 5° Semestre
  { nombre: "Semiología", semestre: "5° Semestre", reqs: ["Introducción a la práctica clínica", "Bases estructurales y funcionales 3", "Bioética"], abre: ["Microbiología clínica", "Salud digital", "Integrado médico quirúrgico 1", "Morfofisiopatología 3"] },
  { nombre: "Morfofisiopatología 2", semestre: "5° Semestre", reqs: ["Morfofisiopatología 1"], abre: ["Microbiología clínica", "Integrado médico quirúrgico 1", "Morfofisiopatología 3"] },
  { nombre: "Metodología de la investigación clínica 1", semestre: "5° Semestre", reqs: ["Bioética", "Epidemiología"], abre: ["Electivo 1", "Electivo 2", "Metodología de la investigación clínica 2"] },
  { nombre: "Salud pública", semestre: "5° Semestre", reqs: ["Epidemiología", "Bioética"], abre: ["Salud digital", "Administración y gestión en salud 1"] },

  // ... Agrega todos los ramos restantes con mismo formato hasta el 14° semestre ...

  // Ejemplo final bloqueado por todos los anteriores
  { nombre: "Internado de pediatría", semestre: "13° Semestre", reqs: ["Integrado médico quirúrgico 4.b"] },
  { nombre: "Internado de ginecología y obstetricia", semestre: "13° Semestre", reqs: ["Integrado médico quirúrgico 4.b"] },
  { nombre: "Internado de salud comunitaria", semestre: "13° Semestre", reqs: ["Integrado médico quirúrgico 4.b"] },
  { nombre: "Integrado médico quirúrgico 5.a", semestre: "13° Semestre", reqs: ["Integrado médico quirúrgico 4.b"] },
  { nombre: "Integrado médico quirúrgico 5.b", semestre: "14° Semestre", reqs: ["Integrado médico quirúrgico 5.a"] },
];

// Agrupar por semestre
const semestres = {};
ramos.forEach(r => {
  if (!semestres[r.semestre]) semestres[r.semestre] = [];
  semestres[r.semestre].push(r);
});

// Renderizar ramos
const contenedor = document.getElementById("malla");
Object.entries(semestres).forEach(([semestre, lista]) => {
  const bloque = document.createElement("div");
  bloque.className = "semestre";
  const h2 = document.createElement("h2");
  h2.textContent = semestre;
  bloque.appendChild(h2);

  lista.forEach(ramo => {
    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = ramo.nombre;
    div.dataset.nombre = ramo.nombre;
    if (ramo.reqs) div.classList.add("locked");
    bloque.appendChild(div);
  });
  contenedor.appendChild(bloque);
});

// Lógica interactiva
const actualizarEstado = () => {
  document.querySelectorAll('.ramo').forEach(div => {
    const nombre = div.dataset.nombre;
    const ramoData = ramos.find(r => r.nombre === nombre);

    if (ramoData.reqs) {
      const cumplidos = ramoData.reqs.every(req =>
        document.querySelector(`.ramo[data-nombre="${req}"]`)?.classList.contains('aprobado')
      );
      if (cumplidos) div.classList.remove("locked");
    }
  });
};

document.querySelectorAll('.ramo').forEach(div => {
  div.addEventListener('click', () => {
    if (div.classList.contains("locked")) return;
    div.classList.toggle("aprobado");
    actualizarEstado();
  });
});
