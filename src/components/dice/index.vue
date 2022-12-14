<template>
    <div class="container">
        <div class="wrap rotate" ref="wrap" @mouseenter="onEnter" @mouseleave="onLeave">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@keyframes rotate {
    0%{
        transform: rotate3d(1, 1, 1, 0);
    }
    // 25%{
    //     transform: rotate3d(1, -1, 1, 90deg);
    // }
    // 50%{
    //     transform: rotate3d(1, -1, 1, 180deg);
    // }
    // 75%{
    //     transform: rotate3d(1, -1, 1, 270deg);
    // }
    100%{
        transform: rotate3d(1, 1, 1, 360deg);
    }
}
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    // perspective: 10000px;
    perspective-origin: center;
    .wrap{
        width: 333px;
        height: 333px;
        position: relative;
        transform-style: preserve-3d;
        backface-visibility: visible;
        transform-origin: 0 0 0;
        margin: 300px auto;
        will-change: transform;
        &.rotate{
            // animation: rotate 5s ease infinite both;
            animation: rotate 5s steps(360, end) infinite;
        }
        div{
            position: absolute;
            width: 333px;
            height: 333px;
            font-size: 10rem;
            font-weight: 900;
            line-height: 333px;
            text-align: center;
            opacity: .5;
            transition: transform 500ms ease-in-out;
            &:nth-of-type(1){
                background: green;
                transform: rotateX(-90deg);
                transform-origin: bottom;
                &:hover{
                    transform: rotateX(-90deg) translate3d(0, 0, 20px) scale3d(1.1, 1.1, 1.1);
                }    
            }
            &:nth-of-type(2){
                background: yellow;
                transform: rotateX(90deg);
                transform-origin: top;
                &:hover{
                    transform: rotateX(90deg) translate3d(0, 0, 20px) scale3d(1.1, 1.1, 1.1);
                }
            }
            &:nth-of-type(3){
                background: blue;
                transform: rotateY(90deg);
                transform-origin: right;
                &:hover{
                    transform: rotateY(90deg) translate3d(0, 0, 20px) scale3d(1.1, 1.1, 1.1);
                }
            }
            &:nth-of-type(4){
                background: red;
                transform: rotateY(-90deg);
                transform-origin: left;
                &:hover{
                    transform: rotateY(-90deg) translate3d(0, 0, 20px) scale3d(1.1, 1.1, 1.1);
                }
            }
            &:nth-of-type(5){
                background: orange;
                transform: translateZ(333px);
                transform-origin: center;
                &:hover{
                    transform: translate3d(0, 0, 353px) scale3d(1.1, 1.1, 1.1);
                }
            }
            &:nth-of-type(6){
                background: pink;
                &:hover{
                    transform: translate3d(0, 0, -20px) scale3d(1.1, 1.1, 1.1);
                }
            }
        }
        
    }
}
</style>
<script>
export default {
    name: 'Dice',
    methods: {
        onEnter(e){
            const wrap = this.$refs["wrap"] 
            wrap.style.animationPlayState = 'paused'
        },
        onLeave(e){
            const wrap = this.$refs["wrap"] 
            wrap.style.animationPlayState = 'running'
        }
    }
}
</script>