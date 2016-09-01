

var grades = [100,75,99,69,102,55,88];


function addGrade(grade,g) {
   grade.push(g);
   debugger;
}

addGrade(grades,75);
console.log(grades);


function add(grade,g) {
   grade = [100,75,99,69,102,55,88,75];
}

add(grades,77);
console.log(grades);
