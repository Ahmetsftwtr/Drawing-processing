var chartItem = document.querySelectorAll('[data-item]')
var canvasBoard = document.getElementById('board');
var confirmCompilation = false;
canvasBoard.clientHeight = 200;
canvasBoard.width = 400;
canvasBoard.height = 200;
var ctx = canvasBoard.getContext('2d');
const mousePosition = {
    y: null,
    x: null
}




canvasBoard.addEventListener("mousedown", function () {

    mouseOver();
    confirmCompilation = false;
})

function mouseOver() {


    var write = true;
    canvasBoard.addEventListener("mousemove", function (e) {

        mousePosition.x = e.x;
        mousePosition.y = e.y;

        if (write) { drawCircle(); }


    })
    canvasBoard.addEventListener("mouseup", function () {
        write = false;
        renderImage();

    })
}


function renderImage() {

    var imgUrl = canvasBoard.toDataURL('image/png');
    var createImg = document.createElement('img');
    createImg.src = imgUrl;


    recognizeText(createImg.src);

    function recognizeText(url) {

        Tesseract.recognize(
            url,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            if (text) { searchTextInChat(text) }
        })
    }

}

function drawCircle() {
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = 'gray';
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 2;
    }
}

function searchTextInChat(text) {

    console.log(text);

    chartItem.forEach((item) => {
        if (parseInt(item.dataset.item) == text) {
            item.style.height = "350px";
        }
        else {
        }
    })

}