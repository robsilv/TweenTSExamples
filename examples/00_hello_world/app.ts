window.onload = () => {
    var example = new HelloWorld();
    example.init();
    example.animate();
};

class HelloWorld
{
    position: any;
    target: HTMLDivElement;
    tween: TWEEN.Tween;
    tweenBack: TWEEN.Tween;

    public init():void {

        this.position = { x: 100, y: 100, rotation: 0 };
        this.target = <HTMLDivElement>document.getElementById('target');
        this.tween = new TWEEN.Tween(this.position)
            .to({ x: 700, y: 200, rotation: 359 }, 2000)
            .delay(1000)
            .easing(TWEEN.Easing.Elastic.InOut)
            .onUpdate(this.update);

        this.tweenBack = new TWEEN.Tween(this.position)
            .to({ x: 100, y: 100, rotation: 0 }, 3000)
            .easing(TWEEN.Easing.Elastic.InOut)
            .onUpdate(this.update);

        this.tween.chain(this.tweenBack);
        this.tweenBack.chain(this.tween);

        this.tween.start();

    }

    public animate = ():void => {

        requestAnimationFrame(this.animate);

        TWEEN.update();

    }

    public update = ():void => {

        this.target.style.left = this.position.x + 'px';
        this.target.style.top = this.position.y + 'px';
        // Needs to be dynamic to access vars that potentially don't exist:
        var targ: any = <any>this.target;
        targ.style.webkitTransform = 'rotate(' + Math.floor(this.position.rotation) + 'deg)';
        targ.style.MozTransform = 'rotate(' + Math.floor(this.position.rotation) + 'deg)';

    }
}