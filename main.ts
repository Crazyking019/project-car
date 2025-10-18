let start = 0
let count = 0
let clapCount = 0
function moveForward () {
    basic.showArrow(ArrowNames.North)
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(500)
    stopMotors()
}
function turnLeft () {
    basic.showArrow(ArrowNames.West)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(500)
    stopMotors()
}
function stopMotors () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
function countClaps () {
    start = input.runningTime()
    while (input.runningTime() - start < 1500) {
        if (pins.analogReadPin(AnalogPin.P0) > 600) {
            count += 1
            basic.pause(200)
        }
    }
    return count
}
function turnRight () {
    basic.showArrow(ArrowNames.East)
    pins.digitalWritePin(DigitalPin.P1, 1)
    pins.digitalWritePin(DigitalPin.P2, 0)
    basic.pause(500)
    stopMotors()
}
function moveBackward () {
    basic.showArrow(ArrowNames.South)
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P2, 0)
    basic.pause(500)
    stopMotors()
}
function showFace (count: number) {
    if (count == 1) {
        basic.showIcon(IconNames.Happy)
    } else if (count == 2) {
        basic.showIcon(IconNames.Sad)
    } else if (count == 3) {
        basic.showIcon(IconNames.Angry)
    } else if (count == 4) {
        basic.showIcon(IconNames.Surprised)
    } else {
        basic.showIcon(IconNames.Confused)
    }
}
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P0) > 600) {
        clapCount = countClaps()
        showFace(clapCount)
        if (clapCount == 1) {
            moveForward()
        } else if (clapCount == 2) {
            turnLeft()
        } else if (clapCount == 3) {
            turnRight()
        } else if (clapCount == 4) {
            moveBackward()
        }
        basic.pause(1000)
    }
})
