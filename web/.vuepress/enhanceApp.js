export default ({ router }) => {
    router.beforeEach((to, from, next) => {
        // console.log(_hmt)
        // if (typeof _hmt !== "undefined") {
        //     if (to.path) {
        //         _hmt.push(["_trackPageview", to.fullPath]);
        //     }
        // }

        next();
    });
};