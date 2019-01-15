import styled from "styled-components";

const LoadingWarp = styled("div")`
    &.LoadingWarp {
        height: 100%;
        .windows8 {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            width: 44px;
            height:44px;
        }
        .windows8 .wBall {
            position: absolute;
            width: 42px;
            height: 42px;
            opacity: 0;
            transform: rotate(225deg);
            -o-transform: rotate(225deg);
            -ms-transform: rotate(225deg);
            -webkit-transform: rotate(225deg);
            -moz-transform: rotate(225deg);
            animation: orbit 2.6325s infinite;
            -o-animation: orbit 2.6325s infinite;
            -ms-animation: orbit 2.6325s infinite;
            -webkit-animation: orbit 2.6325s infinite;
            -moz-animation: orbit 2.6325s infinite;
        }
        .windows8 .wBall .wInnerBall {
            position: absolute;
            width: 5px;
            height: 5px;
            left: 0px;
            top: 0px;
            border-radius: 50%;
            background: rgba(0,0,0,0.6);
        }
        .windows8 #wBall_1 {
            animation-delay: 0.696s;
            -o-animation-delay: 0.696s;
            -ms-animation-delay: 0.696s;
            -webkit-animation-delay: 0.696s;
            -moz-animation-delay: 0.696s;
        }
        .windows8 #wBall_2 {
            animation-delay: 0.053s;
            -o-animation-delay: 0.053s;
            -ms-animation-delay: 0.053s;
            -webkit-animation-delay: 0.053s;
            -moz-animation-delay: 0.053s;
        }
        .windows8 #wBall_3 {
            animation-delay: 0.2165s;
            -o-animation-delay: 0.2165s;
            -ms-animation-delay: 0.2165s;
            -webkit-animation-delay: 0.2165s;
            -moz-animation-delay: 0.2165s;
        }
        .windows8 #wBall_4 {
            animation-delay: 0.3695s;
            -o-animation-delay: 0.3695s;
            -ms-animation-delay: 0.3695s;
            -webkit-animation-delay: 0.3695s;
            -moz-animation-delay: 0.3695s;
        }
        .windows8 #wBall_5 {
            animation-delay: 0.533s;
            -o-animation-delay: 0.533s;
            -ms-animation-delay: 0.533s;
            -webkit-animation-delay: 0.533s;
            -moz-animation-delay: 0.533s;
        }
        
        @keyframes orbit {
            0% {
                opacity: 1
                z-index:9
                transform: rotate(180deg)
                animation-timing-function: ease-out
            }
            7% {
                opacity: 1
                transform: rotate(300deg)
                animation-timing-function: linear
                origin:0% 
            }
            30% {
                opacity: 1
                transform:rotate(410deg)
                animation-timing-function: ease-in-out
                origin:7%
            }
            39% {
                opacity: 1
                transform: rotate(645deg)
                animation-timing-function: linear
                origin:30%
            }
            70% {
                opacity: 1
                transform: rotate(770deg)
                animation-timing-function: ease-out
                origin:39%
            }
            76% {
                opacity: 0
                transform:rotate(900deg)
            }
            100% {
                opacity: 0
                transform: rotate(900deg)
            }
        }
        @-o-keyframes orbit {
            0% {
                opacity: 1
                z-index:9
                -o-transform: rotate(180deg)
                -o-animation-timing-function: ease-out
            }
            
            7% {
                opacity: 1
                -o-transform: rotate(300deg)
                -o-animation-timing-function: linear
                -o-origin:0%
            }
            
            30% {
                opacity: 1
                -o-transform:rotate(410deg)
                -o-animation-timing-function: ease-in-out
                -o-origin:7%
            }
            
            39% {
                opacity: 1
                -o-transform: rotate(645deg)
                -o-animation-timing-function: linear
                -o-origin:30%
            }
            
            70% {
                opacity: 1
                -o-transform: rotate(770deg)
                -o-animation-timing-function: ease-out
                -o-origin:39%
            }
            
            75% {
                opacity: 1
                -o-transform: rotate(900deg)
                -o-animation-timing-function: ease-out
                -o-origin:70%
            }
            
            76% {
                opacity: 0
                -o-transform:rotate(900deg)
            }
            
            100% {
                opacity: 0
                -o-transform: rotate(900deg)
            }
        }
        
        
        @-ms-keyframes orbit {
            0% {
                opacity: 1
                z-index:9
                -ms-transform: rotate(180deg)
                -ms-animation-timing-function: ease-out
            }
            
            7% {
                opacity: 1
                -ms-transform: rotate(300deg)
                -ms-animation-timing-function: linear
                -ms-origin:0%
            }
            
            30% {
                opacity: 1
                -ms-transform:rotate(410deg)
                -ms-animation-timing-function: ease-in-out
                -ms-origin:7%
            }
            
            39% {
                opacity: 1
                -ms-transform: rotate(645deg)
                -ms-animation-timing-function: linear
                -ms-origin:30%
            }
            70% {
                opacity: 1
                -ms-transform: rotate(770deg)
                -ms-animation-timing-function: ease-out
                -ms-origin:39%
            }
            
            75% {
                opacity: 1
                -ms-transform: rotate(900deg)
                -ms-animation-timing-function: ease-out
                -ms-origin:70%
            }
            
            76% {
                opacity: 0
                -ms-transform:rotate(900deg)
            }
            
            100% {
                opacity: 0
                -ms-transform: rotate(900deg)
            }
        }
        
        
        @-webkit-keyframes orbit {
            0% {
                opacity: 1
                z-index:9
                -webkit-transform: rotate(180deg)
                -webkit-animation-timing-function: ease-out
            }
            7% {
                opacity: 1
                -webkit-transform: rotate(300deg)
                -webkit-animation-timing-function: linear
                -webkit-origin:0%
            }
            30% {
                opacity: 1
                -webkit-transform:rotate(410deg)
                -webkit-animation-timing-function: ease-in-out
                -webkit-origin:7%
            }
            
            39% {
                opacity: 1
                -webkit-transform: rotate(645deg)
                -webkit-animation-timing-function: linear
                -webkit-origin:30%
            }
            
            70% {
                opacity: 1
                -webkit-transform: rotate(770deg)
                -webkit-animation-timing-function: ease-out
                -webkit-origin:39%
            }
            
            75% {
                opacity: 1
                -webkit-transform: rotate(900deg)
                -webkit-animation-timing-function: ease-out
                -webkit-origin:70%
            }
            
            76% {
                opacity: 0
                -webkit-transform:rotate(900deg)
            }
            
            100% {
                opacity: 0
                -webkit-transform: rotate(900deg)
            }
        }
        
        
        @-moz-keyframes orbit {
            0% {
                opacity: 1
                z-index: 9
                -moz-transform: rotate(180deg)
                -moz-animation-timing-function: ease-out
            }
            
            7% {
                opacity: 1
                -moz-transform: rotate(300deg)
                -moz-animation-timing-function: linear
                -moz-origin: 0%
            }
            
            30% {
                opacity: 1
                -moz-transform: rotate(410deg)
                -moz-animation-timing-function: ease-in-out
                -moz-origin: 7%
            }
            
            39% {
                opacity: 1
                -moz-transform: rotate(645deg)
                -moz-animation-timing-function: linear
                -moz-origin: 30%
            }
            
            70% {
                opacity: 1
                -moz-transform: rotate(770deg)
                -moz-animation-timing-function: ease-out
                -moz-origin: 39%
            }
            
            75% {
            opacity: 1
                -moz-transform: rotate(900deg)
                -moz-animation-timing-function: ease-out
                -moz-origin: 70%
            }
            
            76% {
                opacity: 0;
                -moz-transform: rotate(900deg)
            }
            
            100% {
                opacity: 0
                -moz-transform: rotate(900deg)
            }
        }
    }
`;

export default LoadingWarp;
