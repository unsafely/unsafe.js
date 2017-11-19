(function (unsafe) {
    unsafe.module("collection", function () {

        var Collection = function (adapter) {
            this.collection = adapter.collection;

            this.get = function (i) {
                return adapter.get(i);
            };

            this.size = function () {
                return adapter.size();
            };

            this.iterator = function () {
                var index = -1;
                return function () {
                    index++;
                    if (index < adapter.size()) {
                        return adapter.get(index);
                    }
                    throw new RangeError("Index out of range: " + index);
                };
            };
        };

        var ArrayLikeAdapter = function (array) {
            this.collection = array;
            var self = this;
            self.get = function (i) {
                return array[i];
            };
            self.size = function () {
                return array.length;
            };
        };

        var sign = function (i) {
            if (i >= 0) {
                return 1;
            } else {
                return -1;
            }
        };

        var ItemListAdatper = function (list) {
            this.collection = list;
            var self = this;
            self.get = function (i) {
                return list.item(i);
            };
            self.size = function () {
                return list.length;
            };
        };

        var RangeAdapter = function (from, to, step) {
            step = step || sign(to - from) ;
            this.collection = this;
            var size = to === undefined || to === Number.MAX_SAFE_INTEGER ?
                Number.POSITIVE_INFINITY : Math.floor((to - from) / step);
            var self = this;
            self.get = function (i) {
                return from + i * step;
            };
            self.size = function () {
                return size;
            };
        };

        var ObjectAdapter = function (obj) {
            var keys = [];
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            var self = this;
            self.keys = function () {
                return keys;
            };
            self.get = function (i) {
                var key = keys[i]
                return { key: key, value: obj[key] };
            };
            self.size = function () {
                return keys.length;
            };
        };

        var collectProps = Collection.prototype;

        collectProps.map = function (fn) {
            var self = this;
            var collection = new Collection(self);
            collection.iterator = function () {
                var it = self.iterator();
                return function () {
                    return fn(it());
                };
            };
            return collection;
        };

        collectProps.filter = function (test) {
            var self = this;
            var collection = new Collection(self);
            collection.iterator = function () {
                var it = self.iterator();
                return function () {
                    while (true) {
                        var item = it();
                        if (test(item)) {
                            return item;
                        }
                    }
                };
            };

            return collection;
        };

        collectProps.skip = function (n) {
            var self = this;
            if (n <= 0) {
                throw new Error("Skip step must be a positive number");
            }
            var collection = new Collection(self);
            collection.iterator = function () {
                var it = self.iterator();
                return function () {
                    while (true) {
                        if (n == 0) {
                            return it();
                        }
                        n--;
                        it();
                    }
                };
            };

            return collection;
        };

        collectProps.take = function (n) {
            var self = this;
            if (n <= 0)
                throw new Error("Take amount must be a positive number");
            var collection = new Collection(self);

            collection.iterator = function () {
                var it = self.iterator();
                return function () {
                    if (n == 0)
                        throw new RangeError("Empty iterator");
                    else {
                        n--;
                        return it();
                    }
                };
            };

            return collection;
        };

        collectProps.each = function (fn) {
            var it = this.iterator();
            var i = 0;
            while (true) {
                try {
                    fn(it(), i);
                    i++;
                } catch (ex) {
                    break;
                }
            }
        };

        collectProps.toArray = function () {
            var array = [];
            var it = this.iterator();
            while (true) {
                try {
                    array.push(it());
                } catch (e) {
                    break;
                }
            }
            return array;
        }

        return {
            arrayLike: function (arr) {
                return new Collection(new ArrayLikeAdapter(arr));
            },
            items: function (list) {
                return new Collection(new ItemListAdatper(list));
            },
            range: function (from, to, step) {
                return new Collection(new RangeAdapter(from, to, step));
            },
            obj: function (obj) {
                return new Collection(new ObjectAdapter(obj));
            },

            Collection: Collection
        };

    });
}(this.unsafe));