export function getReactiveSidePadding() {
  const $q = useQuasar();

  return computed(() => {
    if ($q.screen.gt.sm) return "q-pl-xl q-pr-xl";
    if ($q.screen.gt.xs) return "q-pl-md q-pr-md";
    return "q-pl-sm q-pr-sm";
  });
}

export function createReactiveComputed<
  T extends string | number,
  B extends T,
  M extends T,
  S extends T
>(big: B, medium: M, small: S): globalThis.ComputedRef<B | M | S> {
  const $q = useQuasar();

  return computed(() => {
    if ($q.screen.gt.sm) return big;
    if ($q.screen.gt.xs) return medium;
    return small;
  });
}
