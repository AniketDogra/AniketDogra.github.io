let imgElement = document.getElementById('imageSrc');
let inputElement = document.getElementById('fileInput');
var form = document.getElementById("form");
var radio = document.getElementById("radio");
var allElements = form.elements;


if (imgElement.getAttribute('src') == null) {
    for (var i = 0, l = allElements.length; i < l; ++i) {
        allElements[i].disabled = true;
    }
}
inputElement.addEventListener('change', (e) => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
    for (var i = 0, l = allElements.length; i < l; ++i) {
        allElements[i].disabled = false;
    }
}, false);

let mat = null;
imgElement.onload = function() {
    mat = cv.imread(imgElement);
};


function onOpenCvReady() {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready. Upload an Image';

}

function orig() {
    cv.imshow('canvasOutput', mat);
}

function toGray() {
    let dst = new cv.Mat();
    cv.cvtColor(mat, dst, 11, 0);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function resiz() {
    let dst = new cv.Mat();
    let dsize = new cv.Size(100, 100);
    cv.resize(mat, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function rot() {
    let dst = new cv.Mat();
    let dsize = new cv.Size(mat.rows, mat.cols);
    let center = new cv.Point(mat.cols / 2, mat.rows / 2);

    let M = cv.getRotationMatrix2D(center, 45, 1);
    cv.warpAffine(mat, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    cv.imshow('canvasOutput', dst);
    dst.delete();
    M.delete()
}

function imgThresh() {
    let dst = new cv.Mat();
    let mat1 = new cv.Mat();
    cv.cvtColor(mat, mat1, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(mat1, dst, 177, 200, cv.THRESH_BINARY);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function imgAdaptThresh() {
    let dst = new cv.Mat();
    let mat1 = new cv.Mat();
    cv.cvtColor(mat, mat1, cv.COLOR_RGBA2GRAY, 0);
    cv.adaptiveThreshold(mat1, dst, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function imgBlur() {
    let dst = new cv.Mat();
    let ksize = new cv.Size(3, 3);
    let anchor = new cv.Point(-1, -1);
    cv.blur(mat, dst, ksize, anchor, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function imgFilter() {
    let dst = new cv.Mat();
    let M = cv.Mat.eye(3, 3, cv.CV_32FC1);
    let anchor = new cv.Point(-1, -1);
    cv.filter2D(mat, dst, cv.CV_8U, M, anchor, 0, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    dst.delete();
    M.delete();
}

function gauBlur() {
    let dst = new cv.Mat();
    let ksize = new cv.Size(3, 3);
    cv.GaussianBlur(mat, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function biFilter() {
    let dst = new cv.Mat();
    let mat1 = new cv.Mat();
    cv.cvtColor(mat, mat1, cv.COLOR_RGBA2RGB, 0);
    cv.bilateralFilter(mat1, dst, 9, 75, 75, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function sobelFilter() {
    let dst = new cv.Mat();
    let mat1 = new cv.Mat();
    cv.cvtColor(mat, mat1, cv.COLOR_RGB2GRAY, 0);
    cv.Sobel(mat1, dst, cv.CV_8U, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function scharrFilter() {
    let dst = new cv.Mat();
    let mat1 = new cv.Mat();
    cv.cvtColor(mat, mat1, cv.COLOR_RGB2GRAY, 0);
    cv.Scharr(mat1, dst, cv.CV_8U, 1, 0, 1, 0, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function lapFilter() {
    let dst = new cv.Mat();
    let mat1 = new cv.Mat();
    cv.cvtColor(mat, mat1, cv.COLOR_RGB2GRAY, 0);
    cv.Laplacian(mat1, dst, cv.CV_8U, 1, 1, 0, cv.BORDER_DEFAULT);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}

function edgeDetect() {
    let dst = new cv.Mat();
    let mat1 = new cv.Mat();
    cv.cvtColor(mat, mat1, cv.COLOR_RGB2GRAY, 0);
    cv.Canny(mat1, dst, 50, 100, 3, false);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}


function eqHist() {
    // let dstR = new cv.Mat();
    // let dstG = new cv.Mat();
    // let dstB = new cv.Mat();
    // let rgbaPlanes = new cv.MatVector();
    // cv.split(mat, rgbaPlanes);
    // let R = rgbaPlanes.get(0);
    // let G = rgbaPlanes.get(1);
    // let B = rgbaPlanes.get(2);
    // cv.equalizeHist(R, dstR);
    // cv.equalizeHist(G, dstG);
    // cv.equalizeHist(B, dstB);
    // let final = new cv.MatVector();
    // final.push_back(R);
    // final.push_back(G);
    // final.push_back(B);
    // let data = new cv.Mat();
    // cv.merge(final, data);

    // cv.imshow('canvasOutput', data);
    // dstR.delete();
    // dstB.delete();
    // dstG.delete();
    // rgbaPlanes.delete();
    let mat1 = new cv.Mat();
    let dst = new cv.Mat();
    cv.cvtColor(mat, mat1, cv.COLOR_RGBA2GRAY, 0);
    cv.equalizeHist(mat1, dst);
    cv.imshow('canvasOutput', dst);
    dst.delete();
}