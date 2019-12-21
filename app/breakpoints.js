// Assuming 1rem = 16px, we define the breakpoints as follows:
//
// xs  >= (2 * 1rem) + (3 *  8rem + 2 * 1rem + 1rem) = 464px
// sm  >= (2 * 1rem) + (4 *  8rem + 3 * 1rem + 1rem) = 608px
// md  >= (2 * 1rem) + (2 * 24rem + 1 * 1rem + 1rem) = 832px
// lg  >= (2 * 1rem) + (3 * 24rem + 2 * 1rem + 1rem) = 1232px
// xl  >= (2 * 1rem) + (3 * 32rem + 2 * 1rem + 1rem) = 1680px
// xxl >= (2 * 1rem) + (4 * 32rem + 3 * 1rem + 1rem) = 2224px
//
export default {
    xxs: '(max-width: 463px)',
    xs: '(min-width: 464px) and (max-width: 607px)',
    sm: '(min-width: 608px) and (max-width: 831px)',
    md: '(min-width: 832px) and (max-width: 1231px)',
    lg: '(min-width: 1232px) and (max-width: 1679px)',
    xl: '(min-width: 1680px) and (max-width: 2223px)',
    xxl: '(min-width: 2224px)',
};