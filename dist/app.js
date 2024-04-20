var board = document.querySelector(".board");
var win_combinations = ["123", "456", "789", "147", "258", "369", "159", "357"];
var x_o_flag = true;
var winner = "";
var win_combination = "";
var x_o_win_obj = { x: "", o: "" };
var setSymbol = function (event_data, symbol_to_set) {
    event_data.textContent = symbol_to_set;
    event_data.classList.add(symbol_to_set);
    x_o_flag = !x_o_flag;
};
function onClickHandler(e) {
    var event_data = e.target;
    var is_clicked = (event_data.classList.contains("x") || event_data.classList.contains("o"));
    if (x_o_flag && !is_clicked) {
        setSymbol(event_data, "x");
        onWriteClickedCellId(event_data.id, "x");
    }
    else if (!x_o_flag && !is_clicked) {
        setSymbol(event_data, "o");
        onWriteClickedCellId(event_data.id, "o");
    }
    if (x_o_win_obj.x.length > 2 || x_o_win_obj.o.length > 2) {
        onCheckWinCombination();
    }
    switch (winner) {
        case "x":
            alert("X win!");
            onRemoveEventListener();
            onHighLighWinCells(win_combination);
            break;
        case "o":
            alert("O win!");
            onRemoveEventListener();
            onHighLighWinCells(win_combination);
            break;
        default:
            break;
    }
    console.log(x_o_win_obj);
}
board === null || board === void 0 ? void 0 : board.addEventListener("click", onClickHandler);
var onCheckWinCombination = function () {
    var sorted_x_coorditane = x_o_win_obj.x.split("").sort().join("");
    var sorted_o_coorditane = x_o_win_obj.o.split("").sort().join("");
    for (var _i = 0, win_combinations_1 = win_combinations; _i < win_combinations_1.length; _i++) {
        var win_comb = win_combinations_1[_i];
        console.count("for iterations");
        if (checkIfWinCombIncludesAllWinNumbers(sorted_x_coorditane, win_comb)) {
            winner = 'x';
            win_combination = win_comb;
            return;
        }
        if (checkIfWinCombIncludesAllWinNumbers(sorted_o_coorditane, win_comb)) {
            winner = "o";
            win_combination = win_comb;
            return;
        }
    }
};
function checkIfWinCombIncludesAllWinNumbers(sorted_coorditane, win_comb) {
    for (var i = 0; i < win_comb.length; i++) {
        if (!sorted_coorditane.includes(win_comb[i]))
            return false;
    }
    return true;
}
var onWriteClickedCellId = function (id, key) {
    x_o_win_obj[key] += id;
};
var onHighLighWinCells = function (win_numbers) {
    for (var _i = 0, win_numbers_1 = win_numbers; _i < win_numbers_1.length; _i++) {
        var int = win_numbers_1[_i];
        document.getElementById(int).style.background =
            "lightgreen";
    }
};
var onRemoveEventListener = function () {
    board === null || board === void 0 ? void 0 : board.removeEventListener("click", onClickHandler);
};
// board?.addEventListener("click", function (e) {
//   let event_data = e.target as HTMLDivElement;
//   let is_clicked: boolean = !(event_data.classList.contains("x") || event_data.classList.contains("o"));
//   if (x_o_win_obj.o.length < 1 && is_clicked) {
//     if (x_o_flag) {
//       setSymbol(event_data, "x");
//       x_o_win_obj.x += event_data.id;
//       createWinArr(x_o_win_obj.x, "x");
//     } else if (!x_o_flag) {
//       setSymbol(event_data, "o");
//       x_o_win_obj.o += event_data.id;
//       createWinArr(x_o_win_obj.o, "o");
//     }
//   } else if (x_o_flag && is_clicked) {
//     for (const win_str of x_win_arr) {
//         if(win_str.includes(event_data.id) && win_str.includes(x_o_win_obj.x) ){
//             x_o_win_obj.x += event_data.id;
//             break
//         }
//     }
//     setSymbol(event_data, "x");
//   } else if (!x_o_flag && is_clicked) {
//     for (const win_str of o_win_arr) {
//         if(win_str.includes(event_data.id)){
//             x_o_win_obj.o += event_data.id;
//             break
//         }
//     }
//     setSymbol(event_data, "o");
//   }
//   x_o_win_obj.x = x_o_win_obj.x.split("").sort().join("")
//   x_o_win_obj.o = x_o_win_obj.o.split("").sort().join("")
//   console.log(x_o_win_obj);
//   console.log(x_win_arr);
//   console.log(o_win_arr);
//   if(x_o_win_obj.x.length === 3 && x_win_arr.includes(x_o_win_obj.x) ){
//     alert("X WIN")
//     onHighLighWinCells(x_win_arr.find(win=>x_o_win_obj.x === win) || "")
//   }
//   if(x_o_win_obj.o.length ===3 && o_win_arr.includes(x_o_win_obj.o) ){
//     alert("O WIN")
//     onHighLighWinCells(o_win_arr.find(win=>x_o_win_obj.o === win) || "")
//   }
// });
// const onHighLighWinCells = (win_numbers: string): void => {
//   for (const int of win_numbers) {
//     (document.getElementById(int) as HTMLDivElement).style.background =
//       "lightgreen";
//   }
// };
// const createWinArr = (symbol: string, symb_type: string): void => {
//   if (symbol.length === 1 && symb_type === "x") {
//     x_win_arr = [
//       ...win_combinations.filter((win_comb) => win_comb.includes(symbol)),
//     ];
//   } else if (symbol.length === 1 && symb_type === "o") {
//     o_win_arr = [
//       ...win_combinations.filter((win_comb) => win_comb.includes(symbol)),
//     ];
//   }
// };
// if(x_o_win_obj["x"].length >2 &&  x_o_win_obj["x"].length <4){
//     x_o_win_obj.x = x_o_win_obj.x.split("").sort().join("");
//     x_o_win_obj.o = x_o_win_obj.o.split("").sort().join("");
//     for (const win_comb of win_combinations) {
//         if(x_o_win_obj["x"].includes(win_comb) || x_o_win_obj["o"].includes(win_comb)){
//             onHighLighWinCells(win_comb);
//         }
//     }
// }else if(x_o_win_obj["x"].length >=4){
//     x_o_win_obj.x = x_o_win_obj.x.split("").sort().join("");
//     x_o_win_obj.o = x_o_win_obj.o.split("").sort().join("");
//     checkIsSymbolWinner(x_o_win_obj.o);
//     checkIsSymbolWinner(x_o_win_obj.x);
// }
// const checkIsSymbolWinner = (sumbol_str:string):void => {
//     for (const win_str of win_combinations) {
//         let winner = true;
//         for (let i = 0; i < win_str.length; i++) {
//             if(!sumbol_str.includes(win_str[i])){
//                 winner=false;
//                 break
//             }
//         }
//         if(winner){
//             onHighLighWinCells(win_str)
//             break
//         }
//     }
// }
