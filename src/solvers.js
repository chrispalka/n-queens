/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function (n) {
  var solution = []; //new Board({ 'n': n });

  for (var i = 0; i < n; i++) {
    let singleArray = [];
    for (var j = 0; j < n; j++) {
      if (i === j) {
        singleArray.push(1);
      } else {
        singleArray.push(0);
      }
    }
    solution.push(singleArray);
  }
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  let board = new Board({ n });
  var solutionCount = 0;

  let recursiveChecker = function (funcBoard, row = 0) {
    if (row >= funcBoard.rows().length) {
      solutionCount++;
      // console.log('Solution found!', solutionCount);
      return;
    }
    for (var j = 0; j < funcBoard.rows().length; j++) {
      // console.log(`toggling piece on row: ${row} column: ${j}`);
      funcBoard.togglePiece(row, j);
      if (!funcBoard.hasAnyRooksConflicts()) {
        // console.log('Conflict exists, toggling piece back to 0');
        recursiveChecker(funcBoard, row + 1);
      }
      funcBoard.togglePiece(row, j);
    }
  };

  recursiveChecker(board);

  console.log("Number of solutions for " + n + " rooks:", solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  let solution = new Board({ n: n });

  if (n === 0 || n === 2 || n === 3) {
    return solution.rows();
  }
  let recursiveChecker = function (index) {
    solution = new Board({ n: n });
    let pieces = 0;
    if (index === n) {
      return;
    }
    for (let i = 0; i < n; i++) {
      for (let j = i === 0 ? index : 0; j < n; j++) {
        solution.togglePiece(i, j);
        pieces++;
        if (solution.hasAnyQueensConflicts()) {
          solution.togglePiece(i, j);
          pieces--;
        }
      }
    }
    console.log(solution.rows());
    return pieces;
  };
  for (let i = 0; i < n; i++) {
    if (recursiveChecker(i) === n) {
      break;
    }
  }

  console.log(
    "Single solution for " + n + " queens:",
    JSON.stringify(solution)
  );
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0;
  let board = new Board({ n });

  let recursiveChecker = function (funcBoard, row = 0) {
    if (row >= funcBoard.rows().length) {
      solutionCount++;
      // console.log('Solution found!', solutionCount);
      return;
    }
    for (var j = 0; j < funcBoard.rows().length; j++) {
      // console.log(`toggling piece on row: ${row} column: ${j}`);
      funcBoard.togglePiece(row, j);
      if (!funcBoard.hasAnyQueensConflicts()) {
        // console.log(funcBoard.rows());
        recursiveChecker(funcBoard, row + 1);
      }
      // console.log('Conflict exists, toggling piece back to 0');
      funcBoard.togglePiece(row, j);
    }
  };

  recursiveChecker(board);

  console.log("Number of solutions for " + n + " queens:", solutionCount);
  return solutionCount;
};
