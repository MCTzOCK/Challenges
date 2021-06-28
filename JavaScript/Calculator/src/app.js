/**
 * @author Ben Siebert
 * @copyright 2018-2021 Ben Siebert. All rights reserved.
 */

window.onload = () => {
    // create grid
    let grid = document.createElement('div')
    grid.id = 'grid'

    let topRow = document.createElement('div')
    topRow.classList.add('row')

    let topCol = document.createElement('div')
    topCol.classList.add('col', 'col-fw')
    topCol.id = '0'

    let input = document.createElement('input')

    input.style.width = "98.5%"
    input.style.minWidth = "98.5%"
    input.style.height = "98%"
    input.style.minHeight = "98%"
    input.disabled = true
    input.id = 'textField'

    topCol.appendChild(input)

    topRow.appendChild(topCol)

    grid.append(topRow)

    for (let row = 0; row < 4; row++) {
        let rowEl = document.createElement('div')
        rowEl.classList.add("row")
        for (let col = 0; col < 4; col++) {
            let element = document.createElement('div')
            element.classList.add('col')
            element.id = row + "x" + col
            rowEl.appendChild(element)
        }
        grid.appendChild(rowEl)
    }
    document.body.appendChild(grid)

    document.getElementById('0x0').appendChild(getButtonWithText("7"))
    document.getElementById('0x1').appendChild(getButtonWithText("8"))
    document.getElementById('0x2').appendChild(getButtonWithText("9"))
    document.getElementById('0x3').appendChild(getButtonWithText("/", "btn-highlight"))

    document.getElementById('1x0').appendChild(getButtonWithText("4"))
    document.getElementById('1x1').appendChild(getButtonWithText("5"))
    document.getElementById('1x2').appendChild(getButtonWithText("6"))
    document.getElementById('1x3').appendChild(getButtonWithText("*", "btn-highlight"))

    document.getElementById('2x0').appendChild(getButtonWithText("1"))
    document.getElementById('2x1').appendChild(getButtonWithText("2"))
    document.getElementById('2x2').appendChild(getButtonWithText("3"))
    document.getElementById('2x3').appendChild(getButtonWithText("-", "btn-highlight"))

    document.getElementById('3x0').appendChild(getButtonWithText("0"))
    document.getElementById('3x1').appendChild(getButtonWithText("."))
    document.getElementById('3x2').appendChild(getButtonWithText("+"))
    document.getElementById('3x3').appendChild(getButtonWithText("=", "btn-highlight-noticeable"))

    document.querySelectorAll("button").forEach(b => {
        b.addEventListener('click', (event) => {
            let controlChars = ["="];
            if (!controlChars.includes(b.innerText)) {
                document.getElementById('textField').value += b.innerText;
            } else {
                document.getElementById('textField').value = eval(document.getElementById('textField').value);
            }
        })
    });

    document.addEventListener('keydown', (event) => {
        switch (event.keyCode){
            case 27:
                document.getElementById('textField').value = ''
                break
            case 13:
                document.getElementById('textField').value = eval(document.getElementById('textField').value)
        }
        if(parseInt(String.fromCharCode(event.which))){
            document.getElementById('textField').value += String.fromCharCode(event.which)
        }
    })
}

function getButtonWithText(text, additionalClass) {
    let b = document.createElement('button')
    b.innerText = text
    b.classList.add('button')
    if (additionalClass) {
        b.classList.add(additionalClass)
    }
    return b
}
