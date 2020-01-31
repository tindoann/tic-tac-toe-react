import React from 'react';
import ReactDOM from 'react-dom';

// the square component renders a single <button> </button>
// we’ll pass down a function from the Board to the Square, and 
//we’ll have Square call that function when a square is clicked.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );  
}

// best approach is to store the game’s state in the parent Board component instead of in each Square.
// The Board component can tell each Square what to display by passing a prop
// To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead.
// The parent component can pass the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component.

// set the initial state, squares is 9 blank spaces
// store the current value of the Square in this.state
// changes when the Square is clicked
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

// By calling this.setState from an onClick handler in the Square’s render method, 
// we tell React to re-render that Square whenever its <button> is clicked.

//When you call setState in a component, React automatically updates the child components inside of it too.
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  
// Each Square will now receive a value prop that will either be 'X', 'O', or null for empty squares.
// Now we’re passing down two props from Board to Square: value and onClick. 
// The onClick prop is a function that Square can call when clicked. 
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} 
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); 
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// When a Square is clicked, the onClick function provided by the Board is called. Here’s a review of how this is achieved:

// The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
// When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
// This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
// Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
// We have not defined the handleClick() method yet, so our code crashes. If you click a square now, you should see a red error screen saying something like “this.handleClick is not a 