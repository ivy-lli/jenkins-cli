export namespace ArrayUtils {
  export function remove(arr: string[], obj?: string): string | undefined {
    if (obj) {
      const removed = arr.splice(arr.indexOf(obj), 1);
      return removed.length > 0 ? removed[0] : undefined;
    }
    return undefined;
  }

  export function move(arr: string[], moveId: string, targetId: string) {
    const fromIndex = arr.indexOf(moveId);
    const toIndex = arr.indexOf(targetId);
    arraymove(arr, fromIndex, toIndex);
  }

  function arraymove(arr: string[], fromIndex: number, toIndex: number) {
    var element = arr[fromIndex];
    if (element) {
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }
  }
}
