import easingTypes from 'tween-functions';

class Tween {
    constructor(config){
        this._rafLoop = this._rafLoop.bind(this);
        this.terminate = this.terminate.bind(this);

        this._t0 = Date.now();
        this._config = config;
        this._rafLoop();
    }

    _rafLoop(){
        if (this._break){ return; }

        let {duration, start, end, easingType} = this._config;
        let now = Date.now();
        let elapsed = now - this._t0;

        if (elapsed >= duration){
            this._config.onFrame(end);
            this._config.onEnd();
            return;
        }

        let tweenVal = easingTypes[easingType](elapsed, start, end, duration);
        this._config.onFrame(tweenVal);

        requestAnimationFrame(this._rafLoop);
    }
    terminate(){
        this._break = true;
    }

}

export default (config) => {
    return new Tween(config);
}
