// nicer to convert to JSON file

// Define the image paths and corresponding labels
const images = {
    alef:  ['alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png'],
    beit:  ['alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png'],
    gimel: ['alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png'],
    lamed: ['alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png'],
    zadi:  ['alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png'],
    shin:  ['alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png', 'alef_demo.png'],
    // TODO
    // alef: ['alef_1.png', 'alef_2.png', 'alef_3.png', 'alef_4.png', 'alef_5.png', 'alef_6.png', 'alef_7.png', 'alef_8.png', 'alef_9.png', 'alef_10.png'],
};

// Corresponding labels for each image;
const labels = {
    alef: [
        'כתב יד מוילאלון מאה 15 ספרדי בינוני', 
        'Label for Alef 2',
        'כתב יד מוילאלון מאה 15 ספרדי בינוני',
        'Label for Alef 4', 
        'Label for Alef 5', 
        'Label for Alef 6', 
        'Label for Alef 7', 
        'Label for Alef 8', 
        'Label for Alef 9', 
        'Label for Alef 10'
    ],
    beit: [
        'כתב יד מוילאלון מאה 15 ספרדי בינוני', 
        'Label for Alef 2',
        'כתב יד מוילאלון מאה 15 ספרדי בינוני',
        'Label for Alef 4', 
        'Label for Alef 5', 
        'Label for Alef 6', 
        'Label for Alef 7', 
        'Label for Alef 8', 
        'Label for Alef 9', 
        'Label for Alef 10'
    ],
    gimel: [
        'כתב יד מוילאלון מאה 15 ספרדי בינוני', 
        'Label for Alef 2',
        'כתב יד מוילאלון מאה 15 ספרדי בינוני',
        'Label for Alef 4', 
        'Label for Alef 5', 
        'Label for Alef 6', 
        'Label for Alef 7', 
        'Label for Alef 8', 
        'Label for Alef 9', 
        'Label for Alef 10'
    ],
    lamed: [
        'כתב יד מוילאלון מאה 15 ספרדי בינוני', 
        'Label for Alef 2',
        'כתב יד מוילאלון מאה 15 ספרדי בינוני',
        'Label for Alef 4', 
        'Label for Alef 5', 
        'Label for Alef 6', 
        'Label for Alef 7', 
        'Label for Alef 8', 
        'Label for Alef 9', 
        'Label for Alef 10'
    ],
    zadi: [
        'כתב יד מוילאלון מאה 15 ספרדי בינוני', 
        'Label for Alef 2',
        'כתב יד מוילאלון מאה 15 ספרדי בינוני',
        'Label for Alef 4', 
        'Label for Alef 5', 
        'Label for Alef 6', 
        'Label for Alef 7', 
        'Label for Alef 8', 
        'Label for Alef 9', 
        'Label for Alef 10'
    ],
    shin: [
        'כתב\n  יד \n  מוילאלון \n מאה 15 \n ספרדי \n  בינוני', 
        'Label for Alef 2', 
        'בינוני', 
        'Label for Alef 4', 
        'Label for Alef 5', 
        'Label for Alef 6', 
        'Label for Alef 7', 
        'Label for Alef 8', 
        'Label for Alef 9', 
        'Label for Alef 10'
    ],
    // TODO
    // bet: ['Label for Bet 1', 'Label for Bet 2', 'Label for Bet 3', 'Label for Bet 4', 'Label for Bet 5', 'Label for Bet 6', 'Label for Bet 7', 'Label for Bet 8', 'Label for Bet 9', 'Label for Bet 10'],
};

