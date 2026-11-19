// Genera src/assets/data/nombres-es.json con los nombres en español desde PokéAPI.
// Se ejecuta una sola vez: node scripts/generar-nombres.mjs
import { mkdir, writeFile } from 'node:fs/promises';

const API = 'https://pokeapi.co/api/v2';

const TIPOS = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
];

async function pedir(url) {
  for (let intento = 1; intento <= 3; intento++) {
    const res = await fetch(url);
    if (res.ok) return res.json();
    await new Promise((r) => setTimeout(r, 500 * intento));
  }
  throw new Error(`No se pudo obtener ${url}`);
}

async function traducir(claves, ruta) {
  const resultado = {};
  const lote = 20;
  for (let i = 0; i < claves.length; i += lote) {
    const grupo = claves.slice(i, i + lote);
    const datos = await Promise.all(grupo.map((c) => pedir(`${API}/${ruta}/${c}`)));
    datos.forEach((d, idx) => {
      const es = d.names.find((n) => n.language.name === 'es');
      resultado[grupo[idx]] = es ? es.name : grupo[idx];
    });
    console.log(`${ruta}: ${Math.min(i + lote, claves.length)}/${claves.length}`);
  }
  return resultado;
}

async function main() {
  const naturalezas = (await pedir(`${API}/nature?limit=100`)).results.map((r) => r.name);
  const ataques = (await pedir(`${API}/move?limit=2000`)).results.map((r) => r.name);

  const salida = {
    tipos: await traducir(TIPOS, 'type'),
    naturalezas: await traducir(naturalezas, 'nature'),
    ataques: await traducir(ataques, 'move'),
  };

  await mkdir('src/assets/data', { recursive: true });
  await writeFile('src/assets/data/nombres-es.json', JSON.stringify(salida, null, 2), 'utf8');
  console.log('Listo: src/assets/data/nombres-es.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});