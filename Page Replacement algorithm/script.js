document.getElementById('page-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const pages = document.getElementById('pages').value.split(',').map(Number);
    const framesCount = parseInt(document.getElementById('frames').value);
    const method = document.getElementById('method').value;

    // Simulate the selected method
    if (method === 'LRU') {
        simulateLRU(pages, framesCount);
    } if (method === 'FIFO') {
        simulateFIFO(pages, framesCount);
    } if (method === 'OPT') {
        simulateOPT(pages, framesCount);
    }
});
function simulateLRU(pages, framesCount) {
    let frames = [];
    let hits = 0;
    let output = '';

    pages.forEach(page => {
        if (frames.includes(page)) {
            hits++;
            output += `<p>Page ${page} - Hit</p>`;
        } else {
            if (frames.length < framesCount) {
                frames.push(page);
            } else {
                frames.shift();
                frames.push(page);
            }
            output += `<p>Page ${page} - Miss</p>`;
        }
        output += renderFrames(frames);
    });

    output += `<p>Total Hits (LRU): ${hits}</p>`;
    output += `<p>Total Misses (LRU): ${pages.length - hits}</p>`;
    document.getElementById('output-lru').innerHTML = output;
}

function simulateFIFO(pages, framesCount) {
    let frames = [];
    let hits = 0;
    let output = '';

    pages.forEach(page => {
        if (frames.includes(page)) {
            hits++;
            output += `<p>Page ${page} - Hit</p>`;
        } else {
            if (frames.length < framesCount) {
                frames.push(page);
            } else {
                const removedPage = frames.shift();
                output += `<p>Page ${removedPage} - Removed</p>`;
                frames.push(page);
            }
            output += `<p>Page ${page} - Miss</p>`;
        }
        output += renderFrames(frames);
    });

    output += `<p>Total Hits (FIFO): ${hits}</p>`;
    output += `<p>Total Misses (FIFO): ${pages.length - hits}</p>`;
    document.getElementById('output-fifo').innerHTML = output;
}

function simulateOPT(pages, framesCount) {
    let frames = [];
    let hits = 0;
    let output = '';

    pages.forEach((page, index) => {
        if (frames.includes(page)) {
            hits++;
            output += `<p>Page ${page} - Hit</p>`;
        } else {
            if (frames.length < framesCount) {
                frames.push(page);
            } else {
                const pageToReplace = getOptimalPage(pages.slice(index), frames);
                const removedPage = frames.splice(frames.indexOf(pageToReplace), 1)[0];
                output += `<p>Page ${removedPage} - Removed</p>`;
                frames.push(page);
            }
            output += `<p>Page ${page} - Miss</p>`;
        }
        output += renderFrames(frames);
    });

    output += `<p>Total Hits (OPT): ${hits}</p>`;
    output += `<p>Total Misses (OPT): ${pages.length - hits}</p>`;
    document.getElementById('output-opt').innerHTML = output;
}

function getOptimalPage(futurePages, frames) {
    const futurePageSet = new Set(futurePages);
    for (let frame of frames) {
        if (!futurePageSet.has(frame)) {
            return frame;
        }
    }
    return frames[0];
}

function renderFrames(frames) {
    let frameHtml = '<div class="frame-container">';
    frames.forEach(frame => {
        frameHtml += `<div class="frame">${frame}</div>`;
    });
    frameHtml += '</div>';
    return frameHtml;
}
