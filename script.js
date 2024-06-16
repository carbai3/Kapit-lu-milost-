document.addEventListener("DOMContentLoaded", function() {
  function adjustGrid() {
      const container = document.getElementById('container');
      const cellSize = container.offsetWidth / 10; // Adjust the number of cells per row
      container.style.gridTemplateColumns = `repeat(auto-fill, minmax(${cellSize}px, 1fr))`;
      container.style.gridAutoRows = `${cellSize}px`;
  }

  function initializeGrid() {
      const totalCells = 117;
      let html = '';
      for (let i = 1; i <= totalCells; i++) {
          html += `<div class="cell" id="cell${i}"></div>`;
      }
      document.getElementById('container').innerHTML = html;
      adjustGrid();

      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
          cell.addEventListener('click', function() {
              toggleCellOpacity(cell);
              saveCellOpacities();
              updateCounter();
          });
      });

      loadCellOpacities();
      updateCounter();
  }

  window.addEventListener('resize', adjustGrid);

  initializeGrid();
});

function toggleCellOpacity(cell) {
  if (cell.style.opacity === '0' || cell.style.opacity === '') {
      cell.style.opacity = '0';
  } else {
      cell.style.opacity = '0';
  }
}

function saveCellOpacities() {
  const cellOpacities = {};
  const cells = document.querySelectorAll('.cell');

  cells.forEach(cell => {
      cellOpacities[cell.id] = cell.style.opacity;
  });

  localStorage.setItem('cellOpacities', JSON.stringify(cellOpacities));
}

function loadCellOpacities() {
  const cellOpacities = JSON.parse(localStorage.getItem('cellOpacities'));

  if (cellOpacities) {
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
          if (cellOpacities[cell.id]) {
              cell.style.opacity = cellOpacities[cell.id];
          }
      });
  }
}

function updateCounter() {
  const cells = document.querySelectorAll('.cell');
  let count = 0;
  cells.forEach(cell => {
      if (cell.style.opacity === '0') {
          count++;
      }
  });
  document.getElementById('cell-counter').innerText = count;
}

// Event listener para guardar el estado al salir de la página
window.addEventListener('beforeunload', function() {
  saveCellOpacities();
});

// Event listener para cargar el estado al cargar la página
window.addEventListener('load', function() {
  loadCellOpacities();
  updateCounter();
});
