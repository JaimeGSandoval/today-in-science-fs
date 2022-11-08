import ancientWebp from '../../assets/images/webp/ancient-civilizations.webp';
import astronomyWebp from '../../assets/images/webp/astronomy.webp';
import bigBangWebp from '../../assets/images/webp/big-bang.webp';
import energyTechWebp from '../../assets/images/webp/energy-technology.webp';
import mathWebp from '../../assets/images/webp/mathematics.webp';
import neuralWebp from '../../assets/images/webp/neural-interfaces.webp';
import neuroWebp from '../../assets/images/webp/neuroscience.webp';
import quantumWebp from '../../assets/images/webp/quantum-computers.webp';

import ancientJpg from '../../assets/images/jpg/ancient-civilizations.jpg';
import astronomyJpg from '../../assets/images/jpg/astronomy.jpg';
import bigBangJpg from '../../assets/images/jpg/big-bang.jpg';
import energyTechJpg from '../../assets/images/jpg/energy-technology.jpg';
import mathJpg from '../../assets/images/jpg/mathematics.jpg';
import neuralJpg from '../../assets/images/jpg/neural-interfaces.jpg';
import neuroJpg from '../../assets/images/jpg/neuroscience.jpg';
import quantumJpg from '../../assets/images/jpg/quantum-computers.jpg';

const SUBJECTS = [
  'ancient-civilizations',
  'astronomy',
  'big-bang',
  'energy-technology',
  'mathematics',
  'neural-interfaces',
  'neuroscience',
  'quantum-computers',
];

const IMPORTED_IMAGES_WEBP = [
  ancientWebp,
  astronomyWebp,
  bigBangWebp,
  energyTechWebp,
  mathWebp,
  neuralWebp,
  neuroWebp,
  quantumWebp,
];

const IMPORTED_IMAGES_JPG = [
  ancientJpg,
  astronomyJpg,
  bigBangJpg,
  energyTechJpg,
  mathJpg,
  neuralJpg,
  neuroJpg,
  quantumJpg,
];
export const IMAGES_WEBP = new Map();
export const IMAGES_JPG = new Map();

SUBJECTS.forEach((subject, i) => {
  IMAGES_WEBP.set(subject, IMPORTED_IMAGES_WEBP[i]);
  IMAGES_JPG.set(subject, IMPORTED_IMAGES_JPG[i]);
});
