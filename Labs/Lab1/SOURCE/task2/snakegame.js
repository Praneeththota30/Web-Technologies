angular.module('Snake', [])
    .controller('snakeCtrl', function($scope, $timeout, $window) {
        const BOARD_SIZE = 20;

        const DIRECTIONS = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40
        };

        const COLORS = {
            GAME_OVER: '#445859',
            FRUIT: '#E26758',
            SNAKE_HEAD: '#396F7A',
            SNAKE_BODY: '#396F7A',
            BOARD: '#88B3BA'
        };

        let snake = {
            direction: DIRECTIONS.LEFT,
            parts: [{
                x: -1,
                y: -1
            }]
        };

        let fruit = {
            x: -1,
            y: -1
        };

        let interval, tempDirection, isGameOver;

        $scope.score = 0;
        $scope.bestScore = 0;

        $scope.setStyling = function(col, row) {
            if (isGameOver)  {
                return COLORS.GAME_OVER;
            } else if (fruit.x == row && fruit.y == col) {
                return COLORS.FRUIT;
            } else if (snake.parts[0].x == row && snake.parts[0].y == col) {
                return COLORS.SNAKE_HEAD;
            } else if ($scope.board[col][row] === true) {
                return COLORS.SNAKE_BODY;
            }
            return COLORS.BOARD;
        };

        function update() {
            const newHead = getNewHead();

            if (boardCollision(newHead) || selfCollision(newHead)) {
                return gameOver();
            } else if (fruitCollision(newHead)) {
                eatFruit();
            }

            // Remove tail
            const oldTail = snake.parts.pop();
            $scope.board[oldTail.y][oldTail.x] = false;

            // Pop tail to head
            snake.parts.unshift(newHead);
            $scope.board[newHead.y][newHead.x] = true;

            // Do it again
            snake.direction = tempDirection;
            $timeout(update, interval);
        }

        function getNewHead() {
            const newHead = angular.copy(snake.parts[0]);

            // Update Location
            if (tempDirection === DIRECTIONS.LEFT) {
                newHead.x -= 1;
            } else if (tempDirection === DIRECTIONS.RIGHT) {
                newHead.x += 1;
            } else if (tempDirection === DIRECTIONS.UP) {
                newHead.y -= 1;
            } else if (tempDirection === DIRECTIONS.DOWN) {
                newHead.y += 1;
            }
            return newHead;
        }

        function boardCollision(part) {
            return part.x === BOARD_SIZE || part.x === -1 || part.y === BOARD_SIZE || part.y === -1;
        }

        function selfCollision(part) {
            return $scope.board[part.y][part.x] === true;
        }

        function fruitCollision(part) {
            return part.x === fruit.x && part.y === fruit.y;
        }

        function resetFruit() {
            const x = Math.floor(Math.random() * BOARD_SIZE);
            const y = Math.floor(Math.random() * BOARD_SIZE);

            if ($scope.board[y][x] === true) {
                return resetFruit();
            }
            fruit = {x: x, y: y};
        }

        function eatFruit() {
            $scope.score++;

            // Grow by 1
            const tail = angular.copy(snake.parts[snake.parts.length - 1]);
            snake.parts.push(tail);
            resetFruit();

            if ($scope.score % 5 === 0) {
                interval -= 15;
            }
        }

        function gameOver() {
            isGameOver = true;

            if ($scope.score > $scope.bestScore) {
                $scope.bestScore = $scope.score;
            }

            $timeout(function() {
                isGameOver = false;
            },500);

            setupBoard();
        }

        function setupBoard() {
            $scope.board = [];
            for (let i = 0; i < BOARD_SIZE; i++) {
                $scope.board[i] = [];
                for (let j = 0; j < BOARD_SIZE; j++) {
                    $scope.board[i][j] = false;
                }
            }
        }
        setupBoard();

        $window.addEventListener("keyup", function(e) {
            if (e.keyCode === DIRECTIONS.LEFT && snake.direction !== DIRECTIONS.RIGHT) {
                tempDirection = DIRECTIONS.LEFT;
            } else if (e.keyCode === DIRECTIONS.UP && snake.direction !== DIRECTIONS.DOWN) {
                tempDirection = DIRECTIONS.UP;
            } else if (e.keyCode === DIRECTIONS.RIGHT && snake.direction !== DIRECTIONS.LEFT) {
                tempDirection = DIRECTIONS.RIGHT;
            } else if (e.keyCode === DIRECTIONS.DOWN && snake.direction !== DIRECTIONS.UP) {
                tempDirection = DIRECTIONS.DOWN;
            }
        });

        $scope.startGame = function() {
            $scope.score = 0;
            snake = {direction: DIRECTIONS.RIGHT, parts: []};
            tempDirection = DIRECTIONS.RIGHT;
            isGameOver = false;
            interval = 150;

            // Set up initial snake
            for (let i = 0; i < 5; i++) {
                snake.parts.push({x: 10 + i, y: 10});
            }
            resetFruit();
            update();
        };
    });