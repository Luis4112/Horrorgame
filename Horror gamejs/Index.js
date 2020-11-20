const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}


function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })

}
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}


function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

}

const textNodes = [
    {
        id: 1,
        text: " You wake up from a drowsy state. You have no idea where you are at at this moment. There's a sword next to you.",
        options: [
            {
                text: 'Take the crystal.',
                setState: { blueCrystal: true },
                nextText: 2
            },
            {
                text: "Leave the crystal.",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "You venture forth in search of answers to where you are when you come across a merchant.",
        options: [
            {
                text: 'Trade the crystal for a sword.',
                requiredState: (currentState) => currentState.blueCrystal,
                setState: { blueCrystal: false, sword: true },
                nextText: 3
            },
            {
                text: 'Trade the crystal for a Staff.',
                requiredState: (currentState) => currentState.blueCrystal,
                setState: { blueCrystal: false, Staff: true },
                nextText: 4
            },
            {
                text: 'Ignore the merchant.',
                nextText: 5
            }
        ]
    },
    {
        id: 3,
        text: 'After having ignored the merchant, you start feeling tired and stumble upon a small town next to a castle.',
        options: [
            {
                text: 'Explore the castle.',
                nextText: 4
            },
            {
                text: 'Find a room to sleep at in the town (50 Gacca.)',
                nextText: 5
            },
            {
                text: 'Find some hay in a stable to sleep in',
                nextText: 6
            }

        ]
    },
    {
        id: 4,
        text: 'You take the staff. You can feel magical powers within you awaken.',
        options: [
            {
                text: '',
                nextText: 7
            }

        ]
    }

]

startGame()