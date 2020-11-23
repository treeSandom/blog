const webpack = require("webpack")
module.exports = {
    configureWebpack:{
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery":"jquery"
            })
         ]
    }
    // 其他代码...
 }