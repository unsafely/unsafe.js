unsafe.test("test-collection",
["test", "assert", "collection"],
function (test, assert, _) {

    test("create collection", function () {
        var collect = _.arrayLike([1, 2, 3]);

        assert.isTrue(collect.size() == 3);
        assert.isTrue(collect.get(1) == 2);

        assert.isTrue(collect.iterator()() == 1);
    });

    test("collection iterator re-entrant", function () {
        var collect = _.arrayLike([1]);

        assert.isTrue(collect.iterator()() == 1);
        assert.isTrue(collect.iterator()() == 1);
    });

    test("collection map", function () {
        var collect = _.arrayLike([1, 2, 3]).map(function (i) { return i + 1 });
        var it = collect.iterator();

        assert.isTrue(it() == 2);
        assert.isTrue(it() == 3);
        assert.isTrue(it() == 4);
    });

    test("collection filter/skip/take", function () {
        var collect = _
            .arrayLike([1, 2, 3, 4, 5, 6, 7, 8])
        var filtered = collect
            .filter(function (i) { return i % 2; })
            .toArray();
        
        assert.isTrue(filtered.length == 4);

        assert.isTrue(filtered[1] == 3);

        var skipped = collect.skip(3).toArray();

        assert.isTrue(skipped.length == 5);
        assert.isTrue(skipped[0] == 4);

        var taken = collect.take(4).toArray();

        assert.isTrue(taken.length == 4);
        assert.isTrue(taken[3] == 4);

    });

    test("Range", function () {
        assert.eq(_.range(0, 5).size(), 5);
        assert.eq(_.range(0, 10, 2).size(), 5);
        assert.eq(_.range(10).size(), 10);
        assert.eq(_.range(10, NaN).size(), Number.POSITIVE_INFINITY);

        assert.eq(_.range(10).take(5).toArray().length, 5);
        assert.eq(_.range(5, NaN, 10).get(10), 105);
    });

    test("Object collection", function () {
        objs = _.obj({ a: 123, b: "456" });

        assert.eq(objs.size(), 2);

        var filtered = objs.filter(function (it) {
            return it.key === 'a'
        }).toArray();

        assert.eq(filtered.length, 1);
        assert.eq(filtered[0].value, 123);
    });
});