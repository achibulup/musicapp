"use strict";
function nonNull(value) {
    if (value == null) {
        throw new Error("Value is null");
    }
    return value;
}
