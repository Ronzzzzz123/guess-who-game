
const allImages = Array.from({ length: 50 }, (_, i) => `images/${i + 1}.jpg`);
const urlParams = new URLSearchParams(window.location.search);
const grid = document.getElementById('grid');
let selectedId;
let selectedImages = [];

function getRandomSubset(arr, size) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

function renderGrid() {
  grid.innerHTML = '';
  selectedImages.forEach((src, index) => {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    div.innerHTML = `<img src="${src}" alt="char-${index}">`;
    div.addEventListener('click', () => {
      div.classList.toggle('hidden');
    });
    grid.appendChild(div);
  });
}

function generateLink() {
  const charIds = selectedImages.map(src => src.match(/\d+/)[0]).join(',');
  const selectedCharId = selectedId.match(/\d+/)[0];
  const url = `${window.location.origin}${window.location.pathname}?chars=${charIds}&selected=${selectedCharId}`;
  prompt('Ссылка на игру:', url);
}

document.getElementById('generateLink').addEventListener('click', generateLink);

if (urlParams.has('chars') && urlParams.has('selected')) {
  const ids = urlParams.get('chars').split(',').map(id => parseInt(id));
  selectedId = `images/${urlParams.get('selected')}.jpg`;
  selectedImages = ids.map(id => `images/${id}.jpg`);
} else {
  selectedImages = getRandomSubset(allImages, 24);
  selectedId = selectedImages[Math.floor(Math.random() * selectedImages.length)];
}

renderGrid();
