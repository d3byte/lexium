export const shuffle = array => {
    let counter = array.length
    const copy = array.slice(0)
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter)
        counter--
        let temp = copy[counter]
        copy[counter] = copy[index]
        copy[index] = temp
    }
  
    return copy
  }