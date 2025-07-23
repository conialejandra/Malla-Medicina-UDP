/* ----- index.html ----- */
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Malla Medicina UDP</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Malla Medicina UDP</h1>
  <div class="malla" id="malla"></div>

  <script src="script.js"></script>
</body>
</html>


/* ----- styles.css ----- */
body {
  font-family: sans-serif;
  background-color: #e6f7ff;
  color: #333;
  text-align: center;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #0077b6;
}

.malla {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
}

.ramo {
  background-color: #cceeff;
  border: 2px solid #0077b6;
  border-radius: 10px;
  padding: 10px 15px;
  min-width: 200px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.ramo:hover {
  background-color: #b3e0ff;
  transform: scale(1.05);
}

.ramo.aprobado {
  background-color: #a8e6cf;
  border-color: #388e3c;
  text-decoration: line-through;
  color: #2e7d32;
}

.ramo.bloqueado {
  opacity: 0.5;
  cursor: not-allowed;
}


/* ----- script.js ----- */
// Lista completa de ramos con relaciones
const ramos = [
  // PRIMER AÑO
  { nombre: "Vivencias de la medicina 1", requisitos: [], desbloquea: ["Vivencias de la medicina 2", "Psicología médica"] },
  { nombre: "Bases científicas de la medicina", requisitos: [], desbloquea: ["Bases estructurales y funcionales 1", "Bioestadística"] },
  { nombre: "Mecanismos celulares en salud y enfermedad", requisitos: [], desbloquea: ["Bases estructurales y funcionales 1"] },
  { nombre: "Pensamiento critico", requisitos: [], desbloquea: [] },
  { nombre: "Técnicas avanzadas de aprendizaje", requisitos: [], desbloquea: [] },
  { nombre: "Inglés general 1", requisitos: [], desbloquea: ["Inglés general 2"] },
  { nombre: "Vivencias de la medicina 2", requisitos: ["Vivencias de la medicina 1"], desbloquea: [] },
  { nombre: "Psicología médica", requisitos: ["Vivencias de la medicina 1"], desbloquea: ["Introducción a la práctica clínica", "Bioética"] },
  { nombre: "Bases estructurales y funcionales 1", requisitos: ["Bases científicas de la medicina", "Mecanismos celulares en salud y enfermedad"], desbloquea: ["Bases estructurales y funcionales 2", "Bases estructurales y funcionales 3"] },
  { nombre: "Inglés general 2", requisitos: ["Inglés general 1"], desbloquea: ["Inglés general 3"] },
  { nombre: "Curso de formación general 1", requisitos: [], desbloquea: [] },
  { nombre: "Curso de formación general 2", requisitos: [], desbloquea: [] },

  // SEGUNDO AÑO
  { nombre: "Introducción a la práctica clínica", requisitos: ["Psicología médica"], desbloquea: ["Introducción al razonamiento clínico", "Bases estructurales y funcionales 3", "Semiología"] },
  { nombre: "Bases estructurales y funcionales 2", requisitos: ["Bases estructurales y funcionales 1"], desbloquea: ["Morfofisiopatología 1"] },
  { nombre: "Bioestadística", requisitos: ["Bases científicas de la medicina"], desbloquea: ["Epidemiologia"] },
  { nombre: "Bioética", requisitos: ["Psicología médica"], desbloquea: ["Semiología", "Metodología de la investigación clínica 1", "Salud pública", "Salud sexual"] },
  { nombre: "Inglés general 3", requisitos: ["Inglés general 2"], desbloquea: [] },
  { nombre: "Curso de formación general 3", requisitos: [], desbloquea: [] },
  { nombre: "Epidemiologia", requisitos: ["Bioestadística"], desbloquea: ["Metodología de la investigación clínica 1", "Salud pública", "Administración y gestión en salud 1"] },
  { nombre: "Morfofisiopatología 1", requisitos: ["Bases estructurales y funcionales 2"], desbloquea: ["Morfofisiopatología 2", "Electivo 2"] },
  { nombre: "Introducción al razonamiento clínico", requisitos: ["Introducción a la práctica clínica"], desbloquea: ["Integrado médico quirúrgico 1", "Electivo 1", "Electivo 2"] },
  { nombre: "Bases estructurales y funcionales 3", requisitos: ["Bases estructurales y funcionales 1", "Introducción a la práctica clínica"], desbloquea: ["Semiología", "Electivo 1", "Electivo 2"] },
  { nombre: "Curso de formación general 4", requisitos: [], desbloquea: [] },
  { nombre: "Curso de formación general 5", requisitos: [], desbloquea: [] },

  // TERCER AÑO
  { nombre: "Semiología", requisitos: ["Introducción a la práctica clínica", "Bases estructurales y funcionales 3", "Bioética"], desbloquea: ["Microbiología clínica", "Salud digital", "Integrado médico quirúrgico 1", "Morfofisiopatología 3"] },
  { nombre: "Morfofisiopatología 2", requisitos: ["Morfofisiopatología 1"], desbloquea: ["Microbiología clínica", "Integrado médico quirúrgico 1", "Morfofisiopatología 3"] },
  { nombre: "Metodología de la investigación clínica 1", requisitos: ["Bioética", "Epidemiologia"], desbloquea: ["Electivo 1", "Metodología de la investigación clínica 2", "Electivo 2"] },
  { nombre: "Salud pública", requisitos: ["Bioética", "Epidemiologia"], desbloquea: ["Salud digital", "Administración y gestión en salud 1"] },
  { nombre: "Microbiología clínica", requisitos: ["Semiología", "Morfofisiopatología 2"], desbloquea: ["Integrado médico quirúrgico 2"] },
  { nombre: "Salud digital", requisitos: ["Semiología", "Salud pública"], desbloquea: [] },
  { nombre: "Integrado médico quirúrgico 1", requisitos: ["Introducción al razonamiento clínico", "Morfofisiopatología 2", "Semiología"], desbloquea: ["Integrado médico quirúrgico 2", "Morfofisiopatología 3"] },
  { nombre: "Curso de formación general 6", requisitos: [], desbloquea: [] },

  // CUARTO AÑO
  { nombre: "Integrado médico quirúrgico 2", requisitos: ["Integrado médico quirúrgico 1", "Microbiología clínica"], desbloquea: ["Integrado médico quirúrgico 3", "Salud sexual", "Medicina legal", "Administración y gestión en salud 1"] },
  { nombre: "Electivo 1", requisitos: ["Introducción al razonamiento clínico", "Bases estructurales y funcionales 3", "Metodología de la investigación clínica 1"], desbloquea: [] },
  { nombre: "Metodología de la investigación clínica 2", requisitos: ["Metodología de la investigación clínica 1"], desbloquea: [] },
  { nombre: "Morfofisiopatología 3", requisitos: ["Integrado médico quirúrgico 1", "Morfofisiopatología 2", "Semiología"], desbloquea: ["Integrado médico quirúrgico 3"] },
  { nombre: "Integrado médico quirúrgico 3", requisitos: ["Integrado médico quirúrgico 2", "Morfofisiopatología 3"], desbloquea: ["Salud mental y psiquiatría 1", "Órganos de los sentidos 1", "Pediatría", "Órganos de los sentidos 2", "Ginecología y obstetricia"] },
  { nombre: "Salud sexual", requisitos: ["Bioética", "Integrado médico quirúrgico 2"], desbloquea: [] },
  { nombre: "Electivo 2", requisitos: ["Morfofisiopatología 1", "Introducción al razonamiento clínico", "Bases estructurales y funcionales 3", "Metodología de la investigación clínica 1"], desbloquea: [] },
  { nombre: "Medicina legal", requisitos: ["Integrado médico quirúrgico 2"], desbloquea: [] },

  // QUINTO AÑO
  { nombre: "Salud mental y psiquiatría 1", requisitos: ["Integrado médico quirúrgico 3"], desbloquea: ["Salud mental y psiquiatría 2"] },
  { nombre: "Órganos de los sentidos 1", requisitos: ["Integrado médico quirúrgico 3"], desbloquea: [] },
  { nombre: "Administración y gestión en salud 1", requisitos: ["Epidemiologia", "Salud pública", "Integrado médico quirúrgico 2"], desbloquea: ["Administración y gestión en salud 2"] },
  { nombre: "Pediatría", requisitos: ["Integrado médico quirúrgico 3"], desbloquea: [] },
  { nombre: "Salud mental y psiquiatría 2", requisitos: ["Salud mental y psiquiatría 1"], desbloquea: [] },
  { nombre: "Órganos de los sentidos 2", requisitos: ["Integrado médico quirúrgico 3"], desbloquea: [] },
  { nombre: "Administración y gestión en salud 2", requisitos: ["Administración y gestión en salud 1"], desbloquea: [] },
  { nombre: "Ginecología y obstetricia", requisitos: ["Integrado médico quirúrgico 3"], desbloquea: [] },

  // INTERNADO
  { nombre: "Internado de psiquiatria", requisitos: ["Ginecología y obstetricia"], desbloquea: ["Internado de pediatría"] },
  { nombre: "Internado electivo", requisitos: ["Ginecología y obstetricia"], desbloquea: ["Internado de pediatría"] },
  { nombre: "Internado de urgencias", requisitos: ["Ginecología y obstetricia"], desbloquea: ["Internado de pediatría"] },
  { nombre: "Integrado médico quirúrgico 4.a", requisitos: ["Ginecología y obstetricia"], desbloquea: ["Integrado médico quirúrgico 5.a"] },
  { nombre: "Internado de medicina interna y geriatría", requisitos: ["Ginecología y obstetricia"], desbloquea: ["Internado de pediatría"] },
  { nombre: "Internado especialidades", requisitos: ["Ginecología y obstetricia"], desbloquea: ["Internado de pediatría"] },
  { nombre: "Integrado médico quirúrgico 4.b", requisitos: ["Ginecología y obstetricia"], desbloquea: ["Integrado médico quirúrgico 5.b"] },

  { nombre: "Internado de pediatría", requisitos: ["Internado de psiquiatria", "Internado electivo", "Internado de urgencias", "Internado de medicina interna y geriatría", "Internado especialidades"], desbloquea: [] },
  { nombre: "Internado de salud comunitaria", requisitos: ["Internado de psiquiatria"], desbloquea: [] },
  { nombre: "Integrado médico quirúrgico 5.a", requisitos: ["Integrado médico quirúrgico 4.a"], desbloquea: [] },
  { nombre: "Internado de ginecología y obstetricia", requisitos: ["Internado de psiquiatria"], desbloquea: [] },
  { nombre: "Integrado de cirugía", requisitos: ["Internado de psiquiatria"], desbloquea: [] },
  { nombre: "Integrado médico quirúrgico 5.b", requisitos: ["Integrado médico quirúrgico 4.b"], desbloquea: [] },
];

// Agrupar por semestre
const semestres = {};
ramos.forEach(r => {
  if (!semestres[r.semestre]) semestres[r.semestre] = [];
  semestres[r.semestre].push(r);
});

// Renderizar los ramos
Object.entries(semestres).forEach(([semestre, ramosSemestre]) => {
  const contenedor = document.createElement('div');
  contenedor.className = 'semestre';

  const titulo = document.createElement('h2');
  titulo.textContent = semestre;
  contenedor.appendChild(titulo);

  ramosSemestre.forEach(ramo => {
    const div = document.createElement('div');
    div.className = 'ramo';
    div.textContent = ramo.nombre;
    div.dataset.nombre = ramo.nombre;

    if (ramo.reqs) {
      div.classList.add('locked');
    }

    contenedor.appendChild(div);
  });

  malla.appendChild(contenedor);
});

// Manejo de clics
document.querySelectorAll('.ramo').forEach(div => {
  div.addEventListener('click', () => {
    if (div.classList.contains('locked')) return;

    if (!div.classList.contains('aprobado')) {
      div.classList.add('aprobado');

      const nombre = div.dataset.nombre;
      const abre = ramos.find(r => r.nombre === nombre)?.abre || [];

      abre.forEach(nombreAbierto => {
        const desbloquear = document.querySelector(`.ramo[data-nombre=\"${nombreAbierto}\"]`);
        if (desbloquear && desbloquear.classList.contains('locked')) {
          const requisitos = ramos.find(r => r.nombre === nombreAbierto)?.reqs || [];
          const cumplidos = requisitos.every(req =>
            document.querySelector(`.ramo[data-nombre=\"${req}\"]`)?.classList.contains('aprobado')
          );
          if (cumplidos) {
            desbloquear.classList.remove('locked');
          }
        }
      });
    } else {
      div.classList.remove('aprobado');
    }
  });
});
