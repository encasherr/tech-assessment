// export let Version1 = "A";
// export const Version2 = "B";
// export var Version3 = "C";
// export default Version1 = Version3;
console.log("A B C");
export default () => {
    console.log("C B A");
    return console.log("P Q R");
}