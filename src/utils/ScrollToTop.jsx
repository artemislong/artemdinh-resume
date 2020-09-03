import { useEffect } from "react";

function ScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
export default ScrollToTop;

//only use on main pages, not on tabs