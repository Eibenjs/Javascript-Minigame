let win = 0,
    passed = false,
    time = 50,
    seconds = 50,
    filesLength = 3,
    filesSideLength = 2,
    choosed = [],
    addFile = []




$(document).ready(() => {
    $('.progressbar').css('animation', `progress-animation ${time}s linear`)

    const counter = (ab) => {
        if (seconds >= 1) {
            seconds -= 1
            const element = document.getElementById(ab)
            element.innerText = seconds
        } else {
            clearInterval(countdown)
        }
    }
    let countdown = setInterval(() => {
        counter('countdown')
    }, 1000)

    const hangOn = () => {
        const mainFile = Math.floor(Math.random() * filesLength) + 1
        const pHome = document.getElementById('PHOME')
        pHome.src = `../Fingerprints/${mainFile}/Main/1.png`

        const img1 = document.createElement('img')
        img1.id = 'P1'
        img1.src = `../Fingerprints/${mainFile}/Side/1.png`
        addFile.push(img1)
        const img2 = document.createElement('img')
        img2.id = 'P2'
        img2.src = `../Fingerprints/${mainFile}/Side/2.png`
        addFile.push(img2)

        const img3 = document.createElement('img')
        img3.id = 'P3'

        const img4 = document.createElement('img')
        img4.id = 'P4'

        let File1Nums = ''

        const File1 = () => {
            let otherFileNum = Math.floor(Math.random() * filesLength) + 1,
                otherFileNumP = Math.floor(Math.random() * filesSideLength) + 1

            if (otherFileNum === mainFile) {
                otherFileNum = Math.floor(Math.random() * 3) + 1
            } else {
                clearInterval(File1Interval)
                img3.src = `../Fingerprints/${otherFileNum}/Side/${otherFileNumP}.png`
                addFile.push(img3)
                File1Nums = `${otherFileNum}` + `${otherFileNumP}`
            }
        }

        let File1Interval = setInterval(() => {
            File1()
        }, 100)

        let File2Nums = ''

        const File2 = () => {
            let otherFileNum = Math.floor(Math.random() * filesLength) + 1,
                otherFileNumP = Math.floor(Math.random() * filesSideLength) + 1

            if (otherFileNum === mainFile) {
                otherFileNum = Math.floor(Math.random() * 3) + 1
            } else {
                File2Nums = `${otherFileNum}` + `${otherFileNumP}`
                if (File2Nums === File1Nums) {
                    otherFileNumP = Math.floor(Math.random() * filesSideLength) + 1
                } else {
                    clearInterval(File2Interval)
                    img4.src = `../Fingerprints/${otherFileNum}/Side/${otherFileNumP}.png`
                    addFile.push(img4)
                }
            }
        }

        let File2Interval = setInterval(() => {
            File2()
        }, 100)

        const overwrite = (array) => {
            if (array.length === 4) {
                clearInterval(overwriteInterval)
                shuffle(array)
                const fingers = document.getElementsByClassName('fingers')
                array.forEach(e => {
                    fingers[0].appendChild(e)
                })
            }
        }
        let overwriteInterval = setInterval(() => {
            overwrite(addFile)
        }, 10)
    }

    hangOn()

    $('.fingers').click(a => {
        if ($(`#${a.target.id}`).hasClass('choose')) {
            $(`#${a.target.id}`).removeClass('choose')
            const index = choosed.indexOf(a.target.id)
            choosed.splice(index, 1)
        } else {
            if (choosed.length < 2) {
                $(`#${a.target.id}`).addClass('choose')
                let now = `${a.target.id}`
                choosed.push(now)
            }
        }
    })

    function shuffle(array) {
        var currentIndex = array.length,
            randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    }

    $('#accept').click(async e => {
        if (choosed.includes('P1') && choosed.includes('P2')) {
            win += 1
            if (win >= 3) {
                passed = true
            } else {
                choosed = []
                addFile = []
                $('#fingersBox').html('')
                setTimeout(()=>{hangOn()},50)
            }
        }
    })




})