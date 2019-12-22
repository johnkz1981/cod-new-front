export const unserialize = function(serializedString){
  var str = decodeURI(serializedString);
  var pairs = str.split('&');
  var obj = {}, p, idx, val;
  for (var i=0, n=pairs.length; i < n; i++) {
    p = pairs[i].split('=');
    idx = p[0];

    if (idx.indexOf('[]') === (idx.length - 2)) {
      let ind = idx.substring(0, idx.length-2);

      if (obj[ind] === undefined) {
        obj[ind] = [];
      }
      obj[ind].push(p[1]);
    }
    else {
      obj[idx] = p[1];
    }
  }
  return obj;
};

export function pagination(c, m) {
  var current = c,
      last = m,
      delta = 3,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || i >= left && i < right) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}