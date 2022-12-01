const ScoreBoard = {
    ctx: undefined,
    init: function(ctx) {
    this.ctx = ctx
    this.ctx.font = "30px Calibri";
},
update: function (score) {
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(Math.floor(score), 50, 50);
}
}

