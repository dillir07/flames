// window.addEventListener("load", (event) => {
//     // console.log("body is loaded");
// });

window.onload = (event) => {
    // console.info('page is fully loaded');

    class CharModel {
        id;
        char;
        visited;
        styles;

        constructor(id, char, visited, styles) {
            this.id = id;
            this.char = char;
            this.visited = visited;
            this.styles = styles;
        }

    }

    class FlamesModel {
        id;
        description;
        disabled;
        constructor(id, description, disabled) {
            this.id = id;
            this.description = description;
            this.disabled = disabled;
        }
    }

    let flamesMappingList = [
        { id: 'F', description: '🤝 FRIEND 🤝' },
        { id: 'L', description: '❤️ LOVER ❤️' },
        { id: 'A', description: '🤗 AFFECTION 🤗' },
        { id: 'M', description: '👩‍❤️‍👨 MARRIAGE 👩‍❤️‍👨' },
        { id: 'E', description: '☠️ ENEMY ☠️' },
        { id: 'S', description: '🤼 SIBLING 🤼' },
    ];

    var app = new Vue({
        el: "#app",
        data: {
            message: 'F.L.A.M.E.S',
            flamesModelList: [],
            flameEmoji: '🔥',
            yourName: '',
            hisHerName: '',
            inputMode: true,
            outputMode: false,
            yourNameList: [],
            hisHerNameList: [],
            intervalHandler: "interval yet to be set",
            yourNameFlameCount: 0,
            hisHerNameFlameCount: 0,
            flamesCount: undefined,
            flamesFinalResult: null,
            // FLAMES:'FLAMES'.split(''),
        },
        methods: {
            loadNameList: function (name, nameId) {
                arr = [];
                name.split('').forEach((letter, index) => {
                    let letterModel = new CharModel(index, letter, false, ['w3-center']);
                    arr.push(letterModel);
                });
                if (nameId === 0) {
                    this.yourNameList = arr;
                    this.yourNameListLength = arr.length;
                }
                else { this.hisHerNameList = arr; }
            },
            getFlamesId: function () {
                let visitedItemsCount = 0;
                for (let yourNameIndex = 0; yourNameIndex < this.yourNameList.length; yourNameIndex++) {
                    yourLetter = this.yourNameList[yourNameIndex];
                    if (yourLetter.visited) {
                        visitedItemsCount += 1;
                        // console.warn(yourLetter.char, "visisted already");
                    } else {
                        // debugger;
                        // console.warn('visiting', yourLetter.char);
                        yourLetter.styles.push('w3-green');
                        for (let hisHerNameIndex = 0; hisHerNameIndex < this.hisHerNameList.length; hisHerNameIndex++) {
                            hisHerLetter = this.hisHerNameList[hisHerNameIndex];
                            // console.log('matching', yourLetter.char, hisHerLetter.char)
                            if (yourLetter.char === hisHerLetter.char && (!hisHerLetter.visited)) {
                                // console.log('matched');
                                // hisHerLetter.styles.push('w3-black');
                                hisHerLetter.char = this.flameEmoji;
                                hisHerLetter.visited = true;
                                yourLetter.styles.pop();
                                // yourLetter.styles.push('w3-black');
                                yourLetter.char = this.flameEmoji;
                                break;
                            }
                        }
                        yourLetter.visited = true;
                        return false;
                    }
                }

                // console.log('getfid', this.yourNameList.length, visitedItemsCount, this.intervalHandler);
                if (this.yourNameList.length === visitedItemsCount) {
                    window.clearInterval(this.intervalHandler);
                    // console.log(this.yourNameList.filter(yourLetter => yourLetter.char != this.flameEmoji && yourLetter.char != ' '));
                    this.yourNameFlameCount = (this.yourNameList.filter(yourLetter => yourLetter.char != this.flameEmoji && yourLetter.char != ' ')).length;
                    for (let hisHerNameIndex = 0; hisHerNameIndex < this.hisHerNameList.length; hisHerNameIndex++) {
                        hisHerLetter = this.hisHerNameList[hisHerNameIndex];
                        if (!hisHerLetter.visited && hisHerLetter.char != ' ') {
                            hisHerLetter.styles.push('w3-red');
                            this.hisHerNameFlameCount += 1;
                        }
                    }
                    this.flamesCount = this.yourNameFlameCount + this.hisHerNameFlameCount;
                    // console.log(this.yourNameFlameCount, this.hisHerNameFlameCount);
                    // console.info('FLAMES COUNT', this.flamesCount);
                    this.initFlamesModel();
                    // console.log(this.flamesModelList);
                    this.showRelationship();
                }

            },
            initFlamesModel: function () {
                flamesMappingList.forEach(mapping => {
                    this.flamesModelList.push(new FlamesModel(mapping.id, mapping.description, false));
                });
            },
            showRelationship: function () {
                // debugger;
                let flameIndex = undefined;
                let flameCounter = 0;
                let currentFlame = undefined;
                for (let counter = 0; counter < 999; counter++) {
                    console.log(counter, 'counter');
                    flameIndex = (counter % this.flamesModelList.length);
                    // console.log(flameIndex);
                    currentFlame = this.flamesModelList[flameIndex];
                    if (currentFlame.disabled) {
                        console.error(currentFlame.id, 'disabled, moving on');
                        // console.log('moving on');
                    } else {
                        console.warn(currentFlame.id, 'working in progress');
                        flameCounter += 1;
                        if (flameCounter === this.flamesCount) {
                            currentFlame.disabled = true;
                            // currentFlame.id = this.flameEmoji;
                            console.info(currentFlame.id, 'matched in progress', currentFlame.disabled);
                            flameCounter = 0; //reset flame counter
                        }
                        
                    }
                    if (this.flamesModelList.filter(flameModel => !flameModel.disabled).length == 1) {
                        console.log('reached final breaking loop')
                        this.flamesFinalResult = this.flamesModelList.filter(flameModel => !flameModel.disabled)[0].description;
                        break;
                    }
                }

            },
            flame: function () {
                // console.log('yourName', this.yourName);
                // console.log('hisHerName', this.hisHerName);
                if (this.yourName.length <= 0 || this.hisHerName.length <= 0) {
                    return false;
                }
                this.loadNameList(this.yourName.toUpperCase(), 0);
                this.loadNameList(this.hisHerName.toUpperCase(), 1);
                this.inputMode = false;
                this.outputMode = true;
                this.intervalHandler = window.setInterval(this.getFlamesId, 300);
            }
        }
    })

};