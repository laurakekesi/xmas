import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
*,
*:after,
*:before {
    box-sizing: border-box;
    margin: 0;
}

html,
body {
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100%;
    height: 100%;
}

html {
    font-size: 62.5%;
    // background-color: x;
}

body {
    /* position: relative; */
    z-index: 0;
    min-height: 100%;
    /* color: x; */
    /* background-color: x; */
    /* font-family: x; */
    font-size: 1.6rem;
    /* font-weight: x; */
    font-style: normal;
    /* line-height: x; */
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}

.wrapper {
    margin: 0;
    height: 100%;
    width: 100%;
    /* min-width: 320px; */
    /* padding: x; */
}
`