function fontruler(targetElement, callback) {
    html2canvas(targetElement, {
        onrendered: function(canvas) {
            var context = canvas.getContext('2d'),
                width = canvas.width,
                height = canvas.height,
                minX = width,
                minY = height,
                maxX = 0,
                maxY = 0,
                marginLeft = 0,
                marginTop = 0,
                marginBottom = 0,
                x = 0,
                y = 0;


            for(x = 0; x < width; x++) {
                for (y = 0; y < height; y++) {
                    var data = context.getImageData(x, y, 1, 1).data,
                        red = data[0],
                        green = data[1],
                        blue = data[2],
                        isBlackColor = red === 0 && green === 0 && blue === 0;

                    if(!isBlackColor) {
                        if(x <= minX) minX = x;
                        if(x >= maxX) maxX = x;
                        if(y <= minY) minY = y;
                        if(y >= maxY) maxY = y;
                    }
                }
            }

            maxX += 1;
            maxY += 1;

            var marginLeft = minX ? -1 * minX : 0;
            var marginTop = -1 * minY;
            var marginBottom = -1 * (height - maxY);


            callback(minX, minY, maxX, maxY, marginLeft, marginTop, marginBottom, canvas);
        }
    });
}
