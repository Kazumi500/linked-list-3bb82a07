class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }
}

export default class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);

    if (!this._head) {
      this._head = node;
    } else {
      this._tail.nextNode = node;
    }

    this._tail = node;
    this.length++;
  }

  prepend(value) {
    const node = new Node(value);

    if (!this._head) {
      this._tail = node;
    } else {
      node.nextNode = this._head;
    }

    this._head = node;
    this.length++;
  }

  size() {
    return this.length;
  }

  head() {
    return this._head?.value;
  }

  tail() {
    return this._tail?.value;
  }

  at(index) {
    if (index < 0 || index >= this.length) return undefined;

    let current = this._head;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }
    return current.value;
  }

  pop() {
    if (!this._head) return undefined;

    const value = this._head.value;
    this._head = this._head.nextNode;
    this.length--;

    if (!this._head) {
      this._tail = null;
    }

    return value;
  }

  contains(value) {
    let current = this._head;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  findIndex(value) {
    let current = this._head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.nextNode;
      index++;
    }
    return -1;
  }

  toString() {
    if (!this._head) return '';

    const parts = [];
    let current = this._head;
    while (current) {
      parts.push(`( ${current.value} )`);
      current = current.nextNode;
    }
    parts.push('null');
    return parts.join(' -> ');
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.length) {
      throw new RangeError(`Index ${index} is out of bounds`);
    }
    if (!values.length) return;

    // Build the chain of new nodes from values
    const first = new Node(values[0]);
    let last = first;
    for (let i = 1; i < values.length; i++) {
      last.nextNode = new Node(values[i]);
      last = last.nextNode;
    }

    if (index === 0) {
      // Insert at head
      last.nextNode = this._head;
      this._head = first;
      if (!this._tail) this._tail = last;
    } else if (index === this.length) {
      // Insert at tail
      this._tail.nextNode = first;
      this._tail = last;
    } else {
      // Insert in the middle
      let prev = this._head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.nextNode;
      }
      last.nextNode = prev.nextNode;
      prev.nextNode = first;
    }

    this.length += values.length;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) {
      throw new RangeError(`Index ${index} is out of bounds`);
    }

    let value;

    if (index === 0) {
      value = this._head.value;
      this._head = this._head.nextNode;
      if (!this._head) this._tail = null;
    } else {
      let prev = this._head;
      for (let i = 0; i < index - 1; i++) {
        prev = prev.nextNode;
      }
      const target = prev.nextNode;
      value = target.value;
      prev.nextNode = target.nextNode;
      if (!prev.nextNode) this._tail = prev;
    }

    this.length--;
    return value;
  }
}
