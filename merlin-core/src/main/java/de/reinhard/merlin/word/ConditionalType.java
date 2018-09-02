package de.reinhard.merlin.word;

public enum ConditionalType {
    EQUAL, NOT_EQUAL, IN, NOT_IN;

    public boolean isIn(ConditionalType... types) {
        if (types == null) {
            return false;
        }
        for (ConditionalType type : types) {
            if (this == type) {
                return true;
            }
        }
        return false;
    }
}
