// ============================================================
//  API DE PLAYLIST  -  Relacionando Musicas e Artistas
//  Backend 2DAT2  -  3o Trimestre
//  O frontend ja esta pronto em public/. Complete os TODOs.
// ============================================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// ---- LISTA 1: artistas (cada um tem um id) ----

const artistas = [
  {id: 1, nome: "Jose Jr", pais: "Brasil"},
  {id: 2, nome: "Zara Larsson", pais: " Suecia"},
  {id: 3, nome: "Olivia rodrigo", pais: "Estados Unidos"},
  {id: 4, nome: "Ariana Grande", pais: "Estados Unidos"},
];

// ---- LISTA 2: musicas (guardam so o artistaId, nao o nome) ----

const musicas = [
  { id: 1, titulo: "Se Hoje Me Toca", artistaId: 1, duracao: 557 },
  { id: 2, titulo: "Talk To Me Zara", artistaId: 2, duracao: 193 },
  { id: 3, titulo: "The Cure", artistaId: 3, duracao: 297 },
  { id: 4, titulo: "Dangerous Woman", artistaId: 4, duracao: 236 },
  { id: 5, titulo: "Visceral", artistaId: 1, duracao: 473 },
  { id: 6, titulo: "Stupid Song", artistaId: 3, duracao: 209 },
  
];

// 1) LISTAR ARTISTAS

app.get("/artistas", (req, res) => {
  res.status(200).json(artistas);
});

// 2) LISTAR MUSICAS  (juntando cada musica com o seu artista)

app.get("/musicas", (req, res) => {
  const resultado = musicas.map((musica) => {
    const artista = artistas.find((item) => item.id === musica.artistaId);
    return {
      titulo: musica.titulo,
      duracao: musica.duracao,
      artista: artista ? artista.nome : "Desconhecido",
      pais: artista ? artista.pais : "-",
    };
  });
  res.status(200).json(resultado);
});

app.get("/artistas/:id/musicas", (req, res) => {
  const id = Number(req.params.id);
  const doArtista = musicas.filter((musica) => musica.artistaId === id);
  res.status(200).json(doArtista);
});

app.listen(PORT, () => {
  console.log(`Playlist no ar: http://localhost:${PORT}`);
});



