window.onload = function () {
    var example = new HelloWorld();
    example.init();
    example.animate();
};

var HelloWorld = (function () {
    function HelloWorld() {
        var _this = this;
        this.animate = function () {
            requestAnimationFrame(_this.animate);

            TWEEN.update();
        };
        this.update = function () {
            _this.target.style.left = _this.position.x + 'px';
            _this.target.style.top = _this.position.y + 'px';

            // Needs to be dynamic to access vars that potentially don't exist:
            var targ = _this.target;
            targ.style.webkitTransform = 'rotate(' + Math.floor(_this.position.rotation) + 'deg)';
            targ.style.MozTransform = 'rotate(' + Math.floor(_this.position.rotation) + 'deg)';
        };
    }
    HelloWorld.prototype.init = function () {
        this.position = { x: 100, y: 100, rotation: 0 };
        this.target = document.getElementById('target');
        this.tween = new TWEEN.Tween(this.position).to({ x: 700, y: 200, rotation: 359 }, 2000).delay(1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(this.update);

        this.tweenBack = new TWEEN.Tween(this.position).to({ x: 100, y: 100, rotation: 0 }, 3000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(this.update);

        this.tween.chain(this.tweenBack);
        this.tweenBack.chain(this.tween);

        this.tween.start();
    };
    return HelloWorld;
})();
//# sourceMappingURL=app.js.map
