import ancientWebp from '../../assets/images/webp/ancient-civilizations.webp';
import astronomyWebp from '../../assets/images/webp/astronomy.webp';
import newSpeciesWebp from '../../assets/images/webp/new-species.webp';
import energyTechWebp from '../../assets/images/webp/energy-technology.webp';
import mathWebp from '../../assets/images/webp/mathematics.webp';
import neuralWebp from '../../assets/images/webp/neural-interfaces.webp';
import neuroWebp from '../../assets/images/webp/neuroscience.webp';
import quantumWebp from '../../assets/images/webp/quantum-computers.webp';

import ancientJpg from '../../assets/images/jpg/ancient-civilizations.jpg';
import astronomyJpg from '../../assets/images/jpg/astronomy.jpg';
import newSpeciesJpg from '../../assets/images/jpg/new-species.jpg';
import energyTechJpg from '../../assets/images/jpg/energy-technology.jpg';
import mathJpg from '../../assets/images/jpg/mathematics.jpg';
import neuralJpg from '../../assets/images/jpg/neural-interfaces.jpg';
import neuroJpg from '../../assets/images/jpg/neuroscience.jpg';
import quantumJpg from '../../assets/images/jpg/quantum-computers.jpg';

const SUBJECTS = [
  'ancient-civilizations',
  'astronomy',
  'energy-technology',
  'mathematics',
  'neural-interfaces',
  'neuroscience',
  'new-species',
  'quantum-computers',
];

const IMPORTED_IMAGES_WEBP = [
  ancientWebp,
  astronomyWebp,
  energyTechWebp,
  mathWebp,
  neuralWebp,
  neuroWebp,
  newSpeciesWebp,
  quantumWebp,
];

const IMPORTED_IMAGES_JPG = [
  ancientJpg,
  astronomyJpg,
  energyTechJpg,
  mathJpg,
  neuralJpg,
  neuroJpg,
  newSpeciesJpg,
  quantumJpg,
];
export const IMAGES_WEBP = new Map();
export const IMAGES_JPG = new Map();

SUBJECTS.forEach((subject, i) => {
  IMAGES_WEBP.set(subject, IMPORTED_IMAGES_WEBP[i]);
  IMAGES_JPG.set(subject, IMPORTED_IMAGES_JPG[i]);
});
