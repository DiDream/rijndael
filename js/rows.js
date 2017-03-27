'use strict'
function Input(){
    return `<tr id="inputs">
              <td class="row-name">Entradas</td>
              <td class="start-round">
                <div class="matrix">
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                </div>
              </td>
              <td class="sub-bytes">
              </td>
              <td class="shift-rows">
              </td>
              <td class="mix-colums">
              </td>
              <td>
                <div class="xor-symbol"></div>
              </td>
              <td class="round-key">
                  <div class="matrix">
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                  </div>
              </td>
              <td>
                <div class="equal-symbol"></div>
              </td>
            </tr>`;
}
function Round(text, id){

    return `<tr id="${id}">
              <td class="row-name">${text}</td>
              <td class="start-round">
                <div class="matrix">
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                </div>
              </td>
              <td class="sub-bytes">
                <div class="matrix">
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                </div>
              </td>
              <td class="shift-rows">
                  <div class="matrix">
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                  </div>

              </td>
              <td class="mix-colums">
                  <div class="matrix">
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                  </div>
              </td>
              <td>
                <div class="xor-symbol"></div>
              </td>
              <td class="round-key">
                  <div class="matrix">
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                    <div class="matrix-element"></div>
                  </div>
              </td>
              <td>
                <div class="equal-symbol"></div>
              </td>
            </tr>`
}
function Output(){
    return `<tr id="output">
              <td class="row-name">Salida</td>
              <td>
                <div class="matrix">
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                  <div class="matrix-element"></div>
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>`;
}
