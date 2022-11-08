import ancientWebp from '../../assets/images/webp/ancient-civilizations.webp';
import astronomyWebp from '../../assets/images/webp/astronomy.webp';
import bigBangWebp from '../../assets/images/webp/big-bang.webp';
import energyTechWebp from '../../assets/images/webp/energy-technology.webp';
import mathWebp from '../../assets/images/webp/mathematics.webp';
import neuralWebp from '../../assets/images/webp/neural-interfaces.webp';
import neuroWebp from '../../assets/images/webp/neuroscience.webp';
import quantumWebp from '../../assets/images/webp/quantum-computers.webp';

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

const IMPORTED_IMAGES = [
  ancientWebp,
  astronomyWebp,
  bigBangWebp,
  energyTechWebp,
  mathWebp,
  neuralWebp,
  neuroWebp,
  quantumWebp,
];
const IMAGES_WEBP = new Map();

SUBJECTS.forEach((subject, i) => {
  IMAGES_WEBP.set(subject, IMPORTED_IMAGES[i]);
});

export default IMAGES_WEBP;
