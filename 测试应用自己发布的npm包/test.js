const { readDir } = require("chenlingnodefspromise");

async function test(){
  const data = await readDir("../");
  console.log(data);
}
test();