function test(){}
// @test
class Person {
    constructor(){
        this.name = "陈玲";
        this.age = 18;
    }
}


const my = new Person();
console.log(my);

module.exports={
    test: test,
    person: Person
}