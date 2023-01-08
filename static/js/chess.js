// filling the board with black or white cells

function cellFilling() {
    for (let i = 0; i < 64; i++) {
        let value = i + Math.floor(i/8);
        let cell = document.createElement('div');
        cell.id = 'cell';
        if (value % 2 == 0) {
            cell.className = 'white_cell';
        } else {
            cell.className = 'black_cell';
        }
        cell.addEventListener('click', (f) => {
            for (elem of chessCells) {
                elem.style.border = '0px';
                placePieces(board);
            }
            f.preventDefault();
            cell.style.border = '7px double yellow';
            for (let key in getLegalMoves(board)) {
                if (key[0]+key[1] == numberToCoordinate[i%8+8]+numberToCoordinate[Math.floor(i/8)])
                {
                    let coord = coordinatesToNumber[key[2]] + coordinatesToNumber[key[3]]*8;
                    if (chessCells[coord].innerHTML.length > 0) {
                        chessCells[coord].innerHTML += ' <div id="circle_red"></div>';
                    } else {
                        chessCells[coord].innerHTML += ' <div id="circle_black"></div>';
                    }
                }
            }
        })
        chessBoard.append(cell);
    }
}

function placeHints() {
    chessBoard.innerHTML += '<p style="position: absolute; top: 23px; left: 200px; zoom: 2">8</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 68px; left: 200px; zoom: 2">7</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 113px; left: 200px; zoom: 2">6</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 158px; left: 200px; zoom: 2">5</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 203px; left: 200px; zoom: 2">4</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 247px; left: 200px; zoom: 2">3</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 293px; left: 200px; zoom: 2">2</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 337px; left: 200px; zoom: 2">1</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 375px; left: 238px; zoom: 2">a</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 375px; left: 283px; zoom: 2">b</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 375px; left: 328px; zoom: 2">c</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 375px; left: 373px; zoom: 2">d</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 375px; left: 418px; zoom: 2">e</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 375px; left: 465px; zoom: 2">f</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 375px; left: 510px; zoom: 2">g</p>';
    chessBoard.innerHTML += '<p style="position: absolute; top: 375px; left: 555px; zoom: 2">h</p>';
    shield.style.display = 'none';
}

function placePieces(board) {
    for (let i = 0; i < 64; i++) {
        switch (board[i]) {
            case '.':
                chessCells[i].innerHTML = '';
                break;
            case 'p':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/black_pawn.png">';
                break;
            case 'r':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/black_rook.png">';
                break;
            case 'n':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/black_knight.png">';
                break;
            case 'b':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/black_bishop.png">';
                break;
            case 'q':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/black_queen.png">';
                break;
            case 'k':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/black_king.png">';
                break;
            case 'P':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/white_pawn.png">';
                break;
            case 'R':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/white_rook.png">';
                break;
            case 'N':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/white_knight.png">';
                break;
            case 'B':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/white_bishop.png">';
                break;
            case 'Q':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/white_queen.png">';
                break;
            case 'K':
                chessCells[i].innerHTML = '<img class="piece" src="../static/img/white_king.png">';
                break;
        }
    }
}

function checkMove(pos1, pos2) {
    pseudoBoard = [...board];
    pseudoBoard[pos2] = pseudoBoard[pos1];
    pseudoBoard[pos1] = '.';
    if (whiteKingSafety(pseudoBoard) && chessRound%2==1) {
        return numberToCoordinate[pos1%8+8]+numberToCoordinate[Math.floor(pos1/8)]+numberToCoordinate[pos2%8+8]+numberToCoordinate[Math.floor(pos2/8)]
    } else if (blackKingSafety(pseudoBoard) && chessRound%2==0) {
        return numberToCoordinate[pos1%8+8]+numberToCoordinate[Math.floor(pos1/8)]+numberToCoordinate[pos2%8+8]+numberToCoordinate[Math.floor(pos2/8)]
    }
    return NaN
}

function checkCastle(board) {
    if (board[0] != 'r') {
        black_ooo = false;
    }
    if (board[7] != 'r') {
        black_oo = false;    
    }
    if (board[56] != 'R') {
        white_ooo = false;
    }
    if (board[63] != 'R') {
        white_oo = false;
    }
    if (board[4] != 'k') {
        black_oo = false;
        black_ooo = false;
    }
    if (board[60] != 'K') {
        white_oo = false;
        white_ooo = false;
    }
}

function doMove(board, move, hint = NaN) {
    if (getLegalMoves(board)[move] == undefined) {
        return
    }
    coord1 = (+coordinatesToNumber[move[0]]) + (+coordinatesToNumber[move[1]])*8;
    coord2 = (+coordinatesToNumber[move[2]]) + (+coordinatesToNumber[move[3]])*8;
    if (hint != 'NaN') {
        switch (hint) {
            case 'white_oo':
                board[coord2] = 'K';
                board[coord1+1] = 'R';
                board[63] = board[coord1] = '.';
                break;
            case 'white_ooo':
                board[coord2] = 'K';
                board[coord1-1] = 'R';
                board[56] = board[coord1] = '.';
                break;
            case 'black_oo':
                board[coord2] = 'k';
                board[coord1+1] = 'r';
                board[7] = board[coord1] = '.';
                break;
            case 'black_ooo':
                board[coord2] = 'k';
                board[coord1-1] = 'r';
                board[0] = board[coord1] = '.';
                break;
            case 'whiteEnPassantLeft':
                board[coord2] = board[coord1];
                board[coord1] = board[coord1-1] = '.';
                break;
            case 'blackEnPassantLeft':
                board[coord2] = board[coord1];
                board[coord1] = board[coord1-1] = '.';
                break;
            case 'whiteEnPassantRight':
                board[coord2] = board[coord1];
                board[coord1] = board[coord1+1] = '.';
                break;
            case 'blackEnPassantRight':
                board[coord2] = board[coord1];
                board[coord1] = board[coord1+1] = '.';
                break;
            case 'whitePawnPromote':
                white_div.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    `;
                white_form.addEventListener('submit', (f) => {
                    f.preventDefault();
                    let piece = '';
                    while (piece.length != 1) {
                        let form = new FormData(white_form);
                        piece = form.get('piece');
                    }
                    white_div.style.display = 'none';
                    board[coord1] = '.';
                    board[coord2] = piece.toString();
                    placePieces(board);
                    checkCastle(board);
                    if (isMate(board)) {
                        win(sides[chessRound%2]);
                    }
                    if (isTie(board)) {
                        tie();
                    }
                    if (noMaterial(board)) {
                        tie();
                    }
                })
                break;
            case 'blackPawnPromote':
                black_div.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                `;
                black_form.addEventListener('submit', (f) => {
                    f.preventDefault();
                    let piece = '';
                    while (piece.length != 1) {
                        let form = new FormData(black_form);
                        piece = form.get('piece');
                    }
                    black_div.style.display = 'none';
                    board[coord1] = '.';
                    board[coord2] = piece.toString();
                    if (isMate(board)) {
                        win(sides[chessRound%2]);
                    }
                    if (isTie(board)) {
                        tie();
                    }
                    if (noMaterial(board)) {
                        tie();
                    }
                })
                break;
            case 'whitePawnDoubleMove':
                enPassant[(coord2+8).toString()] = chessRound;
                board[coord2] = board[coord1];
                board[coord1] = '.';
                break;
            case 'blackPawnDoubleMove':
                enPassant[(coord2-8).toString()] = chessRound;
                board[coord2] = board[coord1];
                board[coord1] = '.';
                break;
        }
    } else {
        board[coord2] = board[coord1];
        board[coord1] = '.';
    }
    placePieces(board);
    checkCastle(board);
    chessRound++;
    if (isMate(board)) {
        win(sides[chessRound%2]);
    }
    if (isTie(board)) {
        tie();
    }
    if (noMaterial(board)) {
        tie();
    }
}

function whiteKingSafety(board) {
    kingCoordinate = board.indexOf('K');
    // knight attack
    if ((+kingCoordinate+1)%8 != 1) {
        if (+kingCoordinate > 15) {
            if (board[+kingCoordinate-17] == 'n') {
                return false
            }
        }
        if (+kingCoordinate < 48) {
            if (board[+kingCoordinate+15] == 'n') {
                return false
            }
        }
    }
    if ((+kingCoordinate+1)%8 != 0) {
        if (+kingCoordinate > 15) {
            if (board[+kingCoordinate-15] == 'n') {
                return false
            }
        }
        if (+kingCoordinate < 48) {
            if (board[+kingCoordinate+17] == 'n') {
                return false
            }
        }
    }
    if ((+kingCoordinate+1)%8 != 1 && (+kingCoordinate+1)%8 != 2) {
        if (+kingCoordinate > 7) {
            if (board[+kingCoordinate-10] == 'n') {
                return false
            }
        }
        if (+kingCoordinate < 56) {
            if (board[+kingCoordinate+6] == 'n') {
                return false
            }
        }
    }
    if ((+kingCoordinate+1)%8 != 7 && (+kingCoordinate+1)%8 != 0) {
        if (+kingCoordinate > 7) {
            if (board[+kingCoordinate-6] == 'n') {
                return false
            }
        }
        if (+kingCoordinate < 56) {
            if (board[+kingCoordinate+10] == 'n') {
                return false
            }
        }
    }
    // rook and queen attack
    let coord;
    coord = 1;
    if ((+kingCoordinate+1)%8 != 0) {
        while ((+kingCoordinate + 1 + coord) % 8 != 1) {
            if ((white_pieces+['b', 'p', 'k', 'n']).indexOf(board[+kingCoordinate + coord]) > -1) {
                break
            } else if (['r', 'q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                return false
            }
            coord++;
        }
    }
    coord = -1;
    if ((+kingCoordinate+1)%8 != 1) {
        while ((+kingCoordinate + 1 + coord) % 8 != 0) {
            if ((white_pieces+['b', 'p', 'k', 'n']).indexOf(board[+kingCoordinate + coord]) > -1) {
                break
            } else if (['r', 'q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                return false
            }
            coord--;
        }
    }
    coord = -8;
    if (+kingCoordinate > 7) {
        while (kingCoordinate + coord >= 0) {
            if ((white_pieces+['b', 'p', 'k', 'n']).indexOf(board[+kingCoordinate + coord]) > -1) {
                break
            } else if (['r', 'q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                return false
            };
            coord -= 8;
        }
    }
    coord = 8;
    if (+kingCoordinate < 56) {
        while (+kingCoordinate + coord <= 63) {
            if ((white_pieces+['b', 'p', 'k', 'n']).indexOf(board[+kingCoordinate + coord]) > -1) {
                break
            } else if (['r', 'q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                return false
            }
            coord += 8;
        }
    }
    // pawn attack
    if (+kingCoordinate > 7 && (+kingCoordinate+1)%8 != 1) {
        if (board[+kingCoordinate-9] == 'p') {
            return false
        }
    }
    if (+kingCoordinate > 7 && (+kingCoordinate+1)%8 != 0) {
        if (board[+kingCoordinate-7] == 'p') {
            return false
        }
    }
    // bishop and queen attack
    if (+kingCoordinate > 7) {
        coord = -9;
        if ((+kingCoordinate+1)%8 != 1) {
            while (+kingCoordinate+coord >= 0 && (+kingCoordinate+1+coord)%8 != 0) {
                if ((white_pieces+['r', 'p', 'k', 'n']).indexOf(board[+kingCoordinate + coord]) > -1) {
                    break
                } else if (['b', 'q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                    return false
                }
                coord -= 9;
            }
        }
        coord = -7;
        if ((+kingCoordinate+1)%8 != 0) {
            while (+kingCoordinate+coord >= 0 && (+kingCoordinate+1+coord)%8 != 1) {
                if ((white_pieces+['r', 'p', 'k', 'n']).indexOf(board[+kingCoordinate + coord]) > -1) {
                    break
                } else if (['b', 'q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                    return false
                }
                coord -= 7;
            }
        }
    }
    if (+kingCoordinate < 56) {
        coord = 9;
        if ((+kingCoordinate+1)%8 != 0) {
            while (+kingCoordinate+coord <= 63 && (+kingCoordinate+1+coord)%8 != 1) {
                if ((white_pieces+['r', 'p', 'k', 'n']).indexOf(board[+kingCoordinate + coord]) > -1) {
                    break
                } else if (['b', 'q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                    return false
                }
                coord += 9;
            }
        }
        coord = 7;
        if ((+kingCoordinate+1)%8 != 1) {
            while (+kingCoordinate+coord <= 63 && (+kingCoordinate+1+coord)%8 != 0) {
                if ((white_pieces+['r', 'p', 'k', 'n']).indexOf(board[+kingCoordinate + coord]) > -1) {
                    break
                } else if (['b', 'q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                    return false
                }
                coord += 7;
            }
        }
    }
    // king attack
    if (+kingCoordinate > 7 && (+kingCoordinate+1)%8 != 1) {
        if (board[+kingCoordinate-9] == 'k') {
            return false
        }
    }
    if (+kingCoordinate > 7 && (+kingCoordinate+1)%8 != 0) {
        if (board[+kingCoordinate-7] == 'k') {
            return false
        }
    }
    if (+kingCoordinate > 7) {
        if (board[+kingCoordinate-8] == 'k') {
            return false
        }
    }
    if (+kingCoordinate < 56 && (+kingCoordinate+1)%8 != 1) {
        if (board[+kingCoordinate+7] == 'k') {
            return false
        }
    }
    if (+kingCoordinate < 56 && (+kingCoordinate+1)%8 != 0) {
        if (board[+kingCoordinate+9] == 'k') {
            return false
        }
    }
    if (+kingCoordinate < 56) {
        if (board[+kingCoordinate+8] == 'k') {
            return false
        }
    }
    if ((+kingCoordinate+1)%8 != 1) {
        if (board[+kingCoordinate-1] == 'k') {
            return false
        }
    }
    if ((+kingCoordinate+1)%8 != 0) {
        if (board[+kingCoordinate+1] == 'k') {
            return false
        }
    }
    // if king in safety
    return true
}

function blackKingSafety(board) {
    kingCoordinate = board.indexOf('k');
    // knight attack
    if ((+kingCoordinate+1)%8 != 1) {
        if (+kingCoordinate > 15) {
            if (board[+kingCoordinate-17] == 'N') {
                return false
            }
        }
        if (+kingCoordinate < 48) {
            if (board[+kingCoordinate+15] == 'N') {
                return false
            }
        }
    }
    if ((+kingCoordinate+1)%8 != 0) {
        if (+kingCoordinate > 15) {
            if (board[+kingCoordinate-15] == 'N') {
                return false
            }
        }
        if (+kingCoordinate < 48) {
            if (board[+kingCoordinate+17] == 'N') {
                return false
            }
        }
    }
    if ((+kingCoordinate+1)%8 != 1 && (+kingCoordinate+1)%8 != 2) {
        if (+kingCoordinate > 7) {
            if (board[+kingCoordinate-10] == 'N') {
                return false
            }
        }
        if (+kingCoordinate < 56) {
            if (board[+kingCoordinate+6] == 'N') {
                return false
            }
        }
    }
    if ((+kingCoordinate+1)%8 != 7 && (+kingCoordinate+1)%8 != 0) {
        if (+kingCoordinate > 7) {
            if (board[+kingCoordinate-6] == 'N') {
                return false
            }
        }
        if (+kingCoordinate < 56) {
            if (board[+kingCoordinate+10] == 'N') {
                return false
            }
        }
    }
    // rook and queen attack
    let coord = 1;
    if ((+kingCoordinate+1)%8 != 0) {
        while ((+kingCoordinate + 1 + coord) % 8 != 1) {
            if ((black_pieces+['B', 'P', 'K', 'N']).indexOf(board[+kingCoordinate + coord]) > -1) {
                break
            } else if (['R', 'Q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                return false
            }
            coord++;
        }
    }
    coord = -1;
    if ((+kingCoordinate+1)%8 != 1) {
        while ((+kingCoordinate + 1 + coord) % 8 != 0) {
            if ((black_pieces+['B', 'P', 'K', 'N']).indexOf(board[+kingCoordinate + coord]) > -1) {
                break
            } else if (['R', 'Q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                return false
            }
            coord--;
        }
    }
    coord = -8;
    if (+kingCoordinate > 7) {
        while (kingCoordinate + coord >= 0) {
            if ((black_pieces+['B', 'P', 'N', 'K']).indexOf(board[+kingCoordinate + coord]) > -1) {
                break
            } else if (['R', 'Q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                return false
            }
            coord -= 8;
        }
    }
    coord = 8;
    if (+kingCoordinate < 56) {
        while (+kingCoordinate + coord <= 63) {
            if ((black_pieces+['B', 'P', 'K', 'N']).indexOf(board[+kingCoordinate + coord]) > -1) {
                break
            } else if (['R', 'Q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                return false
            }
            coord += 8;
        }
    }
    // pawn attack
    if (+kingCoordinate < 56 && (+kingCoordinate+1)%8 != 0) {
        if (board[+kingCoordinate+9] == 'P') {
            return false
        }
    }
    if (+kingCoordinate < 56 && (+kingCoordinate+1)%8 != 1) {
        if (board[+kingCoordinate+7] == 'P') {
            return false
        }
    }
    // bishop and queen attack
    if (+kingCoordinate > 7) {
        coord = -9;
        if ((+kingCoordinate+1)%8 != 1) {
            while (+kingCoordinate+coord >= 0 && (+kingCoordinate+1+coord)%8 != 0) {
                if ((black_pieces+['R', 'P', 'K', 'N']).indexOf(board[+kingCoordinate + coord]) > -1) {
                    break
                } else if (['B', 'Q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                    return false
                }
                coord -= 9;
            }
        }
        coord = -7;
        if ((+kingCoordinate+1)%8 != 0) {
            while (+kingCoordinate+coord >= 0 && (+kingCoordinate+1+coord)%8 != 1) {
                if ((black_pieces+['R', 'P', 'K', 'N']).indexOf(board[+kingCoordinate + coord]) > -1) {
                    break
                } else if (['B', 'Q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                    return false
                }
                coord -= 7;
            }
        }
    }
    if (+kingCoordinate < 56) {
        coord = 9;
        if ((+kingCoordinate+1)%8 != 0) {
            while (+kingCoordinate+coord <= 63 && (+kingCoordinate+1+coord)%8 != 1) {
                if ((black_pieces+['R', 'P', 'K', 'N']).indexOf(board[+kingCoordinate + coord]) > -1) {
                    break
                } else if (['B', 'Q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                    return false
                }
                coord += 9;
            }
        }
        coord = 7;
        if ((+kingCoordinate+1)%8 != 1) {
            while (+kingCoordinate+coord <= 63 && (+kingCoordinate+1+coord)%8 != 0) {
                if ((black_pieces+['R', 'P', 'K', 'N']).indexOf(board[+kingCoordinate + coord]) > -1) {
                    break
                } else if (['B', 'Q'].indexOf(board[+kingCoordinate + coord]) > -1) {
                    return false
                }
                coord += 7;
            }
        }
    }
    // king attack
    if (+kingCoordinate > 7 && (+kingCoordinate+1)%8 != 1) {
        if (board[+kingCoordinate-9] == 'K') {
            return false
        }
    }
    if (+kingCoordinate > 7 && (+kingCoordinate+1)%8 != 0) {
        if (board[+kingCoordinate-7] == 'K') {
            return false
        }
    }
    if (+kingCoordinate > 7) {
        if (board[+kingCoordinate-8] == 'K') {
            return false
        }
    }
    if (+kingCoordinate < 56 && (+kingCoordinate+1)%8 != 1) {
        if (board[+kingCoordinate+7] == 'K') {
            return false
        }
    }
    if (+kingCoordinate < 56 && (+kingCoordinate+1)%8 != 0) {
        if (board[+kingCoordinate+9] == 'K') {
            return false
        }
    }
    if (+kingCoordinate < 56) {
        if (board[+kingCoordinate+8] == 'K') {
            return false
        }
    }
    if ((+kingCoordinate+1)%8 != 1) {
        if (board[+kingCoordinate-1] == 'K') {
            return false
        }
    }
    if ((+kingCoordinate+1)%8 != 0) {
        if (board[+kingCoordinate+1] == 'K') {
            return false
        }
    }
    // if king in safety
    return true
}

function getLegalMoves(board) {
    let legalMoves = { };
    for (i in board) {
        if (chessRound % 2 == 1) {
            switch (board[i]) {
                case 'P':
                    if (board[+i-8] == '.') {
                        if (checkMove(+i, +i-8)) {
                            if (i > 7 && i < 16) {
                                legalMoves[checkMove(+i, +i-8)] = 'whitePawnPromote';
                            } else {
                                legalMoves[checkMove(+i, +i-8)] = 'NaN';
                            }
                        }
                    }
                    if (board[+i-8] == '.' && board[+i-16] == '.' && +i <= 55 && +i >= 48) {
                        if (checkMove(+i, +i-16)) {
                            legalMoves[checkMove(+i, +i-16)] = 'whitePawnDoubleMove';
                        }
                    }
                    if ((+i+1)%8 != 1) {
                        if (black_pieces.indexOf(board[+i-9]) > -1) {
                            if (checkMove(+i, +i-9)) {
                                if (i > 7 && i < 16) {
                                    legalMoves[checkMove(+i, +i-9)] = 'whitePawnPromote';
                                } else {
                                    legalMoves[checkMove(+i, +i-9)] = 'NaN';
                                }
                            }
                        } else if (chessRound - enPassant[+i-9] == 1) {
                            if (checkMove(+i, +i-9)) {
                                legalMoves[checkMove(+i, +i-9)] = 'whiteEnPassantLeft';
                            }
                        }
                    }
                    if ((+i+1)%8 != 0) {
                        if (black_pieces.indexOf(board[+i-7]) > -1) {
                            if (checkMove(+i, +i-7)) {
                                if (i > 7 && i < 16) {
                                    legalMoves[checkMove(+i, +i-7)] = 'whitePawnPromote';
                                } else {
                                    legalMoves[checkMove(+i, +i-7)] = 'NaN';
                                }
                            }
                        } else if (chessRound - enPassant[+i-7] == 1) {
                            if (checkMove(+i, +i-7)) {
                                legalMoves[checkMove(+i, +i-7)] = 'whiteEnPassantRight';
                            }
                        }
                    }
                    break;
                case 'R':
                    if ((+i+1)%8 != 0) {
                        coord = 1;
                        while ((+i+1+coord)%8 != 1) {
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord++
                        }
                    }
                    if ((+i+1)%8 != 1) {
                        coord = -1;
                        while ((+i+1+coord)%8 != 0) {
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord--;
                        }
                    }
                    if (+i > 7) {
                        coord = -8;
                        while (+i+coord >= 0) {
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord -= 8;
                        }
                    }
                    if (+i < 56) {
                        coord = 8;
                        while (+i+coord <= 63) {
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord += 8;
                        }
                    }
                    break;
                case 'N':
                    if ((+i+1)%8 != 1) {
                        if (+i > 15) {
                            if (checkMove(+i, +i-17) && white_pieces.indexOf(board[+i-17]) == -1) {
                                legalMoves[checkMove(+i, +i-17)] = 'NaN';
                            }
                        }
                        if (+i < 48) {
                            if (checkMove(+i, +i+15) && white_pieces.indexOf(board[+i+15]) == -1) {
                                legalMoves[checkMove(+i, +i+15)] = 'NaN';
                            }
                        }
                    }
                    if ((+i+1)%8 != 0) {
                        if (+i > 15) {
                            if (checkMove(+i, +i-15) && white_pieces.indexOf(board[+i-15]) == -1) {
                                legalMoves[checkMove(+i, +i-15)] = 'NaN';
                            }
                        }
                        if (+i < 48) {
                            if (checkMove(+i, +i+17) && white_pieces.indexOf(board[+i+17]) == -1) {
                                legalMoves[checkMove(+i, +i+17)] = 'NaN';
                            }
                        }
                    }
                    if ((+i+1)%8 != 1 && (+i+1)%8 != 2) {
                        if (+i > 7) {
                            if (checkMove(+i, +i-10) && white_pieces.indexOf(board[+i-10]) == -1) {
                                legalMoves[checkMove(+i, +i-10)] = 'NaN';
                            }
                        }
                        if (+i < 56) {
                            if (checkMove(+i, +i+6) && white_pieces.indexOf(board[+i+6]) == -1) {
                                legalMoves[checkMove(+i, +i+6)] = 'NaN';
                            }
                        }
                    }
                    if ((+i+1)%8 != 7 && (+i+1)%8 != 0) {
                        if (+i > 7) {
                            if (checkMove(+i, +i-6) && white_pieces.indexOf(board[+i-6]) == -1) {
                                legalMoves[checkMove(+i, +i-6)] = 'NaN';
                            }
                        }
                        if (+i < 56) {
                            if (checkMove(+i, +i+10) && white_pieces.indexOf(board[+i+10]) == -1) {
                                legalMoves[checkMove(+i, +i+10)] = 'NaN';
                            }
                        }
                    }
                    break;
                case 'B':
                    if (+i > 7) {
                        coord = -9;
                        if ((+i+1)%8 != 1) {
                            while (+i+coord >= 0 && (+i+1+coord)%8 != 0) {
                                if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord -= 9;
                            }
                        }
                        coord = -7;
                        if ((+i+1)%8 != 0) {
                            while (+i+coord >= 0 && (+i+1+coord)%8 != 1) {
                                if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord -= 7;
                            }
                        }
                    }
                    if (+i < 56) {
                        coord = 9;
                        if ((+i+1)%8 != 0) {
                            while (+i+coord <= 63 && (+i+1+coord)%8 != 1) {
                                if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord += 9;
                            }
                        }
                        coord = 7;
                        if ((+i+1)%8 != 1) {
                            while (+i+coord <= 63 && (+i+1+coord)%8 != 0) {
                                if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord += 7;
                            }
                        }
                    }
                    break;
                case 'Q':
                    if (+i > 7) {
                        coord = -9;
                        if ((+i+1)%8 != 1) {
                            while (+i+coord >= 0 && (+i+1+coord)%8 != 0) {
                                if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord -= 9;
                            }
                        }
                        coord = -7;
                        if ((+i+1)%8 != 0) {
                            while (+i+coord >= 0 && (+i+1+coord)%8 != 1) {
                                if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord -= 7;
                            }
                        }
                    }
                    if (+i < 56) {
                        coord = 9;
                        if ((+i+1)%8 != 0) {
                            while (+i+coord <= 63 && (+i+1+coord)%8 != 1) {
                                if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord += 9;
                            }
                        }
                        coord = 7;
                        if ((+i+1)%8 != 1) {
                            while (+i+coord <= 63 && (+i+1+coord)%8 != 0) {
                                if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord += 7;
                            }
                        }
                    }
                    if ((+i+1)%8 != 0) {
                        coord = 1;
                        while ((+i+1+coord)%8 != 1) {
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord++
                        }
                    }
                    if ((+i+1)%8 != 1) {
                        coord = -1;
                        while ((+i+1+coord)%8 != 0) {
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord--;
                        }
                    }
                    if (+i > 7) {
                        coord = -8;
                        while (+i+coord >= 0) {
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord -= 8;
                        }
                    }
                    if (+i < 56) {
                        coord = 8;
                        while (+i+coord <= 63) {
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                };
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord += 8;
                        }
                    }
                    break;
                case 'K':
                    if (+i > 7 && (+i+1)%8 != 1) {
                        if (checkMove(+i, +i-9) && white_pieces.indexOf(board[+i-9]) == -1) {
                            legalMoves[checkMove(+i, +i-9)] = 'NaN';
                        }
                    }
                    if (+i > 7 && (+i+1)%8 != 0) {
                        if (checkMove(+i, +i-7) && white_pieces.indexOf(board[+i-7]) == -1) {
                            legalMoves[checkMove(+i, +i-7)] = 'NaN';
                        }
                    }
                    if (+i > 7) {
                        if (checkMove(+i, +i-8) && white_pieces.indexOf(board[+i-8]) == -1) {
                            legalMoves[checkMove(+i, +i-8)] = 'NaN';
                        }
                    }
                    if (+i < 56 && (+i+1)%8 != 1) {
                        if (checkMove(+i, +i+7) && white_pieces.indexOf(board[+i+7]) == -1) {
                            legalMoves[checkMove(+i, +i+7)] = 'NaN';
                        }
                    }
                    if (+i < 56 && (+i+1)%8 != 0) {
                        if (checkMove(+i, +i+9) && white_pieces.indexOf(board[+i+9]) == -1) {
                            legalMoves[checkMove(+i, +i+9)] = 'NaN';
                        }
                    }
                    if (+i < 56) {
                        if (checkMove(+i, +i+8) && white_pieces.indexOf(board[+i+8]) == -1) {
                            legalMoves[checkMove(+i, +i+8)] = 'NaN';
                        }
                    }
                    if ((+i+1)%8 != 1) {
                        if (checkMove(+i, +i-1) && white_pieces.indexOf(board[+i-1]) == -1) {
                            legalMoves[checkMove(+i, +i-1)] = 'NaN';
                        }
                    }
                    if ((+i+1)%8 != 0) {
                        if (checkMove(+i, +i+1) && white_pieces.indexOf(board[+i+1]) == -1) {
                            legalMoves[checkMove(+i, +i+1)] = 'NaN';
                        }
                    }
                    if (board[+i+1] == '.' && board[+i+2] == '.' && white_oo) {
                        if (checkMove(+i, +i+1) && checkMove(+i+1, +i+2)) {
                            legalMoves[checkMove(+i, +i+2)] = 'white_oo';
                        }
                    }
                    if (board[+i-1] == '.' && board[+i-2] == '.' && board[+i-3] == '.' && white_ooo) {
                        if (checkMove(+i, +i-1) && checkMove(+i-1, +i-2)) {
                            legalMoves[checkMove(+i, +i-2)] = 'white_ooo';
                        }
                    }
                    break;
            }
        } else {
            switch (board[i]) {
                case 'p':
                    if (board[+i+8] == '.') {
                        if (checkMove(+i, +i+8)) {
                            if (i < 56 && i > 47) {
                                legalMoves[checkMove(+i, +i+8)] = 'blackPawnPromote';
                            } else {
                                legalMoves[checkMove(+i, +i+8)] = 'NaN';
                            }
                        }
                    }
                    if (board[+i+8] == '.' && board[+i+16] == '.' && +i <= 15 && +i >= 8) {
                        if (checkMove(+i, +i+16)) {
                            legalMoves[checkMove(+i, +i+16)] = 'blackPawnDoubleMove';
                        }
                    }
                    if ((+i+1)%8 != 1) {
                        if (white_pieces.indexOf(board[+i+7]) > -1) {
                            if (checkMove(+i, +i+7)) {
                                if (i < 56 && i > 47) {
                                    legalMoves[checkMove(+i, +i+7)] = 'blackPawnPromote';
                                } else {
                                    legalMoves[checkMove(+i, +i+7)] = 'NaN';
                                }
                            }
                        } else if (chessRound - enPassant[+i+7] == 1) {
                            if (checkMove(+i, +i+7)) {
                                legalMoves[checkMove(+i, +i+7)] = 'blackEnPassantLeft';
                            }
                        }
                    }
                    if ((+i+1)%8 != 0) {
                        if (white_pieces.indexOf(board[+i+9]) > -1) {
                            if (checkMove(+i, +i+9)) {
                                if (i < 56 && i > 47) {
                                    legalMoves[checkMove(+i, +i+9)] = 'blackPawnPromote';
                                } else {
                                    legalMoves[checkMove(+i, +i+9)] = 'NaN';
                                }
                            }
                        } else if (chessRound - enPassant[+i+9] == 1) {
                            if (checkMove(+i, +i+9)) {
                                legalMoves[checkMove(+i, +i+9)] = 'blackEnPassantRight';
                            }
                        }
                    }
                    break;
                case 'r':
                    if ((+i+1)%8 != 0) {
                        coord = 1;
                        while ((+i+1+coord)%8 != 1) {
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord++
                        }
                    }
                    if ((+i+1)%8 != 1) {
                        coord = -1;
                        while ((+i+1+coord)%8 != 0) {
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord--;
                        }
                    }
                    if (+i > 7) {
                        coord = -8;
                        while (+i+coord >= 0) {
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord -= 8;
                        }
                    }
                    if (+i < 56) {
                        coord = 8;
                        while (+i+coord <= 63) {
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord += 8;
                        }
                    }
                    break;
                case 'n':
                    if ((+i+1)%8 != 1) {
                        if (+i > 15) {
                            if (checkMove(+i, +i-17) && black_pieces.indexOf(board[+i-17]) == -1) {
                                legalMoves[checkMove(+i, +i-17)] = 'NaN';
                            }
                        }
                        if (+i < 48) {
                            if (checkMove(+i, +i+15) && black_pieces.indexOf(board[+i+15]) == -1) {
                                legalMoves[checkMove(+i, +i+15)] = 'NaN';
                            }
                        }
                    }
                    if ((+i+1)%8 != 0) {
                        if (+i > 15) {
                            if (checkMove(+i, +i-15) && black_pieces.indexOf(board[+i-15]) == -1) {
                                legalMoves[checkMove(+i, +i-15)] = 'NaN';
                            }
                        }
                        if (+i < 48) {
                            if (checkMove(+i, +i+17) && black_pieces.indexOf(board[+i+17]) == -1) {
                                legalMoves[checkMove(+i, +i+17)] = 'NaN';
                            }
                        }
                    }
                    if ((+i+1)%8 != 1 && (+i+1)%8 != 2) {
                        if (+i > 7) {
                            if (checkMove(+i, +i-10) && black_pieces.indexOf(board[+i-10]) == -1) {
                                legalMoves[checkMove(+i, +i-10)] = 'NaN';
                            }
                        }
                        if (+i < 56) {
                            if (checkMove(+i, +i+6) && black_pieces.indexOf(board[+i+6]) == -1) {
                                legalMoves[checkMove(+i, +i+6)] = 'NaN';
                            }
                        }
                    }
                    if ((+i+1)%8 != 7 && (+i+1)%8 != 0) {
                        if (+i > 7) {
                            if (checkMove(+i, +i-6) && black_pieces.indexOf(board[+i-6]) == -1) {
                                legalMoves[checkMove(+i, +i-6)] = 'NaN';
                            }
                        }
                        if (+i < 56) {
                            if (checkMove(+i, +i+10) && black_pieces.indexOf(board[+i+10]) == -1) {
                                legalMoves[checkMove(+i, +i+10)] = 'NaN';
                            }
                        }
                    }
                    break;
                case 'b':
                    if (+i > 7) {
                        coord = -9;
                        if ((+i+1)%8 != 1) {
                            while (+i+coord >= 0 && (+i+1+coord)%8 != 0) {
                                if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord -= 9;
                            }
                        }
                        coord = -7;
                        if ((+i+1)%8 != 0) {
                            while (+i+coord >= 0 && (+i+1+coord)%8 != 1) {
                                if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord -= 7;
                            }
                        }
                    }
                    if (+i < 56) {
                        coord = 9;
                        if ((+i+1)%8 != 0) {
                            while (+i+coord <= 63 && (+i+1+coord)%8 != 1) {
                                if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord += 9;
                            }
                        }
                        coord = 7;
                        if ((+i+1)%8 != 1) {
                            while (+i+coord <= 63 && (+i+1+coord)%8 != 0) {
                                if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord += 7;
                            }
                        }
                    }
                    break;
                case 'q':
                    if (+i > 7) {
                        coord = -9;
                        if ((+i+1)%8 != 1) {
                            while (+i+coord >= 0 && (+i+1+coord)%8 != 0) {
                                if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord -= 9;
                            }
                        }
                        coord = -7;
                        if ((+i+1)%8 != 0) {
                            while (+i+coord >= 0 && (+i+1+coord)%8 != 1) {
                                if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    }
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord -= 7;
                            }
                        }
                    }
                    if (+i < 56) {
                        coord = 9;
                        if ((+i+1)%8 != 0) {
                            while (+i+coord <= 63 && (+i+1+coord)%8 != 1) {
                                if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    };
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord += 9;
                            }
                        }
                        coord = 7;
                        if ((+i+1)%8 != 1) {
                            while (+i+coord <= 63 && (+i+1+coord)%8 != 0) {
                                if (black_pieces.indexOf(board[+i + coord]) > -1) {
                                    break;
                                } else if (white_pieces.indexOf(board[+i + coord]) > -1) {
                                    if (checkMove(+i, +i+coord)) {
                                        legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                    };
                                    break;
                                }
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                coord += 7;
                            }
                        }
                    }
                    if ((+i+1)%8 != 0) {
                        coord = 1;
                        while ((+i+1+coord)%8 != 1) {
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord++;
                        }
                    }
                    if ((+i+1)%8 != 1) {
                        coord = -1;
                        while ((+i+1+coord)%8 != 0) {
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord--;
                        }
                    }
                    if (+i > 7) {
                        coord = -8;
                        while (+i+coord >= 0) {
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord -= 8;
                        }
                    }
                    if (+i < 56) {
                        coord = 8;
                        while (+i+coord <= 63) {
                            if (black_pieces.indexOf(board[+i+coord]) > -1) {
                                break;
                            }
                            if (white_pieces.indexOf(board[+i+coord]) > -1) {
                                if (checkMove(+i, +i+coord)) {
                                    legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                                }
                                break;
                            }
                            if (checkMove(+i, +i+coord)) {
                                legalMoves[checkMove(+i, +i+coord)] = 'NaN';
                            }
                            coord += 8;
                        }
                    }
                    break;
                case 'k':
                    if (+i > 7 && (+i+1)%8 != 1) {
                        if (checkMove(+i, +i-9) && black_pieces.indexOf(board[+i-9]) == -1) {
                            legalMoves[checkMove(+i, +i-9)] = 'NaN';
                        }
                    }
                    if (+i > 7 && (+i+1)%8 != 0) {
                        if (checkMove(+i, +i-7) && black_pieces.indexOf(board[+i-7]) == -1) {
                            legalMoves[checkMove(+i, +i-7)] = 'NaN';
                        }
                    }
                    if (+i > 7) {
                        if (checkMove(+i, +i-8) && black_pieces.indexOf(board[+i-8]) == -1) {
                            legalMoves[checkMove(+i, +i-8)] = 'NaN';
                        }
                    }
                    if (+i < 56 && (+i+1)%8 != 1) {
                        if (checkMove(+i, +i+7) && black_pieces.indexOf(board[+i+7]) == -1) {
                            legalMoves[checkMove(+i, +i+7)] = 'NaN';
                        }
                    }
                    if (+i < 56 && (+i+1)%8 != 0) {
                        if (checkMove(+i, +i+9) && black_pieces.indexOf(board[+i+9]) == -1) {
                            legalMoves[checkMove(+i, +i+9)] = 'NaN';
                        }
                    }
                    if (+i < 56) {
                        if (checkMove(+i, +i+8) && black_pieces.indexOf(board[+i+8]) == -1) {
                            legalMoves[checkMove(+i, +i+8)] = 'NaN';
                        }
                    }
                    if ((+i+1)%8 != 1) {
                        if (checkMove(+i, +i-1) && black_pieces.indexOf(board[+i-1]) == -1) {
                            legalMoves[checkMove(+i, +i-1)] = 'NaN';
                        }
                    }
                    if ((+i+1)%8 != 0) {
                        if (checkMove(+i, +i+1) && black_pieces.indexOf(board[+i+1]) == -1) {
                            legalMoves[checkMove(+i, +i+1)] = 'NaN';
                        }
                    }
                    if (board[+i+1] == '.' && board[+i+2] == '.' && black_oo) {
                        if (checkMove(+i, +i+1) && checkMove(+i+1, +i+2)) {
                            legalMoves[checkMove(+i, +i+2)] = 'black_oo';
                        }
                    }
                    if (board[+i-1] == '.' && board[+i-2] == '.' && board[+i-3] == '.' && black_ooo) {
                        if (checkMove(+i, +i-1) && checkMove(+i-1, +i-2)) {
                            legalMoves[checkMove(+i, +i-2)] = 'black_ooo';
                        }
                    }
                    break;
            }
        }
    }
    // legal moves
    return legalMoves
}

function isMate(board) {
    let count = 0;
    for (let key in getLegalMoves(board)) {
        count++;
    }
    if (count == 0) {
        if (chessRound%2 == 1 && !whiteKingSafety(board)) {
            return true
        } else if (chessRound%2 == 0 && !blackKingSafety(board)) {
            return true
        }
    }
    return false
}

function noMaterial(board) {
    let countW = [];
    let countB = [];
    for (let i in board) {
        if (['p', 'P', 'r', 'R', 'q', 'Q'].indexOf(board[i]) > -1) {
            return false
        }
        if (board[i] == 'n' && countB.indexOf('n') == -1) {
            countB.push('n');
        } else if (board[i] == 'b') {
            countB.push(i%8+Math.floor(i/8));
        }
        if (board[i] == 'N' && countW.indexOf('N') == -1) {
            countW.push('N');
        } else if (board[i] == 'B') {
            countW.push(i%8+Math.floor(i/8));
        }
    }
    if (countB.indexOf('n') > -1 && countB.length > 1) {
        return false
    }
    if (countW.length > -1 && countW.length > 1) {
        return false
    }
    if (countW.length > 2 || countB.length > 2) {
        return false
    }
    if ((+countB[0] - +countB[1]) % 2 != 0 && countB.length == 2) {
        return false
    }
    if ((+countW[0] - +countW[1]) % 2 != 0 && countW.length == 2) {
        return false
    }
    return true
}

function isTie(board) {
    let count = 0;
    for (let _ in getLegalMoves(board)) {
        count++;
    }
    if (count == 0) {
        if (chessRound%2 == 1 && whiteKingSafety(board)) {
            return true
        }
        if (chessRound%2 == 0 && blackKingSafety(board)) {
            return true
        }
    }
    return false
}

function win(winner) {
    if (chessRound%2==1) {
        chessCells[board.indexOf('K')].style.border = '8px double red';
    } else {
        chessCells[board.indexOf('k')].style.border = '8px double red';
    }
    let screen = document.createElement('div');
    screen.className = 'shadow';
    screen.innerHTML = `
        <form class='endscreen'>
            <input type='text' readonly value='${winner} Wins!'>
            <input type='submit' value='Close'>
        </form>
    `;
    document.body.append(screen);
    const winForm = document.body.querySelectorAll('.shadow .endscreen')[2];
    winForm.addEventListener('submit', (f) => {
            f.preventDefault();
            screen.style.display = 'none';
            shield.style.display = 'block';
        })
}

function tie(info='Tie!') {
    let screen = document.createElement('div');
    screen.className = 'shadow';
    screen.innerHTML = `
    <form class='endscreen'>
            <input type='text' readonly value='${info}'>
            <input type='submit' value='Close'>
        </form>
        `;
        document.body.querySelector('.shadow .endscreen').addEventListener('submit', (f) => {
        f.preventDefault();
        screen.display = 'none';
    })
    document.body.append(screen);
    const tieForm = document.body.querySelectorAll('.shadow .endscreen')[2];
    tieForm.addEventListener('submit', (f) => {
            f.preventDefault();
            screen.style.display = 'none';
            shield.style.display = 'block';
        })
}

function GAME() {
    let move = '';
    for (let i in chessCells) {
        elem = chessCells[i];
        elem.addEventListener('click', (f) => {
            f.preventDefault();
            if (move.length == 0) {
                move += numberToCoordinate[i%8+8] + numberToCoordinate[Math.floor(i/8)];
            } else {
                let data = numberToCoordinate[i%8+8] + numberToCoordinate[Math.floor(i/8)];
                for (let key in getLegalMoves(board)) {
                    if ((move+data).toString() == key.toString()) {
                        move += data;
                        doMove(board, move, getLegalMoves(board)[move]);
                        break;
                    }
                }
                move = data;
            }
        })
        if (i==63) {
            break;
        }
    }
}

const shield = document.body.querySelector('.shield');
const white_form = document.body.querySelector('#white_pawn_promote .endscreen');
const white_div = document.body.querySelector('#white_pawn_promote');
const black_form = document.body.querySelector('#black_pawn_promote .endscreen');
const black_div = document.body.querySelector('#black_pawn_promote');
const sides = ['White', 'Black'];
const numberToCoordinate = ['8', '7', '6', '5', '4', '3', '2', '1', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const black_pieces = ['q', 'r', 'b', 'n', 'p', 'k'];
const white_pieces = ['Q', 'R', 'B', 'N', 'P', 'K'];
const coordinatesToNumber = {
    'a' : 0,
    'b' : 1,
    'c' : 2,
    'd' : 3,
    'e' : 4,
    'f' : 5,
    'g' : 6,
    'h' : 7,
    '1' : 7,
    '2' : 6,
    '3' : 5,
    '4' : 4,
    '5' : 3,
    '6' : 2,
    '7' : 1,
    '8' : 0,
};

let choose;
let white_oo = true;
let white_ooo = true;
let black_oo = true;
let black_ooo = true;
let chessRound = 1;
let pseudoBoard;
let enPassant = {
    '16' : -1,
    '17' : -1,
    '18' : -1,
    '19' : -1,
    '20' : -1,
    '21' : -1,
    '22' : -1,
    '23' : -1,
    '40' : -1,
    '41' : -1,
    '42' : -1,
    '43' : -1,
    '44' : -1,
    '45' : -1,
    '46' : -1,
    '47' : -1,
};
let board = [
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    '.', '.', '.', '.', '.', '.', '.', '.',
    '.', '.', '.', '.', '.', '.', '.', '.',
    '.', '.', '.', '.', '.', '.', '.', '.',
    '.', '.', '.', '.', '.', '.', '.', '.',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
];

const chessBoard = document.body.querySelector('.chess_board');
placeHints();
cellFilling();
const chessCells = chessBoard.querySelectorAll('#cell');

placePieces(board);

GAME();