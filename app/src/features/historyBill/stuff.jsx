let curr = new Date()
  curr.setDate(curr.getDate())
  // let currDate = curr.toISOString().substring(0,10)
  let currDate = curr.toLocaleDateString()
  let currTime = curr.toLocaleTimeString()
  console.log(currDate)
  console.log(currTime)