package de.fhg.iais.roberta.mode.sensor;

import de.fhg.iais.roberta.inter.mode.sensor.IMotionSensorMode;

public enum MotionSensorMode implements IMotionSensorMode {
    VALUE(), PRESENCE();

    private final String[] values;

    private MotionSensorMode(String... values) {
        this.values = values;
    }

    @Override
    public String[] getValues() {
        return this.values;
    }
}
