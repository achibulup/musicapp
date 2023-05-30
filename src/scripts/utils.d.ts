function nonNull<T>(value: T | null | undefined): T {
  if (value == null) {
    throw new Error("Value is null");
  }
  return value;
}