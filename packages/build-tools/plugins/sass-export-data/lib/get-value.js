const sass = require('sass')

function getValue(a) {
  let value;
  let i;

  if (a instanceof sass.types.List) {
      value = [];
      for (i = 0; i < a.getLength(); i++) {
        value.push(getValue(a.getValue(i)));
      }
  } else if (a instanceof sass.types.Map) {
      value = {};
      for (i = 0; i < a.getLength(); i++) {
        value[a.getKey(i).getValue()] = getValue(a.getValue(i));
      }
  } else if (a instanceof sass.types.Color) {
      if (a.getA() === 1) {
        value = `rgb(${Math.round(a.getR())}, ${Math.round(
          a.getG(),
        )}, ${Math.round(a.getB())})`;
      } else {
        value = `rgba(${Math.round(a.getR())}, ${Math.round(
          a.getG(),
        )}, ${Math.round(a.getB())}, ${a.getA()})`;
      }
  } else if (a instanceof sass.types.Number) {
      value = a.getValue();
      if (a.getUnit()) {
        value += a.getUnit();
      }
  } else {
      value = a.getValue();
  }
  return value;
}

module.exports = getValue;
