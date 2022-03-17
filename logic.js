document.addEventListener('DOMContentLoaded', () => {
  const userGrid = document.querySelector('.grid-user')
  // const computerGrid = document.querySelector('.grid-computer')
  const userSquares = []
  // const computerSquares = []
  const width = 10

  const foodArray = [
    {
      name: 'bread',
      dimension: 1,
      myLength: 3,
      directions: [
        [0, 1, 2], // horizontal
        [0, width, width*2] // vertical
      ]
    },
    {
      name: 'pocky',
      dimension: 1,
      myLength: 3,
      directions: [
        [0, 1, 2], // horizontal
        [0, width, width*2] // vertical
      ]
    },
    {
      name: 'bento',
      dimension: 2,
      myLength: 3,
      directions: [
        [0, 1, 2, width, width+1, width+2], // horizontal
        [0, 1, width, width+1, width*2, width*2+1] // vertical
      ]
    },
    {
      name: 'donut',
      dimension: 2,
      myLength: 2,
      directions: [
        [0, 1, width, width+1], // horizontal
        [0, 1, width, width+1] // vertical
      ]
    },
    {
      name: 'pizza',
      dimension: 3,
      myLength: 3,
      directions: [
        [0, 1, 2, width, width+1, width+2, width*2, width*2 + 1, width*2 + 2], // horizontal
        [0, 1, 2, width, width+1, width+2, width*2, width*2 + 1, width*2 + 2] // vertical
      ]
    }
  ]

  function createBoard(grid, squares) { // grid: userGrid or computerGrid; squares is an empty array
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.classList.add('square')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    }
  }

  createBoard(userGrid, userSquares);

  function generate(food) {
    let randomDirection = Math.floor(Math.random() * food.directions.length) // 0 or 1
    let randomStart
    // console.log(randomDirection)
    let current = food.directions[randomDirection] // array containing directions
    if (randomDirection === 0) direction = 1 // horizontal
    if (randomDirection === 1) direction = 10 // vertical
    if (food.dimension === 2)
    {
      if (direction === 1)
      {
        randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction + width)))
      }
      else
      {
        randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction + 1)))
      }
    }
    else if (food.dimension === 3)
    {
      if (direction === 1)
      {
        randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction + 2*width)))
      }
      else
      {
        randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction + 2)))
      }
    }
    else {
      randomStart = Math.abs(Math.floor(Math.random() * userSquares.length - (food.myLength * direction)))
    }
    console.log(randomStart)
    console.log(userSquares.length)

    const isTaken = current.some(index => userSquares[randomStart + index].classList.contains('taken')) // Debug
    const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
    {
      current.forEach(index => userSquares[randomStart + index].classList.add('taken', food.name))
      current.forEach(index => userSquares[randomStart + index].classList.remove('square'))

      if (food.name === "bread" && direction === 10)
      {
        userSquares[randomStart].classList.add('bread-vertical', 'square')
      }
      if (food.name === "bread" && direction === 1)
      {
        userSquares[randomStart].classList.add('bread-horizontal', 'square')
      }

      if (food.name === "pocky" && direction === 10)
      {
        userSquares[randomStart].classList.add('pocky-vertical', 'square')
      }
      if (food.name === "pocky" && direction === 1)
      {
        userSquares[randomStart].classList.add('pocky-horizontal', 'square')
      }

      if (food.name === "bento" && direction === 10)
      {
        userSquares[randomStart].classList.add('bento-vertical', 'square')
      }
      if (food.name === "bento" && direction === 1)
      {
        userSquares[randomStart].classList.add('bento-horizontal', 'square')
      }

      if (food.name === "donut" && direction === 10)
      {
        userSquares[randomStart].classList.add('donut-vertical', 'square')
      }
      if (food.name === "donut" && direction === 1)
      {
        userSquares[randomStart].classList.add('donut-horizontal', 'square')
      }

      if (food.name === "pizza" && direction === 10)
      {
        userSquares[randomStart].classList.add('pizza-vertical', 'square')
      }
      if (food.name === "pizza" && direction === 1)
      {
        userSquares[randomStart].classList.add('pizza-horizontal', 'square')
      }
    }

    else
    {
      generate(food)
    }
  }

  //const bread = document.createElement('div')
  //bread.setAttribute("class", "bread")
  //bread.setAttribute("draggable", "true")

  generate(foodArray[0]) // generate bread on the board
  generate(foodArray[1])
  generate(foodArray[2])
  generate(foodArray[3])
  generate(foodArray[4])

})