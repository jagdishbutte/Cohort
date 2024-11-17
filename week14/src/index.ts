// function sum(a : number, b : number){
//     console.log(a+b);
// }

// sum(5, 10);


// function legal(age: number): boolean{
//     if(age>20){
//         return true
//     }
//     else{
//         return false
//     }
// }

// let ans = legal(25);
// console.log(ans);

// function delayedCall(fn: ()=> void){
//     setTimeout(fn, 1000);
// }

// delayedCall(function log(){
//     console.log("Appeared after 1 sec delay");
// })



/*
Types and Interfaces
*/


// interface UserA  {
//     name: string;
//     age: number;
// }

// interface UserB {
//     name: string;
//     email: string;
//     phone: number;
// }

// type AunionB = UserA | UserB;

// let usera : AunionB = {
//     name: "jagdish",
//     age: 21,
//     email: "james@gmail",
// }

// type AintersectionB = UserA & UserB;

// let userb : AintersectionB = {
//     name: "James",
//     age: 22,
//     email: "james@outlook",
//     phone: 7888,
// }


//enums
enum Direction {
    Up = "UP",
    Down = "Down",
    Left = "Left",
    Right = 'Right'
}

function doSomething(keyPressed: Direction) {
	// do something.
}

console.log(doSomething(Direction.Down));
