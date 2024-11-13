export function house(x: number, y: number, fill: string, svg: any): void {
    const svgIcon: string = `
        <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.8401 10.5C22.8401 11.2031 22.2542 11.75 21.5901 11.75H20.3401L20.3792 18C20.3792 18.1172 20.3792 18.2344 20.3792 18.3125V18.9375C20.3792 19.8359 19.676 20.5 18.8167 20.5H18.1917C18.1135 20.5 18.0745 20.5 18.0354 20.5C17.9963 20.5 17.9182 20.5 17.8792 20.5H16.6292H15.6917C14.7932 20.5 14.1292 19.8359 14.1292 18.9375V18V15.5C14.1292 14.8359 13.5432 14.25 12.8792 14.25H10.3792C9.67603 14.25 9.12915 14.8359 9.12915 15.5V18V18.9375C9.12915 19.8359 8.42603 20.5 7.56665 20.5H6.62915H5.37915C5.30103 20.5 5.26196 20.5 5.18384 20.5C5.14478 20.5 5.10571 20.5 5.06665 20.5H4.44165C3.54321 20.5 2.87915 19.8359 2.87915 18.9375V14.5625C2.87915 14.5625 2.87915 14.5234 2.87915 14.4844V11.75H1.62915C0.926025 11.75 0.37915 11.2031 0.37915 10.5C0.37915 10.1484 0.496338 9.83594 0.769775 9.5625L10.7698 0.8125C11.0432 0.539062 11.3557 0.5 11.6292 0.5C11.9026 0.5 12.2151 0.578125 12.4495 0.773438L22.4104 9.5625C22.7229 9.83594 22.8792 10.1484 22.8401 10.5Z" fill="${fill}"/>
        </svg>
    `;

    // append SVG icon as HTML string
    const icon = svg
        .append('g') // group to position
        .attr('transform', `translate(${x}, ${y})`) // set position
        .html(svgIcon); // insert SVG markup
}
