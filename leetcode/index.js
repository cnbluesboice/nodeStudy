function twoSum(nums, target) {
    console.log(nums, target)
    // 枚举数组中是否存在target-x的数，每一个数都要进行相减后判断，但是X之前的数是不需要判断的
    const result = [];
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] + nums[i] == target) {
                result.push(i);
                result.push(j);
            }
        }
    }
    return result;
}

console.log(twoSum([2, 3, 5, 2, 4, 6], 10));

function reverseIntNum(num) {
    
}