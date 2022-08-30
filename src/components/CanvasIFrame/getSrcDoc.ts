import template from "!!raw-loader!./frame/index.html";

function getSrcDoc(code: string) {
  return template.replace("</body>", `
      <script>
        window.addEventListener('load', () => {
          const board = new lib.Board(document.getElementById('canvas-container'));

          (async() => {
            try {
                ${code}
            } catch (error) {
              const errorDiv = document.getElementById('error-div');
              const errorCard = document.getElementById('error-card');

              errorDiv.style.display = 'flex';
              errorCard.innerHTML = error.toString();
            }
          })()
        });
      </script>
    </body>
  `);
}

export default getSrcDoc;
