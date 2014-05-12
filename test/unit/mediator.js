describe("mediator", function() {


    var SCORE_CHANGE = 'scorechange',
    game = {
        score: 0,
        incrementScore: function() {
            this.score += 1;
            // the scoreboard will listen to this
            $.publish(SCORE_CHANGE, [this.score, this]);
        }
    },
    scoreboard = {
        updateScore: function(score, ctx) {
            // if context is set correctly
            // there should be no issue using this
            this.test(score, ctx);
        },
        test: function(score, ctx) {
            expect(ctx.score).to.equal(score);
        }
    },
    subscribers = null;

    beforeEach(function() {
        Guac._subscribers = {};
        game.score = 0;
    });

    describe("#mediator.subscribe()", function() {


        it("should have no subscriptions", function() {
            expect((typeof $._subscribers[SCORE_CHANGE])).to.equal("undefined");
        });

        it("should subscribe default context", function() {

            var handler = function(){};

            $.subscribe(SCORE_CHANGE, handler);
            subscribers = $._subscribers[SCORE_CHANGE];

            expect(subscribers.length).to.equal(1);
            expect(subscribers[0].fn).to.equal(handler);
            expect(subscribers[0].ctx).to.equal(Guac);
        });

        it("should subscribe with context", function() {

            $.subscribe(SCORE_CHANGE, scoreboard.updateScore, scoreboard);

            subscribers = $._subscribers[SCORE_CHANGE];

            expect(subscribers.length).to.equal(1);
            expect(subscribers[0].fn).to.equal(scoreboard.updateScore);
            expect(subscribers[0].ctx).to.equal(scoreboard);
        });

        it("should subscribe multiple events", function() {
            var handler = function(){};

            expect((typeof $._subscribers[SCORE_CHANGE])).to.equal("undefined");

            $.subscribe(SCORE_CHANGE, scoreboard.updateScore, scoreboard);

            subscribers = $._subscribers[SCORE_CHANGE];

            expect(subscribers.length).to.equal(1);
            expect(subscribers[0].fn).to.equal(scoreboard.updateScore);
            expect(subscribers[0].ctx).to.equal(scoreboard);

            $.subscribe(SCORE_CHANGE, handler);

            expect(subscribers.length).to.equal(2);
            expect(subscribers[1].fn).to.equal(handler);
            // test that default context is Guac
            expect(subscribers[1].ctx).to.equal(Guac);
        });
    });

    describe("#mediator.unsubscribe()", function() {

        var handler = function(){},
            subscribers = null;
        beforeEach(function() {

            $._subscribers = {};
            $.subscribe(SCORE_CHANGE, handler);
            $.subscribe(SCORE_CHANGE, scoreboard.updateScore, scoreboard);
        });

        it("should unsubscribe", function() {

            subscribers = $._subscribers[SCORE_CHANGE];
            expect(subscribers.length).to.equal(2);
            expect(subscribers[0].fn).to.equal(handler);
            expect(subscribers[0].ctx).to.equal(Guac);

            $.unsubscribe(SCORE_CHANGE, handler);

            expect(subscribers.length).to.equal(1);
            expect(subscribers[0].fn).to.not.equal(handler);
            expect(subscribers[0].ctx).to.not.equal(Guac);
        });

        it("should unsubscribe with context", function() {

            subscribers = $._subscribers[SCORE_CHANGE];
            // subscribe same function with different context
            $.subscribe(SCORE_CHANGE, scoreboard.updateScore);
            expect(subscribers.length).to.equal(3);

            $.unsubscribe(SCORE_CHANGE, handler);

            expect(subscribers.length).to.equal(2);

            expect(subscribers[0].fn).to.equal(scoreboard.updateScore);
            expect(subscribers[0].ctx).to.equal(scoreboard);

            expect(subscribers[1].fn).to.equal(scoreboard.updateScore);
            expect(subscribers[1].ctx).to.equal(Guac);

            // unsubscribe updateScore with the context of scoreboard
            $.unsubscribe(SCORE_CHANGE, scoreboard.updateScore, scoreboard);
            expect(subscribers.length).to.equal(1);
            // the remaining updateScore function should have the default context of Guac
            expect(subscribers[0].fn).to.equal(scoreboard.updateScore);
            expect(subscribers[0].ctx).to.equal(Guac);

        });
    });
    describe("#mediator.publish()", function() {

        var handler = function(score){},
            subscribers = null;
        beforeEach(function() {

            $._subscribers = {};
        });

        it("should publish", function() {
            $.subscribe(SCORE_CHANGE, scoreboard.updateScore, scoreboard);
            game.incrementScore();
        });

        it("should publish", function() {
            $.subscribe(SCORE_CHANGE, scoreboard.updateScore, scoreboard);
            $.publish(SCORE_CHANGE, [0, {score: 0}]);
        });

        it("should publish multiple events", function() {
            var count = 0;
            $.subscribe(SCORE_CHANGE, function(){
                count += 1;
                expect(count).to.equal(1);
            });
            $.subscribe(SCORE_CHANGE, function(){
                count += 1;
                expect(count).to.equal(2);
            });

            $.publish(SCORE_CHANGE);
            expect(count).to.equal(2);
        });

    });

});
