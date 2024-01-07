class Tuple {
  constructor(list) {
    this.repr = list.join();
  }

  hash() {
    return this.repr;
  }

  getValues() {
    // returns a list of the values in the tuple
    const valueStrings = this.repr.split(',');
    let values = [];
    for (const vs of valueStrings) {
      // convert the string value into the Number (integer) value -- changing type!
      values.push(Number(vs));
    }
    return values;
  }

  getValue(index) {
    return this.getValues()[index];
  }
}
