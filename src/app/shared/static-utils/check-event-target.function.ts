export function checkEventTargetFn(element: Element, is: boolean = false) {
    return (event: UIEvent): boolean => {
        let t: Element | null = <Element>event.target;
        while (t) {
            if (t === element) {
                return is;
            }
            t = t.parentElement;
        }
        return !is;
    };
}
