// Genera src/assets/data/nombres-es.json y nombres-en.json desde PokéAPI.
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
  const es = {};
  const en = {};
  const lote = 20;
  for (let i = 0; i < claves.length; i += lote) {
    const grupo = claves.slice(i, i + lote);
    const datos = await Promise.all(grupo.map((c) => pedir(`${API}/${ruta}/${c}`)));
    datos.forEach((d, idx) => {
      const clave = grupo[idx];
            const nombreEnIdioma = (idioma) =>
        d.names.find((n) => n.language.name === idioma)?.name ?? clave;
      es[clave] = nombreEnIdioma('es');
      en[clave] = nombreEnIdioma('en');
    });
    console.log(`${ruta}: ${Math.min(i + lote, claves.length)}/${claves.length}`);
  }
  return { es, en };
}

async function main() {
  const naturalezas = (await pedir(`${API}/nature?limit=100`)).results.map((r) => r.name);
  const ataques = (await pedir(`${API}/move?limit=2000`)).results.map((r) => r.name);

  const tipos = await traducir(TIPOS, 'type');
  const nat = await traducir(naturalezas, 'nature');
  const atq = await traducir(ataques, 'move');

  await mkdir('src/assets/data', { recursive: true });
  for (const idioma of ['es', 'en']) {
    const salida = { tipos: tipos[idioma], naturalezas: nat[idioma], ataques: atq[idioma] };
    const ruta = `src/assets/data/nombres-${idioma}.json`;
    await writeFile(ruta, JSON.stringify(salida, null, 2), 'utf8');
    console.log(`Listo: ${ruta}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});