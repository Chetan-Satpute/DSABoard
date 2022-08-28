import template from "!!raw-loader!./doc.html";

function getSrcDoc(code: string) {
  return template.replace("</body>", `
      <script>
        window.addEventListener('load', () => {
          const board = new lib.Board(document.getElementById('canvas-container'));
          (async() => {${code}})()
        });
      </script>
    </body>
  `);
}

export default getSrcDoc;
