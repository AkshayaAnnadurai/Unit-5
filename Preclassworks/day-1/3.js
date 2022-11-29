let nums=process.argv.slice(2)
let r=0
for(let i=0;i<nums.length;i++){
    r+=Number(nums[i])
}
console.log(r)