let board: HTMLDivElement | null = document.querySelector(".board");

let win_combinations: string[] = ["123","456","789","147","258","369","159","357"];

let x_o_flag = true;
let winner:string = "";
let win_combination:string = "";

interface XOWin {
  x: string;
  o: string;
}

let x_o_win_obj: XOWin = { x: "", o: "" };

const setSymbol = (event_data: HTMLElement, symbol_to_set: string): void => {
  event_data.textContent = symbol_to_set;
  event_data.classList.add(symbol_to_set);
  x_o_flag = !x_o_flag;
};

function onClickHandler(e:Event) {
    let event_data = e.target as HTMLDivElement;
    let is_clicked: boolean = (event_data.classList.contains("x") || event_data.classList.contains("o"));
  
    if (x_o_flag && !is_clicked) {
      setSymbol(event_data, "x");
      onWriteClickedCellId(event_data.id,"x")
    } else if (!x_o_flag && !is_clicked) {
      setSymbol(event_data, "o");
      onWriteClickedCellId(event_data.id,"o")
    }
  
    if(x_o_win_obj.x.length > 2 || x_o_win_obj.o.length >2){
      onCheckWinCombination()
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

board?.addEventListener("click", onClickHandler);

const onCheckWinCombination = ():void => {
  let sorted_x_coorditane = x_o_win_obj.x.split("").sort().join("");
  let sorted_o_coorditane = x_o_win_obj.o.split("").sort().join("");

  for (const win_comb of win_combinations) {
    console.count("for iterations")
    if(checkIfWinCombIncludesAllWinNumbers(sorted_x_coorditane,win_comb)){ 
      winner = 'x'; win_combination =win_comb;
      return 
    }

    if(checkIfWinCombIncludesAllWinNumbers(sorted_o_coorditane,win_comb)){
      winner = "o"; 
      win_combination = win_comb;
      return
    }
  }

}
function checkIfWinCombIncludesAllWinNumbers(sorted_coorditane:string, win_comb:string){
  for (let i = 0; i < win_comb.length; i++) {
   if(!sorted_coorditane.includes(win_comb[i])) return false
  }
  return true
}

const onWriteClickedCellId = (id:string, key:string):void => {
  x_o_win_obj[key] +=id;
}

const onHighLighWinCells = (win_numbers: string): void => {
  for (const int of win_numbers) {
    (document.getElementById(int) as HTMLDivElement).style.background =
      "lightgreen";
  }
};

const onRemoveEventListener = ():void => {
  board?.removeEventListener("click", onClickHandler);
} 

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
