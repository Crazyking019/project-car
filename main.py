from microbit import *

# Motor pins
left_motor = pin1
right_motor = pin2

# Sound sensor pin
sound_sensor = pin0

# Settings
CLAP_THRESHOLD = 600       # Adjust based on your sensor
CLAP_WINDOW = 1500         # Time window to count claps (ms)
CLAP_COOLDOWN = 1000       # Delay after action (ms)

def move_forward():
    display.show(Image.ARROW_N)
    left_motor.write_digital(1)
    right_motor.write_digital(1)
    sleep(500)
    stop()

def turn_left():
    display.show(Image.ARROW_W)
    left_motor.write_digital(0)
    right_motor.write_digital(1)
    sleep(500)
    stop()

def turn_right():
    display.show(Image.ARROW_E)
    left_motor.write_digital(1)
    right_motor.write_digital(0)
    sleep(500)
    stop()

def move_backward():
    display.show(Image.ARROW_S)
    # Reverse logic depends on your motor driver setup
    left_motor.write_digital(0)
    right_motor.write_digital(0)
    sleep(500)
    stop()

def stop():
    left_motor.write_digital(0)
    right_motor.write_digital(0)

def count_claps():
    count = 0
    start = running_time()
    while running_time() - start < CLAP_WINDOW:
        if sound_sensor.read_analog() > CLAP_THRESHOLD:
            count += 1
            sleep(200)  # Debounce
    return count

while True:
    if sound_sensor.read_analog() > CLAP_THRESHOLD:
        claps = count_claps()
        if claps == 1:
            move_forward()
        elif claps == 2:
            turn_left()
        elif claps == 3:
            turn_right()
        elif claps == 4:
            move_backward()
        else:
            display.show(Image.CONFUSED)
        sleep(CLAP_COOLDOWN)